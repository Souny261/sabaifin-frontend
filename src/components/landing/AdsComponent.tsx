"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button } from "../ui/button";
import { color } from "framer-motion";
import { cn } from "@/lib/utils";
import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { slides } from "@/lib/data";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}
const NextArrow: React.FC<ArrowProps> = () => <div className="hidden" />;
const PrevArrow: React.FC<ArrowProps> = () => <div className="hidden" />;



const AdsComponent: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 5000,
        beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
    };
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<Slider>(null);
    const router = useRouter();
    return (
        <div className="relative lg:h-[35rem] text-white">
            <div className="slider-container">
                <Slider ref={sliderRef} {...settings}>
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="relative h-[20rem] lg:h-[35rem]" onChange={() => setCurrentSlide(index)}>
                            <div className={cn(`absolute inset-0 transition-opacity duration-1000 opacity-100 bg-primary`, slide.color)} />
                            <div className="relative h-full w-full"
                            // style={{
                            //     backgroundImage: `url(${slide.imageUrl})`,
                            //     backgroundSize: 'cover',
                            //     backgroundPosition: 'right',
                            // }}
                            >
                                <div className="absolute h-full w-1/2 bg-gradient-to-r from-black/60  to-transparent" />
                                <div className="absolute flex flex-col items-start justify-center h-full p-10 md:x-7 lg:px-36 px-4 w-full lg:w-1/2">
                                    <h1 className="text-2xl lg:text-5xl font-bold">{slide.title}</h1>
                                    <p className="mt-4 mb-2 text-md lg:text-lg">{slide.description} <label className='font-bold'>+856 20 777 077 92</label></p>
                                    <Button onClick={() => {
                                        sendGAEvent('event', 'Promotion Trigger', { value: 'xyz' })
                                        router.push(`/ads/${index + 1}`);
                                    }}>
                                        ລາຍລະອຽດ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="absolute bottom-16 lg:bottom-16 left-0 right-0 flex justify-center lg:justify-start space-x-3 md:x-7 lg:px-36 px-4 ">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            sliderRef.current?.slickGoTo(idx);
                            setCurrentSlide(idx);
                        }}
                        className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-gray-500'
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default AdsComponent;
