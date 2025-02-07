'use client'

import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'
import React from 'react'
import { AiOutlineLogin } from 'react-icons/ai'

export default function LoginButton() {
  return (
    <Button className="btn btn--secondary" href='/auth/login'>
      <div className="btn--icon">
        <AiOutlineLogin size={20}/>
        <div>Login</div>
      </div>
    </Button>
  )
}