
import Link from 'next/link'
import React from 'react'


export default function NavLinks() {
    return (
        <div className='flex justify-between content-around gap-32'>
            <Link href='/majors' className='link'>University Information</Link>
            <Link href='/groups' className='link'>Profile</Link>
            <Link href='/groups/details/1' className='link'>Groups</Link>
            <Link href='/applications' className='link'>Dashboard</Link>
            <Link href='/applications' className='link'>Register</Link>

        </div>
    )
}

