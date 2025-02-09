'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

type Props = {
    url: string
}

export default function BackButton({url}: Props) {

    const router = useRouter();

    // Go back to a specific page
    async function goBack() {
        router.push(url);
    }

  return (
    <div className='mb-5'>
        <AiOutlineArrowLeft size={25} className='link' onClick={goBack}/>
    </div>
  )
}