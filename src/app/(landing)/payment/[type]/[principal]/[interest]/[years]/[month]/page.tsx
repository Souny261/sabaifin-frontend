"use client"
import ResultTableComponent from '@/components/landing/ResultTableComponent';
import { Button } from '@/components/ui/button';
import { calculateSelector, setSchedulePayment, setTotalPayment } from '@/redux/features/calculate/calculateSlice';
import { useAppDispatch } from '@/redux/store';
import { PaymentDetail } from '@/types/payment';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';



export default function page() {
    const calculateSlice = useSelector(calculateSelector);
    const dispatch = useAppDispatch();
    const numberFormatter = new Intl.NumberFormat('la', { style: 'currency', currency: 'LAK' });
    const params = useParams<{ type: string; principal: string; interest: string; years: string; month: string }>()
    const router = useRouter()
    function TypeName(type: string): string {
        switch (type) {
            case "normal":
                return "ດອກເບ້ຍຄົງທີ່"
            case "fix":
                return "Annuity"
            case "diff":
                return "Differentiated"
            default:
                return ""
        }
    }
    const handleCaculate = (amount: string, annualInterestRate: number, loanTermYears: number, loanTermMonths: number) => {
        if (params.type == 'normal') {
            generateFixedSchedule(parseInt(amount.replace(/,/g, ''), 10), annualInterestRate, loanTermYears, loanTermMonths);
        } else if (params.type == 'fix') {
            generateAmortizationSchedule(parseInt(amount.replace(/,/g, ''), 10), annualInterestRate, loanTermYears, loanTermMonths);
        } else {
            generateDifferentiatedSchedule(parseInt(amount.replace(/,/g, ''), 10), annualInterestRate, loanTermYears, loanTermMonths);
        }
    }

    const generateFixedSchedule = (
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
                principalPayment: monthlyPayment - monthlyTotalInterest,
                interestPayment: monthlyTotalInterest,
                endingBalance: endingBalance,
            });
        }
        dispatch(setSchedulePayment(newSchedule));
    };

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

    useEffect(() => {
        handleCaculate(params.principal, Number(params.interest), Number(params.years), Number(params.month));
    }, [params]);
    return (
        <div className='flex justify-center items-center flex-col py-24 space-y-4 md:px-7 lg:px-36 px-2'>
            {/* <h1>Details {params.type} - {params.principal} - {params.interest} - {params.years} - {params.month}</h1> */}
            <div className='flex flex-col w-full bg-white shadow-sm p-4 rounded-md space-y-4'>
                <div className='flex justify-between flex-row'>
                    <div className='flex flex-col flex-1'>
                        <div className='font-bold text-lg'>
                            ລາຍລະອຽດແຜນການຈ່າຍ
                        </div>
                        <div className='text-sm text-gray-500'>
                            ຈໍານວນເງີນທີ່ຄຳນວນອອກມານັ້ນເປັນການຄຳນວນໂດຍປະມານເທົ່ານັ້ນ. ຂໍ້ກໍານົດທີ່ແນ່ນອນຂອງເງິນກູ້ຢືມແມ່ນຂື້ນກັບເງືອນໄຂຂອງແຕ່ລະບໍລິສັດ.
                        </div>
                    </div>
                    <Button onClick={() => {
                        router.back()
                    }}>
                        ຄຳນວນອີກຄັ້ງ
                    </Button>
                </div>

                <div className='flex flex-col lg:flex-row p-4 space-y-4 lg:space-x-8 space-x-0 lg:space-y-0'>
                    <div className='flex flex-col flex-1 bg-slate-50 p-4 rounded-md space-y-2'>
                        <div className="flex flex-row items-center">
                            <span className="mr-2 block h-2 w-full max-w-2 rounded-full bg-primary"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span className=""> ຈຳນວນເງິນທີ່ຕ້ອງການ </span>
                                <span className="font-bold text-md lg:text-lg"> {numberFormatter.format(Number(params.principal))} </span>
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <span className="mr-2 block h-2 w-full max-w-2 rounded-full bg-primary"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span className=""> ອັດຕາດອກເບ້ຍ </span>
                                <span className="font-bold text-md lg:text-lg"> {params.interest} / ປີ</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 bg-slate-50 p-4 rounded-md space-y-2'>
                        <div className="flex flex-row items-center">
                            <span className="mr-2 block h-2 w-full max-w-2 rounded-full bg-primary"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span className=""> ໄລຍະເວລາ </span>
                                <span className="font-bold text-md lg:text-lg"> {params.years} ປີ  {params.month} ເດືອນ </span>
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <span className="mr-2 block h-2 w-full max-w-2 rounded-full bg-primary"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span className=""> ປະເພດ </span>
                                <span className="font-bold text-md lg:text-lg"> {TypeName(params.type)}</span>
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 bg-slate-50 p-4 rounded-md space-y-2'>
                        <div className="flex flex-row items-center">
                            <span className="mr-2 block h-2 w-full max-w-2 rounded-full bg-primary"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span className=""> ລວມດອກເບ້ຍ </span>
                                <span className="font-bold text-md lg:text-lg"> {numberFormatter.format(calculateSlice.TotalPayment?.totalInterest ?? 0)}</span>
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <span className="mr-2 block h-2 w-full max-w-2 rounded-full bg-primary"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span className=""> ລວມເງີນທີ່ຕ້ອງຊຳລະ </span>
                                <span className="font-bold text-md lg:text-lg"> {numberFormatter.format(calculateSlice.TotalPayment?.totalPayment ?? 0)} </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ResultTableComponent type={params.type} />
            <div className='text-sm text-red-500'>
                ຂໍ້ກໍານົດທີ່ແນ່ນອນຂອງຈຳນວນເງິນກູ້ຢືມແມ່ນຂື້ນກັບເງືອນໄຂຂອງແຕ່ລະບໍລິສັດ.
            </div>
        </div>
    )
}
