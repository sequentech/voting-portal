import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import electionReducer from './election/electionSlice'

// note: use Immer, https://immerjs.github.io/immer/

export const store = configureStore({
  reducer: {
    election: electionReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
