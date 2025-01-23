import { configureStore } from '@reduxjs/toolkit'
import inputReducer from '../features/inputSlice'
import { api } from '../services/api'

export const store = configureStore({
    reducer: {
        input: inputReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>