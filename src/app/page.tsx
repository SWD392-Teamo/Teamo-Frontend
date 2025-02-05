'use client'

import { useEffect } from "react";
import { getCurrentUser, login } from "./actions/authActions";

export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email, password)

    // var res = await login(email, password);

    var res = await fetch('https://localhost:5001/api/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include'
    })

    if (res.ok) console.log("ok")
  };

  const handleUser = async () => {
    // Pass cookies to the server action
    const res = await getCurrentUser();
  
    if (res) console.log(res);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>

      
      <button onClick={handleUser}>Get User</button>
      
    </div>
    
  );
}
