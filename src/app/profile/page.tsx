'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const Profile = () => {
const router=useRouter()
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
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <hr />
        <button onClick={logoutff} className=' bg-blue-500 hover:bg-blue-700 text-wrap mt-4 
        font-bold py-2 px-4 rounded transition'>
          Logout</button> 
    </div>
  )
}

export default Profile