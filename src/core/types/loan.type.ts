export type LoanType = {
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
};

export interface UserApplyType {
    action: string
    name: string
    phone: string
    purpose: string
    amount: string
    term: string
    status: string
}

export interface PartnerApplyType {
    action: string
    companyName: string
    contactName: string
    position: string
    phone: string
    status: string
}
