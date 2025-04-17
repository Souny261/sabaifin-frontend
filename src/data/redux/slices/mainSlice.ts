import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoanType } from "@/core/types/loan.type";

type StateProp = {
    Loan: LoanType | null,
}

export const initialValue: StateProp = {
    Loan: null
}


const mainSlice = createSlice({
    name: "mainSlice",
    initialState: initialValue,
    reducers: {
        setLoan: (state, action: PayloadAction<LoanType>) => {
            state.Loan = action.payload
        },
    },
})

export const mainSelector = (state: RootState) => state.mainSlice;
export const { setLoan } = mainSlice.actions
export default mainSlice.reducer;
