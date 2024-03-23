import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken=(req:NextRequest)=>{

    try {
      const token=  req.cookies.get("token")?.value || ""

     const decodedtoken:any= jwt.verify(token,process.env.TOKEN_SECRET!)
     return decodedtoken.id;
     //while encoding the token in login we have three data(id,username,email) so if we get the id we can 
     //get the rest
    } catch (error:any) {
        throw new Error(error.message)
    }
}