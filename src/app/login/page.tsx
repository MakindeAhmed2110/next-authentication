"use client";
import Link from 'next/link';
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false); //loading text
 

    
    const onLogin = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Signup successful", response.message);
            router.push('/profile');
        } catch (error : any) {
            console.log("Login failed", error.message)
            toast.error(error.message);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && 
            user.password.length > 0 ){
                setButtonDisabled(false);
            } else{
                setButtonDisabled(true);
            }
    }, [user]); // 

    return(
        <div className='flex flex-col items-center
        justify-center min-h-screen py-2'>
            <h1 className="text-2xl font-bold">{loading ? "Processing"
            : "Login"}</h1>
            <hr />
            


           <div className="flex flex-col mt-10">
           <label htmlFor='email'>Email Address</label>
           <input className='p-3 w-72 h-12 mt-3
            rounded-lg mb-5  focus:border-gray-600 text-black
            focus:outline-none focus:ring focus:ring-violet-300'
            id='email'
            type="text"
            value = {user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
             <label htmlFor='password'>Password</label>
             <input className='p-3 w-72 h-12 mt-3
            rounded-lg mb-5 focus:border-gray-600 text-black
            focus:outline-none focus:ring focus:ring-violet-300'
            id='password'
            type="text"
            value = {user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button onClick={onLogin} className='px-10 py-2 w-72 h-12 focus:bg-indigo-700
            rounded-lg bg-indigo-500 font-md text-indigo mb-4 focus:outline-none focus:border-gray-600 '
           > Login here</button>

           <p className="text-center text-sm">Don't have an account? <Link href='/signup' className="text-indigo-500">Sign up</Link></p>

           </div>
        </div>
    )
}