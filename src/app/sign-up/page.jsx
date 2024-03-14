"use client";
import { useState } from "react";
// import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from "@/app/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ShowNotification } from "../template";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      console.log(res)
      // console.log(res.user)
      // Cookies.set("access-token", res.user.accessToken);
      // setEmail('');
      // setPassword('')
      if(res.user){
        ShowNotification("User Created Successfully", "success");
        router.push("/sign-in");
      }else{
        ShowNotification(error.code, "error");
      }
    } catch (error) {
      ShowNotification(error.code, "error");
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        <div className="mt-3">
      <a  href="/sign-in">Already have an account <span className="text-white">Sign in</span></a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
