'use client'

import { logout } from '@/actions/authActions'
import { Button } from '@/components/ui/button'
import { useLoading } from '@/providers/LoadingProvider'
import { signOut } from 'next-auth/react'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

export default function LogoutButton() {
  const { showLoading, hideLoading } = useLoading();

  async function onLogout() {
      showLoading();
      await logout();
      await signOut({redirect: true, callbackUrl: '/auth/login'});
      hideLoading();
  }

  return (
    <Button className='btn flex justify-items-end' variant={"destructive"} size={"lg"} onClick={onLogout}>
        <div className="btn--icon">
            <AiOutlineLogout size={20}/>
            <div>Logout</div>
        </div>
    </Button>
  )
}
