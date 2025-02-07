import Link from 'next/link'
import React from 'react'

export default function NavLinks() {
  return (
    <div className='flex justify-between gap-32'>
        <Link href='/majors' className='link'>Major</Link>
        <Link href='/groups' className='link'>Your Group</Link>
        <Link href='/groups/details/1' className='link'>Profile</Link>
        <Link href='/admin' className='link'>Admin</Link>
    </div>
  )
}
