"use client";
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header'
import React from 'react'

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <main className="min-h-screen flex flex-col">
                <Header />
                {
                    children
                }
                <Footer />
            </main>

        </>

    )
}
