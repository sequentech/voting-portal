// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {IElectionDTO, IDecodedVoteQuestion, IDecodedVoteChoice} from "sequent-core"
import {isUndefined} from "ui-essentials"

export type BallotSelection = Array<IDecodedVoteQuestion>

export interface BallotSelectionsState {
    [electionId: number]: BallotSelection | undefined
}

const initialState: BallotSelectionsState = {}

export const ballotSelectionsSlice = createSlice({
    name: "ballotSelections",
    initialState,
    reducers: {
        setBallotSelectionVoteChoice: (
            state,
            action: PayloadAction<{
                election: IElectionDTO
                questionIndex: number
                voteChoice: IDecodedVoteChoice
            }>
        ): BallotSelectionsState => {
            // check bounds
            if (
                action.payload.questionIndex >=
                    action.payload.election.configuration.questions.length ||
                action.payload.voteChoice.id >=
                    action.payload.election.configuration.questions[action.payload.questionIndex]
                        .answers.length
            ) {
                return state
            }
            let currentElection = state[action.payload.election.id]
            let currentChoiceIndex = currentElection?.[
                action.payload.questionIndex
            ]?.choices.findIndex((choice) => action.payload.voteChoice.id === choice.id)
            const currentChoice =
                !isUndefined(currentElection) &&
                !isUndefined(currentChoiceIndex) &&
                currentChoiceIndex > -1
                    ? currentElection[action.payload.questionIndex]?.choices[currentChoiceIndex]
                    : undefined

            // check election state
            if (!currentElection || isUndefined(currentChoice)) {
                state[action.payload.election.id] =
                    action.payload.election.configuration.questions.map((question) => ({
                        is_explicit_invalid: false,
                        invalid_errors: [],
                        choices: question.answers.map((answer) => ({
                            id: answer.id,
                            selected: -1,
                        })),
                    }))
            }

            // modify
            currentElection = state[action.payload.election.id]
            currentChoiceIndex = currentElection?.[action.payload.questionIndex]?.choices.findIndex(
                (choice) => action.payload.voteChoice.id === choice.id
            )
            if (currentElection && !isUndefined(currentChoiceIndex)) {
                currentElection[action.payload.questionIndex].choices[currentChoiceIndex] =
                    action.payload.voteChoice
            }

            return state
        },
    },
})

export const {setBallotSelectionVoteChoice} = ballotSelectionsSlice.actions

export const selectBallotSelectionVoteChoice =
    (electionId: number, questionIndex: number, answerIndex: number) => (state: RootState) =>
        state.ballotSelections[electionId]?.[questionIndex]?.choices.find(
            (choice) => answerIndex === choice.id
        )

export const selectBallotSelection = (electionId: number) => (state: RootState) =>
    state.ballotSelections[electionId]

export default ballotSelectionsSlice.reducer
