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
        <div className='w-1/5'>
            <div onClick={doReset} className='flex align-middle justify-self-start items-center text-3xl text-logo cursor-pointer font-righteous'>
            <div>Teamo</div>
        </div>
        </div>
        
    )
}