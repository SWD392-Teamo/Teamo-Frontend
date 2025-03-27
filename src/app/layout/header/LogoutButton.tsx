'use client'

import { logout } from '@/actions/authActions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useLoading } from '@/providers/LoadingProvider'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

export default function LogoutButton() {
  const { showLoading, hideLoading } = useLoading();
  const [open, setOpen] = useState(false);

  async function onLogout() {
    showLoading();
    await logout();
    await signOut({redirect: true, callbackUrl: '/auth/login'});
    hideLoading();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='btn flex justify-items-end' variant={"destructive"} size={"lg"}>
          <div className="btn--icon">
            <AiOutlineLogout size={20}/>
            <div>Logout</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            Yes, Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
