'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { SocialIcon } from 'react-social-icons'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { PhoneForwarded } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export default function Navbar() {
    const [scrolling, setScrolling] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolling(scrollTop > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cn('fixed z-10 transition-opacity duration-100 w-full top-0 left-0 shadow-sm', scrolling ? 'bg-slate-50' : "bg-slate-50")}>
            <div className='md:flex items-center justify-between py-2 md:px-7 lg:px-36 px-2'>
                <div className='flex flex-row items-center justify-between'>
                    <div className="flex flex-row items-center">
                        <Link href="/" >
                            <Avatar className='h-12 w-12 sm:h-10 sm:w-10 md:h-12 md:w-12'>
                                <AvatarImage src="./logo.png" alt="@shadcn" />
                            </Avatar>
                        </Link>
                        <Link href="/" >
                            <div className='pl-2 flex flex-col items-start justify-start'>
                                <div className='font-bold text-xl lg:text-2xl cursor-pointer items-center text-gray-800'>
                                    SabaiOps
                                </div>
                                <div className='text-gray-500 text-xs'>
                                    Financial Calculators
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-row items-center  md:hidden'>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={"default"}>
                                    ຕິດຕໍ່ພວກເຮົາ
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>ກະລຸນາເລືອກຊ່ອງທາງການຕິດຕໍ່</AlertDialogTitle>
                                    <AlertDialogDescription className='flex flex-col justify-start text-black'>
                                        <div className='pb-4'>
                                            ຕ້ອງການລົງໂຄສະນາ ຫຼື ເພື່ອສອບຖາມຂໍ້ມູນເພີ້ມເຕີ່ມ
                                        </div>
                                        <div className='flex flex-col items-start justify-start w-full space-y-2'>
                                            <Button
                                                onClick={() => { router.push("https://m.me/361099100421836") }}
                                                variant={"ghost"} className='w-full items-start flex flex-row space-x-2 justify-start bg-slate-50'>
                                                <SocialIcon network={"facebook"} style={{ height: 25, width: 25 }} />
                                                <label className='font-bold'>ສອບຖາມຜ່ານ Facebook</label>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    router.push("https://wa.me/8562077707792")
                                                }}
                                                variant={"ghost"} className='w-full items-start flex flex-row space-x-2 justify-start bg-slate-50'>
                                                <SocialIcon network={"whatsapp"} style={{ height: 25, width: 25 }} />
                                                <label className='font-bold'>ສອບຖາມຜ່ານ WhatsApp</label>
                                            </Button>
                                            <Button
                                                onClick={() => { router.push("tel:02077707792") }}
                                                variant={"ghost"} className='w-full items-start flex flex-row space-x-2 justify-start bg-slate-50'>
                                                <label className="text-sm flex flex-row space-x-2 items-center">
                                                    <Avatar className='h-7 w-7 bg-primary items-center justify-center'>
                                                        <PhoneForwarded className='w-3 h-3 text-white' />
                                                    </Avatar>  <label className='font-bold'>+856 20 777 077 92</label>
                                                </label>
                                            </Button>
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </div>
                <div className='md:block hidden'>
                    <div className='flex flex-col items-start justify-start'>
                        <label className='text-sm pl-4 text-gray-500'>ຕ້ອງການລົງໂຄສະນາຕິດຕໍ່ໄດ້ທີ່</label>
                        <div className='flex flex-row items-center justify-center'>
                            <Button
                                onClick={() => { router.push("https://m.me/361099100421836") }}
                                variant={"ghost"}>
                                <label className="text-sm flex flex-row space-x-2 items-center"><SocialIcon network={"facebook"} style={{ height: 25, width: 25 }} /> <span>ສອບຖາມຜ່ານ Facebook</span></label>
                            </Button>
                            <Button variant={"ghost"}
                                onClick={() => {
                                    router.push("https://wa.me/8562077707792")
                                }}
                            >
                                <label className="text-sm flex flex-row space-x-2 items-center"><SocialIcon network={"whatsapp"} style={{ height: 25, width: 25 }} /> <span>ສອບຖາມຜ່ານ WhatsApp</span></label>
                            </Button>
                            <Button
                                onClick={() => { router.push("tel:02077707792") }}
                                variant={"ghost"}>
                                <label className="text-sm flex flex-row space-x-2 items-center">
                                    <Avatar className='h-7 w-7 bg-primary items-center justify-center'>
                                        <PhoneForwarded className='w-3 h-3 text-white' />
                                    </Avatar>  <span>+856 20 777 077 92</span>
                                </label>
                            </Button>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}
