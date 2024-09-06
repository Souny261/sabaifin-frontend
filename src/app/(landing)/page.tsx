'use client'
import { useMemo } from "react";
import getScrollAnimation from "@/lib/getScrollAnimation";
import AdsComponent from "@/components/landing/AdsComponent";
import Calculators from "@/components/landing/Calculators";
import CalculationResultComponent from "@/components/landing/CalculationResultComponent";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { useAppDispatch } from "@/redux/store";
import { calculateSelector, resetResult, setTabAcive } from "@/redux/features/calculate/calculateSlice";
import { useSelector } from "react-redux";
export default function Home() {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    const dispatch = useAppDispatch();
    const calculateSlice = useSelector(calculateSelector);
    return (
        <div className="flex flex-col">
            <Tabs defaultValue={`${calculateSlice.TabActive}`}>
                <div className="relative">
                    <div className="relative h-1/2 mt-16">
                        <AdsComponent />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-12 w-full lg:w-auto px-2">
                        <div className="flex flex-col bg-white p-4 rounded-lg space-y-2 w-full shadow-sm">
                            <div className="flex flex-col">
                                <div className="text-lg lg:text-2xl font-bold">
                                    ຄຳນວນດອກເບ້ຍເງິນກູ້
                                </div>
                                <div className="text-gray-500 text-md">
                                    ວິທີ່ຄຳນວນດອກເບ້ຍເງິນກູ້ ຮູ້ໄວ້ກ່ອນຂໍສິນເຊື່ອ
                                </div>
                            </div>
                            <TabsList className="grid grid-cols-2 bg-slate-50 p-2 rounded-md lg:w-[50rem]">
                                <TabsTrigger value="fix" onClick={() => {
                                    dispatch(resetResult());
                                    dispatch(setTabAcive("fix"));
                                }} className="text-md p-2 data-[state=active]:bg-primary data-[state=active]:text-white">ດອກເບ້ຍຄົງທີ່</TabsTrigger>
                                <TabsTrigger value="compound" onClick={() => {
                                    dispatch(resetResult());
                                    dispatch(setTabAcive("compound"));
                                }} className="text-md p-2 data-[state=active]:bg-primary data-[state=active]:text-white">ດອກເບ້ຍທົບຕົ້ນທົບດອກ</TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm md:mx-7 lg:mx-36 mx-2  my-10 p-2 mt-[7rem] flex flex-col justify-center items-center space-y-8">
                    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 w-full justify-center items-start lg:p-4">
                        <div className="flex flex-1 justify-center w-full">
                            <Calculators />
                        </div>
                        <div className="flex flex-1 justify-center w-full">
                            <CalculationResultComponent />
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
