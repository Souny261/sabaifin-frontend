import { RootState } from "@/redux/store"
import { PaymentDetail, PaymentPayload, PaymentTotal } from "@/types/payment"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StateProp = {
    SchedulePayment: PaymentDetail[],
    TotalPayment: PaymentTotal | null,
    CalculateType: string,
    Principal: string,
    InterestRate: number | null,
    LoanTermYears: number | null,
    LoanTermMonths: number | null,
    TabActive: string
}

export const initialValue: StateProp = {
    SchedulePayment: [],
    TotalPayment: {
        totalPrincipal: 0,
        totalInterest: 0,
        totalPayment: 0,
    },
    CalculateType: 'fix',
    Principal: "",
    InterestRate: null,
    LoanTermYears: null,
    LoanTermMonths: null,
    TabActive: 'fix'
}
const calculateSlice = createSlice({
    name: "calculateSlice",
    initialState: initialValue,
    reducers: {
        setSchedulePayment: (state, action: PayloadAction<PaymentDetail[]>) => {
            state.SchedulePayment = action.payload
        },
        setTotalPayment: (state, action: PayloadAction<PaymentTotal>) => {
            state.TotalPayment = action.payload
        },
        setCalculateType: (state, action: PayloadAction<string>) => {
            state.CalculateType = action.payload
        },
        setCalculatePayload: (state, action: PayloadAction<PaymentPayload>) => {
            state.Principal = action.payload.Principal
            state.InterestRate = action.payload.Interest
            state.LoanTermYears = action.payload.LoanTermYears
            state.LoanTermMonths = action.payload.LoanTermMonths
        },
        setPrincipal: (state, action: PayloadAction<string>) => {
            state.Principal = action.payload
        },
        setInterestRate: (state, action: PayloadAction<number>) => {
            state.InterestRate = action.payload
        },
        setLoanTermYears: (state, action: PayloadAction<number>) => {
            state.LoanTermYears = action.payload
        },
        setLoanTermMonths: (state, action: PayloadAction<number>) => {
            state.LoanTermMonths = action.payload
        },
        clearCalculate: (state) => {
            state.Principal = ""
            state.InterestRate = null
            state.LoanTermYears = null
            state.LoanTermMonths = null
        },
        resetResult: (state) => {
            state.SchedulePayment = []
            state.TotalPayment = {
                totalPrincipal: 0,
                totalInterest: 0,
                totalPayment: 0,
            }
        },
        setTabAcive: (state, action: PayloadAction<string>) => {
            state.TabActive = action.payload
        }
    },
})

export const calculateSelector = (state: RootState) => state.calculateSlice;
export const {
    setSchedulePayment,
    setTotalPayment,
    setCalculateType,
    setCalculatePayload,
    setPrincipal,
    setInterestRate,
    setLoanTermYears,
    setLoanTermMonths,
    clearCalculate,
    resetResult,
    setTabAcive
} = calculateSlice.actions
export default calculateSlice.reducer;