'use client'

import React from 'react'
import LoginForm from './LoginForm'
import Title from '@/components/Home/Title'
import BackButton from '@/components/BackButton'

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
