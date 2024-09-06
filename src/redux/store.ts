import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"

import mainSlice from "./features/main/mainSlice";
import { mainApi } from "./features/main/mainApi";
import calculateSlice from './features/calculate/calculateSlice'


export const store = configureStore({
    reducer: {
        mainSlice,
        calculateSlice,
        [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(mainApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();