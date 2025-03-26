"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link";
import React from 'react'
import { AiOutlineLogin } from 'react-icons/ai'

export default function LoginButton() {
  return (
    <>
      <div className="w-1/5">
      <Link href="/auth/login" passHref>
      <Button className="btn flex justify-self-end" size="lg">
        <div className="btn--icon">
          <AiOutlineLogin size={20} />
          <div>Login</div>
        </div>
      </Button>
    </Link>
      </div>
    </>
  );
}
