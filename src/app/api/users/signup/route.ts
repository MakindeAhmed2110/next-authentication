import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
         const user = await User.findOne({email})

         if(user){
            return NextResponse.json({error: "User already exists"},
            {status : 400})
         }

         //hashing of  password
         const salt = await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash
         (password, salt)

         // New user signup with hashed password

         const newUser = new User({
            username,
            email,
            password: hashedPassword,
         });

          const savedUser = await newUser.save()
          console.log(savedUser); //see if user is saved to database

          //send verification email

          await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});


          return NextResponse.json({
            message : "User created successfully",
            success: true,
            savedUser
          }) //message for user signed up successfully 
         
        


    } catch (error : any){
        return NextResponse.json({error : error.message},
            {status : 500})
    }
}