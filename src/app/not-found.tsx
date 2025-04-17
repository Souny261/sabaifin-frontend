"use client";
import React from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <div className="relative w-full h-64">
                <Image
                    src="/404.svg"
                    alt="Error"
                    layout="fill"
                    objectFit="contain"
                    className="animate-bounce"
                />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mt-8">404</h1>
            <p className="text-md text-gray-600 mt-2">ບໍ່ພົບຂໍ້ມູນໃນໜ້ານີ້</p>
            <Button onClick={() => {
                router.back();
            }} className="mt-4">
                ກັບຄືນໄປໜ້າກ່ອນໜ້ານີ້
            </Button>
        </div>
    );
}
