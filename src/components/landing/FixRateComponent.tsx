import React, { useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { calculateSelector, clearCalculate, setCalculatePayload, setCalculateType, setInterestRate, setLoanTermMonths, setLoanTermYears, setPrincipal, setSchedulePayment, setTotalPayment } from '@/redux/features/calculate/calculateSlice'
import { useAppDispatch } from '@/redux/store'
import { PaymentDetail } from '@/types/payment'
import { sendGAEvent } from '@next/third-parties/google'
export default function FixRateComponent() {
    const calculateSlice = useSelector(calculateSelector);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/[^\d]/g, '');
        dispatch(setPrincipal(input ? parseInt(input, 10).toLocaleString() : ''));
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const amount = e.target.amount.value;
        const annualInterestRate = e.target.annualInterestRate.value;
        const loanTermYears = e.target.loanTermYears.value;
        const loanTermMonths = e.target.loanTermMonths.value;
        dispatch(setCalculateType('normal'));
        dispatch(setCalculatePayload({ Principal: amount, Interest: annualInterestRate, LoanTermYears: loanTermYears, LoanTermMonths: loanTermMonths }));
        generateDifferentiatedSchedule(parseInt(amount.replace(/,/g, ''), 10), annualInterestRate, loanTermYears, loanTermMonths);
        sendGAEvent('event', 'Calculators (Fix Rate)', { value: 'xyz' })
        // alert(`Type: ${type}\n Amount: ${amount}\nAnnual Interest Rate: ${annualInterestRate}\nLoan Term Years: ${loanTermYears}`);
    }

    const generateDifferentiatedSchedule = (
        principal: number,
        annualInterestRateParam: number,
        loanTermYearsParam: number,
        loanTermMonthsParam: number
    ) => {
        // Calculate the total number of payments (months)
        const numberOfPayments = Number(loanTermYearsParam * 12) + Number(loanTermMonthsParam);
        const monthlyInterestRate = annualInterestRateParam / 12;
        const totalInterest = principal * monthlyInterestRate / 100 * numberOfPayments;
        const monthlyTotalInterest = totalInterest / numberOfPayments;
        const totalPayment = principal + totalInterest;
        const monthlyTotalPayment = totalPayment / numberOfPayments;

        dispatch(setTotalPayment({
            totalInterest: totalInterest,
            totalPayment: totalPayment,
            totalPrincipal: principal
        }));
        let balance = principal;
        let newSchedule: PaymentDetail[] = [];
        for (let i = 0; i < numberOfPayments; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const monthlyPayment = monthlyTotalPayment;
            const endingBalance = balance - monthlyTotalPayment;

            newSchedule.push({
                period: i + 1,
                beginningBalance: balance,
                monthlyPayment: monthlyPayment,
                principalPayment: monthlyTotalPayment,
                interestPayment: interestPayment,
                endingBalance: endingBalance,
            });
        }
        dispatch(setSchedulePayment(newSchedule));
    };
    return (
        <TabsContent value="fix" className='w-full'>
            <form onSubmit={handleSubmit}>
                <Card className='border-none bg-white space-y-4 w-full'>
                    <CardTitle> ຄຳນວນຄ່າງວດ</ CardTitle>
                    <CardContent className="space-y-6 lg:px-12">
                        <div className="space-y-1">
                            <Label htmlFor="current">ຈຳນວນເງີນທິ່ຕ້ອງການ</Label>
                            <Input
                                name='amount'
                                type="text"
                                placeholder='250.000.000'
                                value={calculateSlice.Principal ?? ""}
                                onChange={handleChange}
                                maxLength={15}
                                required
                            />
                        </div>
                        <div className='flex flex-row space-x-4'>
                            <div className="flex flex-1 flex-col space-y-2">
                                <Label htmlFor="new">ດອກເບ້ຍຕໍ່ປີ</Label>
                                <div className='relative'>
                                    <Input
                                        name='annualInterestRate'
                                        type="number"
                                        value={calculateSlice.InterestRate ?? ""}
                                        onChange={(e) => dispatch(setInterestRate(parseFloat(e.target.value)))}
                                        placeholder='15,5'
                                        step="any"
                                        required
                                    />
                                    <div>
                                        <span className='absolute right-2 top-1/2 -translate-y-1/2'>%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-1 flex-col">
                                <Label htmlFor="new">ໄລຍະເວລາ</Label>
                                <div className='relative'>
                                    <Input
                                        name='loanTermYears'
                                        type="number"
                                        value={calculateSlice.LoanTermYears ?? ''}
                                        onChange={(e) => dispatch(setLoanTermYears(parseInt(e.target.value, 10)))}
                                        placeholder='0'
                                        required
                                    />
                                    <div>
                                        <span className='absolute right-2 top-1/2 -translate-y-1/2'>ປີ</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-1 flex-col justify-end">
                                <div className='relative'>
                                    <Input
                                        name='loanTermMonths'
                                        type="number"
                                        value={calculateSlice.LoanTermMonths ?? ''}
                                        onChange={(e) => dispatch(setLoanTermMonths(parseInt(e.target.value, 10)))}
                                        placeholder='0'
                                        required
                                    />
                                    <div>
                                        <span className='absolute right-2 top-1/2 -translate-y-1/2'>ເດືອນ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='w-full flex flex-row space-x-4 lg:px-12'>
                        <Button variant={'outline'} className='w-full' type='button' onClick={() => {
                            dispatch(clearCalculate())
                        }}>ເລີ່ມໃໝ່</Button>
                        <Button className='w-full' type='submit'>ຄຳນວນ</Button>
                    </CardFooter>
                </Card >
            </form >
        </TabsContent >
    )
}
