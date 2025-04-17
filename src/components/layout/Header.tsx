"use client";
import { Calculator, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ROUTES } from '@/core/config/constants';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
            setMobileMenuOpen(false);
        }
    };
    const navItems = [
        { id: 'hero', name: 'ໜ້າຫຼັກ', href: ROUTES.PUBLIC.HOME },
        { id: 'calculator', name: 'ຄຳນວນເງິນກູ້', href: ROUTES.PUBLIC.HOME },
        { id: 'compare', name: 'ປຽບທຽບງິນກູ້', href: ROUTES.PUBLIC.HOME },
        { id: 'features', name: 'ບໍລິກການ', href: ROUTES.PUBLIC.HOME },
        { id: 'testimonials', name: 'ຄຳຄິດເຫັນ', href: ROUTES.PUBLIC.HOME },
        { id: 'faq', name: 'ຄຳຖາມທີ່ພົບບ່ອຍ', href: ROUTES.PUBLIC.HOME },
        { id: 'partners', name: 'ຄູ່ຮ່ວມທຸລະກິດ', href: ROUTES.PUBLIC.HOME },
    ]
    return (
        <header className="w-full bg-background/80 backdrop-blur-sm fixed top-0 z-50 items-center justify-center flex p-4">
            <div className="container flex flex-row  items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href={ROUTES.PUBLIC.HOME} className="flex items-center font-bold text-2xl">
                        <span className="text-primary">Sabai</span>
                        <span>fin</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center">
                    {
                        navItems.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                variant={"ghost"}
                                className="text-sm font-medium hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
                            >
                                {item.name}
                            </Button>
                        ))
                    }
                </nav>

                <div className="hidden md:flex items-center gap-2">
                    <Button
                        onClick={() => scrollToSection('calculator')}
                        className="hidden md:flex bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 btn-shine"
                    >
                        <Calculator size={20} />
                        ເລີ່ມຄຳນວນ
                    </Button>
                </div>
            </div>

            {/* Mobile navigation menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute w-full bg-white border-b shadow-md pt-60">
                    <nav className="flex flex-col items-start p-4">
                        {
                            navItems.map((item) => (
                                <Button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    variant={"ghost"}
                                    className="text-sm font-medium hover:text-primary transition-colors hover:bg-transparent cursor-pointer"
                                >
                                    {item.name}
                                </Button>
                            ))
                        }

                        <Button
                            onClick={() => scrollToSection('calculator')}
                            className="mt-2 w-full bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 btn-shine"
                        >
                            <Calculator size={20} />
                            ເລີ່ມຄຳນວນ
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
