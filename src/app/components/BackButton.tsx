'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { GoArrowLeft } from 'react-icons/go';

// type Props = {
//     url: string
// }


export default function BackButton() {

    const router = useRouter();

    // Go back to a specific page
    async function goBack() {
        router.back();
    }

  return (
    <div className='mb-5'>
        <GoArrowLeft size={30} className='link text-gray-500 hover:text-black' onClick={goBack}/>
    </div>
  )
}