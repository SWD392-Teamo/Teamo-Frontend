import { logout } from '@/app/actions/authActions'
import { Button } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

export default function LogoutButton() {
    async function onLogout() {
        await logout()
        await signOut();
    }

  return (
    <Button className="btn btn--secondary--outline">
        <div className="btn--icon">
            <AiOutlineLogout size={20}/>
            <div>Login</div>
        </div>
    </Button>
  )
}
