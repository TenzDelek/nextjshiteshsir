//importing connect to handshake with database
import { connect } from "@/dbConfig/dbConfig";
//importing the structure model to put data
import User from "@/models/userModel";
//request and response
import { NextRequest, NextResponse } from "next/server";
//encrypting password
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();
//breaking down the overall step to be done in signup
//1.first get the details from the frontend from either url or the body(here we got it from the body)
//2.then destructure the data we got
//3.now the validation, storing and encryptions takes place
//4.here first we check if the user is already signed up 
//5.then we encrpyt the password
//6.now we store the data in the database (the data that we got from the frontend)
//7.send the response back
//handling the post request
export async function POST(request: NextRequest) {
  try {
    //grabing data from the body (in express we do req.body)
    const reqBody = await request.json(); //not express but nextserver
    //now we destructure the reqbody(we know that we will get username,password and email)
    const { username, email, password } = reqBody;
    console.log(reqBody);
    //1.basic validation now (the funadamental of backend remember)
    //check if the user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist cho" },
        { status: 400 }
      );
    }

    //now hashing(encrypting the password)
    //Instead of simply hashing the given password, bcrypt
    //adds a random piece of data, called salt,
    const salt = await bcryptjs.genSalt(10); //here the 10 is the rounds(depends like express and mongoose use 10, ruby on rail use 12)
    const hashedPassword = await bcryptjs.hash(password, salt); //remember the password comes from the body

    //now saving the user in the database (the input will be coming the form that we created, and through the request body we got the info)
   const newUser= new User({ username, email, password: hashedPassword });
    //dont forget to save
    const savedUser=await newUser.save()
    console.log(savedUser)

    //send verify email
    await sendEmail({email,emailType:"VERIFY",
    userId:savedUser._id
    })

    //now send a response back
    return NextResponse.json({
        message:"User created yes sir",
        success:true,
        savedUser //send the detail
    })
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
