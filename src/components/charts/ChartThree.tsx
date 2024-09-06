"use client"
import { ApexOptions } from "apexcharts";
import React from "react";


interface ChartThreeState {
  series: number[];
}
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { calculateSelector } from "@/redux/features/calculate/calculateSlice";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartThree: React.FC = () => {
  const calculateSlice = useSelector(calculateSelector);
  const numberFormatter = new Intl.NumberFormat('la', { style: 'currency', currency: 'LAK' });

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#3C50E0", "#0FADCF"],
    labels: ["ເງີນຕົ້ນ", "ລວມດອກເບ້ຍ"],
    legend: {
      show: false,
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "45%",
          background: "transparent",
          labels: {
            show: false,
          }
        },
      },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 300,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };
  return (
    <div className="rounded-md bg-white px-4 pb-5 pt-7 shadow-default">
      <div className="mb-2 flex flex-col lg:flex-row justify-center items-center">
        <div id="chartThree" className="mx-auto flex justify-center lg:flex-none flex-col">
          <ReactApexChart
            options={options}
            series={calculateSlice.TotalPayment?.totalInterest! > 0 ? [
              (calculateSlice.TotalPayment?.totalPrincipal! /
                (calculateSlice.TotalPayment?.totalInterest! + calculateSlice.TotalPayment?.totalPrincipal!)) *
              100,
              (calculateSlice.TotalPayment?.totalInterest! /
                (calculateSlice.TotalPayment?.totalInterest! + calculateSlice.TotalPayment?.totalPrincipal!)) *
              100,
            ] : [100]}
            type="donut"
          />
        </div>
        <div className="flex flex-col lg:flex-1 space-y-4  w-full">
          <div className="flex flex-row items-center">
            <span className="flex flex-none mr-2 h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex flex-row w-full flex-1 justify-between text-sm font-medium text-black dark:text-white">
              <span className="text-lg"> ເງີນຕົ້ນ  </span>
              <span className="font-bold text-lg"> {numberFormatter.format(calculateSlice.TotalPayment?.totalPrincipal ?? 0)}</span>
            </p>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span className="text-lg"> ລວມດອກເບ້ຍ </span>
              <span className="font-bold text-lg"> {numberFormatter.format(calculateSlice.TotalPayment?.totalInterest ?? 0)}</span>
            </p>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-green-600"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span className="text-lg"> ລວມເງີນທີ່ຕ້ອງຊຳລະ </span>
              <span className="font-bold text-lg">{numberFormatter.format(calculateSlice.TotalPayment?.totalPayment ?? 0)}</span>
            </p>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-green-600"></span>
            {
              calculateSlice.CalculateType == "fix" || calculateSlice.CalculateType == "normal" ? (
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span className="text-lg"> ຊຳລະຕໍ່ງວດ </span>
                  <span className="font-bold text-lg"> {calculateSlice.SchedulePayment.length == 0 ? numberFormatter.format(0) : numberFormatter.format(calculateSlice.SchedulePayment[0]?.monthlyPayment)}</span>
                </p>) : (
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white items-center">
                  <span className="text-lg"> ຊຳລະຕໍ່ງວດ</span>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg"> {calculateSlice.SchedulePayment.length == 0 ? numberFormatter.format(0) : numberFormatter.format(calculateSlice.SchedulePayment[0]?.monthlyPayment)}</span>
                    <span>ຫາ</span>
                    <span className="font-bold text-lg">
                      {calculateSlice.SchedulePayment.length === 0
                        ? numberFormatter.format(0)
                        : (() => {
                          const reversedIndex = calculateSlice.SchedulePayment.slice().reverse().findIndex((item) => item.monthlyPayment !== 0);
                          const latestIndex = reversedIndex === -1 ? -1 : calculateSlice.SchedulePayment.length - 1 - reversedIndex;
                          return numberFormatter.format(latestIndex === -1 ? 0 : calculateSlice.SchedulePayment[latestIndex].monthlyPayment);
                        })()
                      }
                    </span>
                  </div>
                </p>
              )
            }
          </div>
        </div>
      </div>
      {/* {
        calculateSlice.SchedulePayment.length > 0 && calculateSlice.SchedulePayment.map((item, index) => (
          <div key={index} className="w-full flex flex-col lg:flex-row">
            <div className="flex flex-row items-center">
              {index + 1}    \
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span className="text-lg"> ເງີນຕົ້ນ </span>
                <span className="font-bold text-lg"> {numberFormatter.format(item.monthlyPayment)} </span>
              </p>
            </div>
            <div className="flex flex-row items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
            </div>
          </div>
        ))
      } */}
    </div>
  );
};

export default ChartThree;






