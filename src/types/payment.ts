export interface PaymentDetail {
    period: number;
    beginningBalance: number;
    monthlyPayment: number;
    principalPayment: number;
    interestPayment: number;
    endingBalance: number;
}

export interface PaymentTotal {
    totalPrincipal: number;
    totalInterest: number;
    totalPayment: number;
}

export interface PaymentPayload {
    Principal: string;
    Interest: number;
    LoanTermYears: number;
    LoanTermMonths: number;
}