//importing connect to handshake with database
import { connect } from "@/dbConfig/dbConfig";
//importing the structure model to put data
import User from "@/models/userModel";
//request and response
import { NextRequest, NextResponse } from "next/server";
//encrypting password
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;
    console.log(reqbody);

    //in login we need to check if user is exists
    const user = await User.findOne({ email }); // now the user holds the info of all(pasword,verifyiornot) like we search
    //based on the email and we found one
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        {
          status: 400,
        }
      );
    }

    //verifying the password (the bcrypt has function for it)
    const validpassword = await bcryptjs.compare(password, user.password); //the password is coming from the body and the user.password
    //is the one that is in the database
    if (!validpassword) {
      return NextResponse.json(
        { error: "the password is not valid man" },
        { status: 400 }
      );
    }

    //now see everything is checked(is the user exist, is the password correct),
    //so now if all above are true we now generate the token to go in

    //first make the data that you are going to send
    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    //now the response is made as type of next response so we can use cookie on it
    response.cookies.set("token", 
    token, 
    { httpOnly: true});//makes cookies inaccessible to client-side scripts, like JavaScript. 
    //Those cookies can only be edited by a server that processes the request

    //so now we have set the cookies and so return it now
    return response;
} catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
