import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { subscriptionPlans } from "@/config/subscription";
import { stripe } from "@/app/lib/stripe";

export async function POST(req) {
  const data = await req.json();
  try {
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
      };
      try {
        await setDoc(userDocRef, userData);
      } catch (error) {
        throw new Error("Error creating user document: " + error.message);
      }
    }

    const newUserSnapshot = await getDoc(userDocRef);
    const user = newUserSnapshot.data();
    const stripeTime = user?.stripeCurrentPeriodEnd?.seconds * 1000
    var stripeEndDate = new Date(stripeTime);
    const isSubscribed =
      user.stripePriceId &&
      user.stripeCurrentPeriodEnd &&
      stripeEndDate > Date.now();

    const plan = isSubscribed
      ? subscriptionPlans.find(
          (plan) => plan.stripePriceId === user.stripePriceId
        )
      : null;

    let isCanceled = false;
    if (isSubscribed && user.stripeSubscriptionId) {
      const stripePlan = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      );
      isCanceled = stripePlan.cancel_at_period_end;
    }

    return NextResponse.json({
      success: true,
      res: {
        plan,
        stripeSubscriptionId: user.stripeSubscriptionId,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
        stripeCustomerId: user.stripeCustomerId,
        isSubscribed,
        isCanceled
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
