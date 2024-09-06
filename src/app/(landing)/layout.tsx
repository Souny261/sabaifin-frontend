import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/navbar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-full relative bg-slate-50'>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}
