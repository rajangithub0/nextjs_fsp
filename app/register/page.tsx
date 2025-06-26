"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function registerPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            alert("password does not match");
        }
        try {
            const res= await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,password,
                }),
            })
            const data = await res.json();
            if (res.ok) {
                throw new Error(data.error || "register failed");
            }
            console.log(data);
            router.push("/login");
            
        } catch (error) {
            console.log(error);
            
            
        }
     }




  return (
      <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
                <button type="submit">Register</button>
          </form>
            <p>Already have an account? <button onClick={()=>router.push("/login")}>login</button></p>
        </div>
  )
}

export default registerPage