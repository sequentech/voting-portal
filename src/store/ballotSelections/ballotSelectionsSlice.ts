// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store"
import { IElectionDTO } from "sequent-core"

export type BallotSelection = Array<Array<number>>

export interface BallotSelectionsState {
    [electionId: number]: BallotSelection | undefined
}

const initialState: BallotSelectionsState = {}

export const ballotSelectionsSlice = createSlice({
    name: "ballotSelections",
    initialState,
    reducers: {
        setBallotSelectionElection: (state, action: PayloadAction<{electionId: number, selection: BallotSelection}>): BallotSelectionsState => {
            state[action.payload.electionId] = action.payload.selection
            return state
        },
    },
})

export const {setBallotSelectionElection} = ballotSelectionsSlice.actions

export const selectBallotSelectionByElectionId = (electionId: number) => (state: RootState) => state.ballotSelections[electionId]

export default ballotSelectionsSlice.reducer