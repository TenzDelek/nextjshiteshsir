 import { getDataFromToken } from "@/helpers/getDataFromToken";

 import User from "@/models/userModel";
 import { NextRequest,NextResponse } from "next/server";

 import {connect} from '@/dbConfig/dbConfig'

 connect()

 export async function GET(req:NextRequest)
 {
    try {
     const userId= await getDataFromToken(req)
     //finding the user based on id
   const user= await User.findOne({_id:userId}).select("-password") //deselect the password
    return NextResponse.json({
        message:"here is the user man",
        data:user
    })
} catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:400})
    }
 }