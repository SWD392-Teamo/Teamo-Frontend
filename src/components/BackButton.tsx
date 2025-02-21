  'use client'

  import { useRouter } from 'next/navigation';
  import React from 'react'
  import { GoArrowLeft } from 'react-icons/go';

  type Props = {
      url?: string
  }


  export default function BackButton({ url }: Props) {

      const router = useRouter();

      function goBack() {
        if (url) {
          router.push(url); 
        } else {
          router.back(); 
        }
      }

    return (
      <div className=''>
          <GoArrowLeft size={30} className='link text-gray-500 hover:text-black' onClick={goBack}/>
      </div>
    )
  }