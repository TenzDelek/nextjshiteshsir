"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const Login= () => {
  const router=useRouter()
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const[buttondisabled,setbuttondisabled]=useState(false)
  const [loading,setloading]=useState(false)
  const onlogin= async () => {
    try {
      setloading(true)
      const res=await axios.post("/api/users/login",user)
      console.log(res)
      toast.success("login success")
      router.push("/profile")
    } catch (error:any) {
      console.log("login failed man",error.message)
      toast.error(error.message)
    } finally{
      setloading(false)
    }
   
    // async as it is going to talk with database
  };
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0)
    {
      setbuttondisabled(false)
    }
    else{
      setbuttondisabled(true)
    }
  },[user])
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"PROCESSING":"LOGIN"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg  text-black
       mb-4 focus:outline-none focus:border-gray-600" 
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="email"

      />
      <label htmlFor="password">password</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg  text-black
       mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"

      />
      <button
      onClick={onlogin}
      className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttondisabled?"not yet":"Login"}
      </button>
      <Link href="/signup">Visit Signup here</Link>
    </div>
  );
};

export default Login;
