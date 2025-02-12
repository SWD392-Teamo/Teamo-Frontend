'use client';

import { logout } from '@/app/actions/authActions';
import { signOut } from '@/auth';
import { Button } from 'flowbite-react';
import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

export default function LogoutButton() {
  function onLogout() {
    logout().then(() => {
      signOut();
    });
  }

  return (
    <Button className="btn btn--secondary--outline" onClick={onLogout}>
      <div className="btn--icon">
        <AiOutlineLogout size={20} />
        <div>Logout</div>
      </div>
    </Button>
  );
}
