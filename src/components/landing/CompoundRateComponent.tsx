import React, { useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useSelector } from 'react-redux'
import { calculateSelector, clearCalculate, setCalculatePayload, setCalculateType, setInterestRate, setLoanTermMonths, setLoanTermYears, setPrincipal, setSchedulePayment, setTotalPayment } from '@/redux/features/calculate/calculateSlice'
import { useAppDispatch } from '@/redux/store'
import { PaymentDetail } from '@/types/payment'
import { sendGAEvent } from '@next/third-parties/google'

export default function CompoundRateComponent() {
    const calculateSlice = useSelector(calculateSelector);
    const dispatch = useAppDispatch();

    // const [amount, setAmount] = useState('');
    // const [annualInterestRate, setAnnualInterestRate] = useState<number | null>(null);
    // const [loanTermYears, setLoanTermYears] = useState<number | null>(null);
    // const [loanTermMonths, setLoanTermMonths] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/[^\d]/g, '');
        dispatch(setPrincipal(input ? parseInt(input, 10).toLocaleString() : ''));
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const type = e.target.type.value;
        const amount = e.target.amount.value;
        const annualInterestRate = e.target.annualInterestRate.value;
        const loanTermYears = e.target.loanTermYears.value;
        const loanTermMonths = e.target.loanTermMonths.value;
        // alert(`Type: ${type}\n Amount: ${amount}\nAnnual Interest Rate: ${annualInterestRate}\nLoan Term Years: ${loanTermYears}`);
        dispatch(setCalculateType(type));
        dispatch(setCalculatePayload({ Principal: amount, Interest: annualInterestRate, LoanTermYears: loanTermYears, LoanTermMonths: loanTermMonths }));
        if (type == 'fix') {
            generateAmortizationSchedule(parseInt(amount.replace(/,/g, ''), 10), annualInterestRate, loanTermYears, loanTermMonths);
        } else {
            generateDifferentiatedSchedule(parseInt(amount.replace(/,/g, ''), 10), annualInterestRate, loanTermYears, loanTermMonths);
        }
        sendGAEvent('event', 'Calculators (Compound Rate)', { value: 'xyz' })
    }


    const calculateMonthlyPayment = (principal: number, annualInterestRate: number, loanTermYears: number, loanTermMonthsParam: number): number => {
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfPayments = Number(loanTermYears * 12) + Number(loanTermMonthsParam!);
        return (
            principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        );
    };

    const generateAmortizationSchedule = (principal: number, annualInterestRateParam: number, loanTermYearsParam: number, loanTermMonthsParam: number) => {
        const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRateParam ?? 0, loanTermYearsParam ?? 0, loanTermMonthsParam ?? 0);
        const monthlyInterestRate = annualInterestRateParam! / 12 / 100;
        const numberOfPayments = Number(loanTermYearsParam * 12) + Number(loanTermMonthsParam!);
        let balance = Number(principal);
        let newSchedule: PaymentDetail[] = [];
        let totalPrincipal = 0;
        let totalInterest = 0;
        let totalPayment = 0;

        for (let i = 0; i < numberOfPayments; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            const endingBalance = balance - principalPayment;
            newSchedule.push({
                period: i + 1,
                beginningBalance: balance,
                monthlyPayment: monthlyPayment,
                principalPayment: principalPayment,
                interestPayment: interestPayment,
                endingBalance: endingBalance,
            });
            console.log(principalPayment);
            console.log(interestPayment);


            balance = endingBalance;
            totalPrincipal += principalPayment;
            totalInterest += interestPayment;
            totalPayment += monthlyPayment;
        }


        dispatch(setSchedulePayment(newSchedule));
        dispatch(setTotalPayment({ totalPrincipal, totalInterest, totalPayment }));
    };

    const generateDifferentiatedSchedule = (principal: number, annualInterestRateParam: number, loanTermYearsParam: number, loanTermMonthsParam: number) => {
        const monthlyInterestRate = annualInterestRateParam / 12 / 100;
        const numberOfPayments = Number(loanTermYearsParam * 12) + Number(loanTermMonthsParam);
        const constantPrincipalPayment = principal / numberOfPayments;

        let balance = principal;
        let newSchedule: PaymentDetail[] = [];
        let totalPrincipal = 0;
        let totalInterest = 0;
        let totalPayment = 0;

        for (let i = 0; i < numberOfPayments; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const monthlyPayment = constantPrincipalPayment + interestPayment;
            const endingBalance = balance - constantPrincipalPayment;

            newSchedule.push({
                period: i + 1,
                beginningBalance: balance,
                monthlyPayment: monthlyPayment,
                principalPayment: constantPrincipalPayment,
                interestPayment: interestPayment,
                endingBalance: endingBalance,
            });

            balance = endingBalance;
            totalPrincipal += constantPrincipalPayment;
            totalInterest += interestPayment;
            totalPayment += monthlyPayment;
        }

        dispatch(setSchedulePayment(newSchedule));
        dispatch(setTotalPayment({ totalPrincipal, totalInterest, totalPayment }));
    };
    
    return (
        <TabsContent value="compound" className='w-full '>
            <form onSubmit={handleSubmit}>
                <Card className='border-none bg-white space-y-4'>
                    <CardTitle>ຄຳນວນຄ່າງວດ</CardTitle>
                    <CardContent className="space-y-6 lg:px-12">
                        <div className='space-y-6'>
                            <Label htmlFor="current">ເລືອກວິທີການຊຳລະຂອງທ່ານ</Label>
                            <RadioGroup
                                name='type'
                                defaultValue="fix"
                                className='flex flex-row justify-between lg:justify-start px-4 space-x-4'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="fix" id="r2" />
                                    <Label htmlFor="r2">ແຕ່ລະງວດເທົ່າກັນ</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="diff" id="r3" />
                                    <Label htmlFor="r3">ແຕ່ລະງວດແຕກຕ່າງກັນ</Label>
                                </div>
                            </RadioGroup>
                        </div>
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
                                        value={calculateSlice.InterestRate ?? ''}
                                        onChange={(e) => dispatch(setInterestRate(parseFloat(e.target.value)))}
                                        placeholder='15,5'
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
                </Card>
            </form>

        </TabsContent>
    )
}
