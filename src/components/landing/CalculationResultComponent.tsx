"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import ChartThree from '../charts/ChartThree'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useSelector } from 'react-redux'
import { calculateSelector } from '@/redux/features/calculate/calculateSlice'
import { FileSpreadsheet } from 'lucide-react'
export default function CalculationResultComponent() {
    const router = useRouter()
    const calculateSlice = useSelector(calculateSelector);
    return (
        <div className="w-full bg-slate-50 rounded-lg">
            <Card className="border-none bg-slate-50">
                <CardHeader>
                    <CardTitle>ຜົນລັບການຄຳນວນ</CardTitle>
                    <CardDescription>
                        ຈໍານວນເງີນທີ່ຄຳນວນອອກມານັ້ນເປັນການຄຳນວນໂດຍປະມານເທົ່ານັ້ນ. ຂໍ້ກໍານົດທີ່ແນ່ນອນຂອງເງິນກູ້ຢືມແມ່ນຂື້ນກັບເງືອນໄຂຂອງແຕ່ລະບໍລິສັດ.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 lg:px-5 px-2">
                    <ChartThree />
                </CardContent>
                {
                    calculateSlice.SchedulePayment.length > 0 &&
                    <CardFooter className='w-full flex flex-row space-x-4'>
                        <Button variant={'outline'} onClick={() =>
                            router.push(`/payment/${calculateSlice.CalculateType}/${calculateSlice.Principal.replace(/,/g, '')}/${calculateSlice.InterestRate}/${calculateSlice.LoanTermYears}/${calculateSlice.LoanTermMonths}`)
                        } className='w-full text-primary  font-bold h-14' type='button'>
                            <FileSpreadsheet className='pr-2' /> <span>ລາຍລະອຽດແຜນການຈ່າຍ</span>
                        </Button>
                    </CardFooter>
                }
            </Card >
        </div >
    )
}
