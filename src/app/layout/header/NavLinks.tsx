"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '@/actions/authActions' // Đảm bảo đường dẫn đúng

export default function NavLinks() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user && user.id) {
        setUserId(user.id.toString());
      }
    };
    fetchUser();
  }, []);
  
  return (
    <div className='flex justify-between content-around gap-32'>  
        <Link href='/majors' className='link'>Major</Link>
        <Link href='/groups' className='link'>Groups</Link>
        {userId ? (
          <Link href={`/profile/details/${userId}`} className='link'>Profile</Link>
        ) : (
          <Link href='/profile/details' className='link'>Profile</Link>
        )}
        <Link href='/applications' className='link'>Applications</Link>
    </div>
  )
}
