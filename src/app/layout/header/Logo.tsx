'use client'

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import '@/app/globals.css';


export default function Logo() {
    const router = useRouter();
    const pathname = usePathname();

    function doReset() {
        if (pathname !== '/') router.push('/');
    }

    return (
        <div onClick={doReset} className='flex items-center text-3xl text-logo cursor-pointer font-righteous'>
            <div>Teamo</div>
        </div>
    )
}