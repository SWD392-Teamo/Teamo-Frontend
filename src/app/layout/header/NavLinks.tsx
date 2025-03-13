import Link from 'next/link'
import React from 'react'


export default function NavLinks() {
  return (
    <div className='flex justify-between content-around gap-32'>  
        <Link href='/majors' className='link'>Major</Link>
        <Link href='/groups' className='link'>Groups</Link>
        <Link href='/profile' className='link'>Profile</Link>
        <Link href='/applications' className='link'>Applications</Link>
    </div>
  )
}
