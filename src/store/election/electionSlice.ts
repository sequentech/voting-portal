import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store'
import { fetchElection } from './electionAPI';


export interface ElectionState {
    id: number
    status: 'created' | 'started' | 'finished'
}

const initialState = null as ElectionState | null

export const fetchElectionByIdAsync = createAsyncThunk(
    'election/fetchElectionByIdAsync',
    async (electionId: number) => {
      const response = await fetchElection(electionId)
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

export const electionSlice = createSlice({
    name: 'election',
    initialState,
    reducers: {
        setElection: (state, action: PayloadAction<ElectionState>) => {
            const currentState: Partial<ElectionState> = state || {}
            state = {
                ...currentState,
                ...action.payload
            } as ElectionState
        }
    },
})

export const { setElection } = electionSlice.actions

export const selectElectionId = (state: RootState) => state.election?.id

export default electionSlice.reducer
