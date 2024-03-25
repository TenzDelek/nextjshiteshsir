import mongoose, { Schema, model, models } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"provide a username bro"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"provide a email man"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"provide a password cho"],

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String, 
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

//if the model is already created in the database then we do like this
//point to be note is that when store in mongo it is lowered cased and pluralised lie
// here User turns to users
const User= models.users ||model("users",userSchema)

export default User