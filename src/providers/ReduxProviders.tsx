'use client';
import { store } from "@/data/redux/store";
import { Provider } from "react-redux";
export function ReduxProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}