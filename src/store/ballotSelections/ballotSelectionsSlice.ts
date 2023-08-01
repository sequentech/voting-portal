// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {IElectionDTO} from "sequent-core"
import {isNumber} from "ui-essentials"

export type BallotSelection = Array<Array<number>>

export interface BallotSelectionsState {
    [electionId: number]: BallotSelection | undefined
}

const initialState: BallotSelectionsState = {}

export const ballotSelectionsSlice = createSlice({
    name: "ballotSelections",
    initialState,
    reducers: {
        setBallotSelectionElectionQuestionAnswer: (
            state,
            action: PayloadAction<{
                election: IElectionDTO
                questionIndex: number
                answerIndex: number
                selection: number
            }>
        ): BallotSelectionsState => {
            // check bounds
            if (
                action.payload.questionIndex >=
                    action.payload.election.configuration.questions.length ||
                action.payload.answerIndex >=
                    action.payload.election.configuration.questions[action.payload.questionIndex]
                        .answers.length
            ) {
                return state
            }
            const currentSelections = state[action.payload.election.id]

            // check election state
            if (
                !currentSelections ||
                !currentSelections[action.payload.questionIndex] ||
                !isNumber(
                    currentSelections[action.payload.questionIndex][action.payload.answerIndex]
                )
            ) {
                state[action.payload.election.id] =
                    action.payload.election.configuration.questions.map((question) =>
                        question.answers.map((_answer) => -1)
                    )
            }

            // modify
            if (currentSelections) {
                currentSelections[action.payload.questionIndex][action.payload.answerIndex] =
                    action.payload.selection
            }

            return state
        },
    },
})

export const {setBallotSelectionElectionQuestionAnswer} = ballotSelectionsSlice.actions

export const selectBallotSelectionByQuestionAnswer =
    (electionId: number, questionIndex: number, answerIndex: number) => (state: RootState) =>
        state.ballotSelections[electionId]?.[questionIndex]?.[answerIndex]

export default ballotSelectionsSlice.reducer
