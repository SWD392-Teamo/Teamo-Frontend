'use client'

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logo() {
    const router = useRouter();
    const pathname = usePathname();

    function doReset() {
        if (pathname !== '/') router.push('/');
    }

    return (
        <div onClick={doReset} className='flex items-center text-3xl font-bold text-primary cursor-pointer'>
            <div>Teamo</div>
        </div>
    )
}