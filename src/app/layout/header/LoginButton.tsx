"use client";

import { Button } from "flowbite-react";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";

export default function LoginButton() {
  return (
    <>
      <div className="w-1/5">
        <Button className="btn btn--secondary justify-self-end" href="/auth/login">
          <div className="btn--icon">
            <AiOutlineLogin size={20} />
            <div>Login</div>
          </div>
        </Button>
      </div>
    </>
  );
}
