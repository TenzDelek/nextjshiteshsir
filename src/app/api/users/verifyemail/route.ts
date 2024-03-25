import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req:NextRequest) {
    
    try {
        //extracting token from the body
        const reqBody=await req.json()
        //when we call it in the verifyemail page, we are bringing the post req with the token state
        const {token}=reqBody
        console.log(token)
        //finding the user based on token
        const user=await User.findOne({verifyToken:token,
        verifyTokenExpiry:{$gt:Date.now()}})
        //two condition needs to be true, the token
        //should be matched and also the expiry should be greater than the current date

        if(!user)
        {
            return NextResponse.json({error:"Invalid TOKEN man check once, now your user is not found due to that"},
            { status:400})
        }
        console.log(user)
        user.isVerified=true
        //flusing out the token as it is unneccesary
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save()

        return NextResponse.json({
            message:'Email verified successfully',
            success:true
        })

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },
        {
            status:500
        })
    }
}