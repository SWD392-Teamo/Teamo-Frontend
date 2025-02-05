'use client'

import React from 'react'
import LoginForm from './LoginForm'
import Title from '@/app/components/Title'
import BackButton from '@/app/components/BackButton'

export default function page() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <BackButton url='/'/>
        <Title title='Login'/>
        <LoginForm />
      </div>
    </div>
  )
}
