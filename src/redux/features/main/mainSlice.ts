import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type StateProp = {
    Counter: number,
}

export const initialValue: StateProp = {
    Counter: 0
}


const mainSlice = createSlice({
    name: "mainSlice",
    initialState: initialValue,
    reducers: {
        incremented: state => {
            state.Counter += 1
        },
        decremented: state => {
            state.Counter -= 1
        },
        setCounter: (state, action: PayloadAction<number>) => {
            state.Counter = action.payload
        },
    },
})

export const mainSelector = (state: RootState) => state.mainSlice;
export const { incremented, decremented, setCounter } = mainSlice.actions
export default mainSlice.reducer;