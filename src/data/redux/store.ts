import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import mainSlice from "./slices/mainSlice";

export const store = configureStore({
    reducer: {
        mainSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();