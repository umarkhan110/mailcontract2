import { db } from "@/app/firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
// const sgMail = require("@sendgrid/mail");
import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createToken = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  let tokenValue = randomNumber.toString();
  while (tokenValue.length < 5) {
    tokenValue = "0" + tokenValue;
  }
  return tokenValue;
};

export async function POST(req) {
  const data = await req.json();
  try {
    const token = createToken();
    const msg = {
      to: data.email,
      from: "citrusappslab@gmail.com",
      subject: "Armenian Translator Email Verification",
      text: "Email Verification Code",
      html: `<strong>${token}</strong>`,
    };
    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      const userData = {
        subscriptionStatus: "",
        subscriptionStartDate: "",
        subscriptionEndDate: "",
        planId: "",
        extraFeature: "",
        stripePriceId: "",
        stripeCurrentPeriodEnd: "",
        stripeSubscriptionId: "",
        stripeCustomerId: "",
        email: "",
        status: "inactive",
        canceledDate: "",
        cancelRequest: false,
        otp: token,
        isEmailVerified: false
      };
      try {
        await setDoc(userDocRef, userData);
      } catch (error) {
        throw new Error("Error creating user document: " + error.message);
      }
    } else {
      await updateDoc(userDocRef, {
        otp: token,
      });
    }
    return NextResponse.json({
      success: true,
      // res: { res },
    });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
