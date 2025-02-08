'use client'

import { Button } from "flowbite-react";
import Title from "./components/Title";
import { signOut } from "next-auth/react";
import { getCurrentUser } from "./actions/authActions";

export default function Home() {
  async function getUserInfo() {
    var res = await getCurrentUser();
    console.log(res.data)
  }
  
  return (
    <div>
      <Title title='Teamo'/>
      <Button onClick={() => signOut({redirect: true, callbackUrl: '/auth/login'})}>Logout</Button>
      <Button onClick={getUserInfo}>Get User</Button>
    </div> 
  );
}
