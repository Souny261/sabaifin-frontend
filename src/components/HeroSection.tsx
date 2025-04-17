"use client";
import { ArrowDown, Coins } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import CalculatorIllustration from './CalculatorIllustration';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Add a small delay to trigger animations after component mount
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const scrollToCalculator = () => {
        const calculatorSection = document.getElementById("calculator");
        if (calculatorSection) {
            const offsetTop = calculatorSection.getBoundingClientRect().top + window.scrollY - 100; // adjust this value to your needs
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };

    const scrollToPartners = () => {
        const calculatorSection = document.getElementById("partners");
        if (calculatorSection) {
            const offsetTop = calculatorSection.getBoundingClientRect().top + window.scrollY - 100; // adjust this value to your needs
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    };
    return (
        <div id='hero' className="relative min-h-screen overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-100 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gray-100/50 rounded-full blur-3xl"></div>

            {/* Animated floating elements */}
            <div className={`absolute top-1/4 left-[15%] w-12 h-12 rounded-full bg-primary/20 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: "0.2s", transitionDuration: "0.8s" }}></div>
            <div className={`absolute bottom-1/3 right-[20%] w-16 h-16 rounded-full bg-blue/30 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: "0.5s", transitionDuration: "0.8s" }}></div>
            <div className={`absolute top-2/3 left-[30%] w-8 h-8 rounded-full bg-gray-200/60 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: "0.8s", transitionDuration: "0.8s" }} />

            {/* Main Content Container */}
            <div className="container mx-auto px-4 py-20 md:py-24 flex flex-col items-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Subtitle Tag */}
                        <div className="inline-flex items-center gap-2 bg-primary/10 py-1 px-2 rounded-full mb-6">
                            <Coins className="text-primary h-4 w-4" />
                            <span className="text-primary text-sm">ຄິດໄລ່ເງິນກູ້ທີ່ງ່າຍທີ່ສຸດຂອງລາວ</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent">
                            ວາງແຜນ <span className="text-primary">ອະນາຄົດ</span> ທາງດ້ານການເງິນຂອງທ່ານດ້ວຍຄວາມຫມັ້ນໃຈ
                        </h1>

                        {/* Description */}
                        <p className="text-md md:text-lg text-gray-600 mb-8 max-w-lg">
                            ເຄື່ອງຄຳນວນສີນເຊື່ອທີ່ໃຊ້ງ່າຍຂອງພວກເຮົາຊ່ວຍໃຫ້ທ່ານຄາດຄະເນການຊໍາລະປະຈໍາເດືອນ, ປຽບທຽບຕົວເລືອກທາງສີນເຊື່ອ ແລະ ການຕັດສິນໃຈທາງດ້ານການເງິນຂອງທ່ານໃຫ້ງ່າຍຂື້ນ.
                        </p>
                        {/* Call-to-Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 my-8">
                            <Button
                                size="lg"
                                className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 btn-shine"
                                onClick={scrollToCalculator}
                            >
                                ເລີ່ມຄຳນວນ
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                onClick={() => {
                                    scrollToPartners()
                                }}
                                variant="outline"
                                size="lg"
                                className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                            >
                                ສຳລັບຄູ່ຮ່ວມທຸລະກິດ
                            </Button>
                        </div>

                        {/* Social Proof Message */}
                        <div className="flex items-center text-sm text-gray-500">
                            <div className="flex -space-x-2 mr-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-white flex items-center justify-center font-medium text-orange-700">
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <span>ມີຜູ້ໃຊ້ຈຳນວນຫຼາຍໃນລາວແລ້ວທີ່ໃຊ້ເຄື່ອງຄິດໄລ່ຂອງພວກເຮົາ</span>
                        </div>
                    </div>

                    {/* Right Column - Illustration */}
                    <div className={`hidden sm:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                        <div className="bg-white shadow-2xl rounded-2xl p-6 relative overflow-hidden border border-gray-100">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl"></div>
                            <div className="flex flex-col justify-center items-center">
                                <CalculatorIllustration />
                            </div>
                            {/* Feature Highlights */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative bottom wave */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-brand-orange/5 via-white to-brand-blue/5"></div>
        </div>
    )
}
