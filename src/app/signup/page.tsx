"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import {axios} from "axios"
const Signup = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const onsignup = async () => {
    // async as it is going to talk with database
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      className=" p-2 border border-gray-300 rounded-lg 
       mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="username"

      />
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
      onClick={onsignup}
      className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        Signup
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
};

export default Signup;
