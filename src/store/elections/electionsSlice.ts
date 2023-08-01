import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState, AppThunk} from "../store"
import {fetchElection} from "./electionsAPI"
import { IElectionDTO } from "sequent-core"

export interface ElectionsState {
    [id: number]: IElectionDTO | undefined
}

const initialState: ElectionsState = {}

export const fetchElectionByIdAsync = createAsyncThunk(
    "elections/fetchElectionByIdAsync",
    async (electionId: number) => {
        console.log("trying fetchElectionByIdAsync")
        const response = await fetchElection(electionId)
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)

export const electionsSlice = createSlice({
    name: "elections",
    initialState,
    reducers: {
        setElection: (state, action: PayloadAction<IElectionDTO>): ElectionsState => {
            state[action.payload.id] = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchElectionByIdAsync.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.id] = action.payload
            }
            return state
          })
      },
})

export const {setElection} = electionsSlice.actions

export const selectElectionById = (electionId: number) => (state: RootState) => state.elections[electionId]

export default electionsSlice.reducer