'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Profile = () => {
const router=useRouter()
const[data,setdata]=useState("nothing")
const logoutff=async()=>{
 try {
  await axios.get("/api/users/logout")
  toast.success("logout succces by boy")
  router.push("/login")
  }
  catch (error:any) {
  console.log("error while loging out my man",error.message)
    toast.error(error.message)
  }
}
  
const getUserDetails=async()=>{
  const res=await axios.get("/api/users/me")
  console.log(res.data)
  setdata(res.data.data._id)
}
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className=' rounded p-2 bg-gray-700'>{data==="nothing"?"Nothing here at the moment":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button onClick={logoutff} className=' bg-blue-500 hover:bg-blue-700 text-wrap mt-4 
        font-bold py-2 px-4 rounded transition'>
          Logout</button> 
          <button onClick={getUserDetails} className=' bg-orange-500 hover:bg-orange-700 text-wrap mt-4 
        font-bold py-2 px-4 rounded transition'>
         Get Details</button> 
    </div>
  )
}

export default Profile