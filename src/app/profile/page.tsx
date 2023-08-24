"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful');
            router.push('/login');
        } catch (error : any) {
            console.log("Logout invalid", error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails =async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <p>Profile page</p>

            <h2
            className="text-3xl p-10 padding rounded
            bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>
                {data}
                </Link>}</h2>

            <button className="bg-indigo-500
             text-white h-16 w-36 rounded-lg mt-8" onClick={logout} >Logout</button>

            <button className="bg-white
             text-indigo-500 h-16 w-36 rounded-lg mt-8" onClick={getUserDetails} >
                Get User Details
             </button>
        </div>
    )
}


