import Link from 'next/link'
import React from 'react'

export default function NavLinks() {
  return (
    <div className='flex justify-between gap-7 text-xl'>
        <Link href='/majors'>Major</Link>
        <Link href='/groups'>Your Group</Link>
        <Link href='/profile/details/1'>Profile</Link>
        <Link href='/admin'>Admin</Link>
    </div>
  )
}
