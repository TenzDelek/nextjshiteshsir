import { NextResponse } from "next/server";

export async function GET(){

    try {
        const res=NextResponse.json({
            message:"logout success man",
            success:true
        })
        //now we can interact with our cookie
        res.cookies.set("token","",
        {httpOnly:true, expires:new Date(0)}) 
        //here what we did is we emptied the token name "token" and set the expire to now
        return res
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}