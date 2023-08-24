"use client"
import Link from 'next/link';
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from 'react-hot-toast';


export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState(    {
        email: "",
        password: "",
        username: "",
    })
    //Controlling state of button based on user's input
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false); //loading text
    const onSignup = async ()=> {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", 
            user);
            console.log("Signup success", response.data);
            router.push('/login');
            
        } catch(error: any) {
            console.log("signup failed", error.message)

            toast.error(error.message); 
        } finally{
            setLoading(false);

        }
    }

    useEffect(() => {
        if(user.email.length > 0 && 
            user.password.length > 0 && user.username.length > 0){
                setButtonDisabled(false);
            } else{
                setButtonDisabled(true);
            }
    }, [user]); // 
    //Controlling state of button based on user's input


    return( 
        <div className='flex flex-col items-center
        justify-center min-h-screen py-2 pt-12'>
            <h1 className="text-2xl font-sans">{
                loading ? "Processing..." : "Sign Up"
            }</h1>
            <hr />
            
           <div className="flex flex-col mt-10 ">
           <label htmlFor='username' className="text-left">Username</label>
            <input className='p-2 w-80 h-12 mt-3
            rounded-lg mb-3  focus:outline-none focus:border-gray-600 text-black
            focus:outline-none focus:ring focus:ring-violet-300 md:w-full sm:w-50 '
            id='username'
            type="text"
            value = {user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
            <label htmlFor='email'>Email Address</label>
             <input className='p-2 w-80 h-12 mt-3
            rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black 
            focus:outline-none focus:ring focus:ring-violet-300 md:w-full'
            id='email'
            type="text"
            value = {user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
             <label htmlFor='password'>Password</label>
             <input className='p-3 w-80 h-12 mt-3
            rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-black
            focus:outline-none focus:ring focus:ring-violet-300 md:w-full'
            id='password'   
            type="text"
            value = {user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button onClick={onSignup} className='px-10 py-2 w-80 h-12 hover:bg-indigo-700
            rounded-lg bg-indigo-500 font-md text-indigo mb-4 focus:outline-none focus:border-gray-600 md:max-w-full'
           >{buttonDisabled ? "No signup": "Signup"}</button>
           <p className="text-center text-sm">Already have an account? <Link href='/login' className="text-indigo-500">Login here</Link></p>

           </div>

          
        </div>
    )
}