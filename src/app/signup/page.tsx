"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
const Signup = () => {
  const router=useRouter()
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttondisabled,setbuttondisabled]=useState(false) //just to make sure every field is filled
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0)
    {
      setbuttondisabled(false)
    }
    else{
      setbuttondisabled(true)
    }
  },[user])//depends on user
  const[loading,setloading]=useState(false)
  const onsignup = async () => {
    // async as it is going to talk with database
    try {
      setloading(true)
      const res=await axios.post("/api/users/signup",user)//hit the url and also taking along user which are the input datas
      console.log("signup success",res.data)
      router.push("/login") //push to login if the signup button is clicked
    } catch (error:any) {
      console.log("signup failed",error.message)
      toast.error(error.message)
    }finally{
      setloading(false)
    }
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"PROCESSING":"SIGNUP"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg  text-black
       mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="username"

      />
      <label htmlFor="email">email</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg text-black
       mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="email"

      />
      <label htmlFor="password">password</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg text-black
       mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"

      />
      <button
      onClick={onsignup}
      className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttondisabled?"notyet":"signup now"}
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
};

export default Signup;
