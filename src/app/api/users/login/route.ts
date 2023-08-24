import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request : NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody)

        //check if user exist  or not
         const user = await User.findOne({email});
         if(!user){
            return NextResponse.json({error : "User already exists"},
            {status: 400})
         }

         // check correctness of password
         const validPassword = await bcryptjs.compare
         (password, user.password)
         if(!validPassword){
            return NextResponse.json({error : "Invalid Password"},
            {status: 400})
         }

         // create token data
         const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
         }
         // craete token
         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, 
            {expiresIn : "1d"}) // using .sign  method offered by jwt

        //set token intp cookies
        const response = NextResponse.json({
            message : "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly : true,

        })
        return response;

    } catch (error : any) {
        return NextResponse.json({error: error.message},
            {status : 500})
    }
}