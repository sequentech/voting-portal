import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import electionsReducer from "./elections/electionsSlice"

// note: use Immer, https://immerjs.github.io/immer/

export const store = configureStore({
    reducer: {
        elections: electionsReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
