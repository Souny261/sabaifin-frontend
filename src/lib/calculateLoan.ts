
export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principalPayment: number;
    interestPayment: number;
    remainingBalance: number;
  }>;
}

export type LoanType = "amortized" | "flat";
export type AmortizedSubType = "equal-installment" | "equal-principal";

// Calculate EMI (Equated Monthly Installment) - Amortized loan with equal installments
const calculateEMI = (
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number
): LoanResult => {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Calculate monthly payment using the formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
  const monthlyPayment =
    principal *
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  // Calculate total payment and interest
  const totalPayment = monthlyPayment * loanTermMonths;
  const totalInterest = totalPayment - principal;

  // Generate amortization schedule
  const amortizationSchedule = [];
  let remainingBalance = principal;

  for (let month = 1; month <= loanTermMonths; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;

    remainingBalance -= principalPayment;

    amortizationSchedule.push({
      month,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance: remainingBalance < 0 ? 0 : remainingBalance
    });
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
};

// Calculate Equal Principal Payment - Amortized loan with equal principal payments
const calculateEqualPrincipal = (
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number
): LoanResult => {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Calculate fixed principal payment
  const principalPayment = principal / loanTermMonths;

  // Generate amortization schedule
  const amortizationSchedule = [];
  let remainingBalance = principal;
  let totalPayment = 0;

  for (let month = 1; month <= loanTermMonths; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const monthlyPayment = principalPayment + interestPayment;

    remainingBalance -= principalPayment;
    totalPayment += monthlyPayment;

    amortizationSchedule.push({
      month,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance: remainingBalance < 0 ? 0 : remainingBalance
    });
  }

  const totalInterest = totalPayment - principal;

  return {
    // First month payment as reference
    monthlyPayment: amortizationSchedule[0].payment,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
};

// Calculate Flat Rate Loan
const calculateFlatRate = (
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number
): LoanResult => {
  const years = loanTermMonths / 12;

  // Calculate total interest for the entire period
  const totalInterest = principal * (annualInterestRate / 100) * years;

  // Calculate total repayment
  const totalPayment = principal + totalInterest;

  // Calculate fixed monthly payment
  const monthlyPayment = totalPayment / loanTermMonths;

  // Generate amortization schedule
  const amortizationSchedule = [];
  const interestPerMonth = totalInterest / loanTermMonths;
  const principalPerMonth = principal / loanTermMonths;

  let remainingBalance = principal;

  for (let month = 1; month <= loanTermMonths; month++) {
    remainingBalance -= principalPerMonth;

    amortizationSchedule.push({
      month,
      payment: monthlyPayment,
      principalPayment: principalPerMonth,
      interestPayment: interestPerMonth,
      remainingBalance: remainingBalance < 0 ? 0 : remainingBalance
    });
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
};

export const calculateLoan = (
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number,
  loanType: LoanType = "amortized",
  amortizedSubType: AmortizedSubType = "equal-installment"
): LoanResult => {
  if (loanType === "flat") {
    return calculateFlatRate(principal, annualInterestRate, loanTermMonths);
  } else {
    // Amortized loan
    if (amortizedSubType === "equal-principal") {
      return calculateEqualPrincipal(principal, annualInterestRate, loanTermMonths);
    } else {
      // Default to equal installment (EMI)
      return calculateEMI(principal, annualInterestRate, loanTermMonths);
    }
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LAK',
    maximumFractionDigits: 0
  }).format(amount);
};

// Mock bank data for comparison section
export interface BankOffer {
  id: string;
  name: string;
  logoUrl: string;
  interestRate: number;
  processingFee: number;
  maximumLoanAmount: number;
  minimumLoanAmount: number;
  description: string;
}

export const mockBanks: BankOffer[] = [
  {
    id: "bank1",
    name: "Lao Development Bank",
    logoUrl: "/placeholder.svg",
    interestRate: 7.5,
    processingFee: 1.0,
    maximumLoanAmount: 500000000,
    minimumLoanAmount: 5000000,
    description: "Trusted national bank with competitive rates and flexible repayment options."
  },
  {
    id: "bank2",
    name: "BCEL",
    logoUrl: "/placeholder.svg",
    interestRate: 8.2,
    processingFee: 0.8,
    maximumLoanAmount: 700000000,
    minimumLoanAmount: 10000000,
    description: "Laos' leading commercial bank offering personalized loan solutions."
  },
  {
    id: "bank3",
    name: "Indochina Bank",
    logoUrl: "/placeholder.svg",
    interestRate: 6.9,
    processingFee: 1.2,
    maximumLoanAmount: 300000000,
    minimumLoanAmount: 3000000,
    description: "Modern digital bank with fast approval and low interest rates."
  }
];
