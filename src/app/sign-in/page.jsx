"use client";
import { useState } from "react";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { ShowNotification } from "../template";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      Cookies.set("access-token", res.user.accessToken);
      Cookies.set("userId", res.user.uid);
      const userDocRef = doc(db, "users", res.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().subscriptionStatus === "active") {
        Cookies.set("isSubscribed", true);
      } else {
        Cookies.set("isSubscribed", false);
      }
      if (userDoc.exists() && userDoc.data().planId === 3) {
        Cookies.set("premium", true);
      }else{
        Cookies.set("premium", false);
      }
      setEmail("");
      setPassword("");
      ShowNotification("Login Successfully", "success");
      router.push("/");
    } catch (error) {
      ShowNotification(error.code, "error");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
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
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
        <div className="mt-3">
      <a  href="/sign-up">Create an account <span className="text-white">{" "}Sign up</span></a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
