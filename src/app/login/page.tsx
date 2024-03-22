"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import {axios} from "axios"
const Login= () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  
  });
  const onlogin= async () => {
    // async as it is going to talk with database
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg 
       mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="email"

      />
      <label htmlFor="password">password</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg 
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
        Login here
      </button>
      <Link href="/signup">Visit Signup here</Link>
    </div>
  );
};

export default Login;
