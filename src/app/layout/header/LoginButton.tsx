'use client'

import { Button } from 'flowbite-react'
import React from 'react'
import { AiOutlineLogin } from 'react-icons/ai'

export default function LoginButton() {
  return (
    <Button className="btn btn--secondary">
      <div className="btn--icon">
        <AiOutlineLogin size={20}/>
        <div>Login</div>
      </div>
    </Button>
  )
}