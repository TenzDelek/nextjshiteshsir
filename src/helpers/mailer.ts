// better if we use server component domain.com/verifytoken/asaaff
// better if we use client domain.com/verifytoken?token=assadsg
import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrpytjs from 'bcryptjs'

export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        //created hashed Token
     const hashedToken=await bcrpytjs.hash(userId.toString(),10)

     if(emailType==="VERIFY")
     {
        await User.findByIdAndUpdate(userId,{
            //verifytoken will get this hashedtoken that we generated
            verifyToken:hashedToken,
            verifyTokenExpiry:Date.now()+3600000
         })
     }
     else if(emailType==="RESET")
     {
        await User.findByIdAndUpdate(userId,{
            //verifytoken will get this hashedtoken that we generated
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+3600000
         })
     }
     
        //coming from the mailtrap
     const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "65e9afc78cbb60",
          pass: "26cc6046d58b12"
        }
      });

      const mailOptions={
        from:"tenzindelek@gmail.com",
        to:email,
        subject:emailType==="VERIFY"?"hold up,Verify your email":"RESET your password fam",

        html: `<p>Click here mate, <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. 
        <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
    }
    const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;
      
    } catch (error:any) {
        throw new Error(error.message)
    }
}