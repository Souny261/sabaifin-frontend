import { z } from "zod";

export const formSchema = z.object({
    loanAmount: z.number().min(1000000, { message: "Minimum loan is 1,000,000 LAK" }).max(1000000000, { message: "Maximum loan is 1,000,000,000 LAK" }),
    interestRate: z.number().min(1, { message: "Minimum interest rate is 1%" }).max(30, { message: "Maximum interest rate is 30%" }),
    loanTerm: z.number().min(3, { message: "Minimum term is 3 months" }).max(360, { message: "Maximum term is 360 months" }),
    loanType: z.enum(["amortized", "flat"]),
    amortizedSubType: z.enum(["equal-installment", "equal-principal"]),
});

export type LoanFormValues = z.infer<typeof formSchema>;