import { db } from "@/app/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  try {
    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return NextResponse.json({
        success: false,
        message: "User not exist",
      });
    } else {
      const user = userDoc.data();
      console.log(data.otpCode)
      console.log(user.otp)
      if (data.otpCode == user.otp) {
        await updateDoc(userDocRef, {
          otp: "",
          isEmailVerified: true,
        });
        return NextResponse.json({
          success: true,
        });
      } else if (data.otp != user.otp) {
        return NextResponse.json({
          success: false,
          message: "OTP is invalid",
        });
      }
    }
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
