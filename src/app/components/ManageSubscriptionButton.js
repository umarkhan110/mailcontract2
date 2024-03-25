"use client";
import React from "react";
import { checkout } from "../service/checkout";
import Cookies from "js-cookie";

export function ManageUserSubscriptionButton({
  userId,
  email,
  planId,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (planId === 1) {
      const currentDate = new Date();
      const subscriptionEndDate = new Date(currentDate);
      subscriptionEndDate.setDate(currentDate.getDate() + 30);
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().availFreeTrialAlready) {
        ShowNotification("Already used free trial", "error");
      } else {
        const data = {
          subscriptionStatus: "active",
          subscriptionStartDate: new Date().toISOString(),
          subscriptionEndDate: subscriptionEndDate.toISOString(),
          planId: planId,
          freehits: 3,
          availFreeTrialAlready: true,
          email: email,
        };
        await setDoc(userDocRef, data, { merge: true });
        Cookies.set("isSubscribed", true);
        // router.push("/translator");
      }
      return;
    } else {
      startTransition(async () => {
        try {
          const data = {
            email,
            userId,
            planId,
            isSubscribed,
            isCurrentPlan,
            stripeCustomerId,
            stripePriceId,
          };
          const res = await checkout(data);
          // console.log("LINE NO 40",res)
          if (res.success) {
            window.location.href = res.res.url ?? "/dashboard/billing";
          }
        } catch (err) {
          console.error(err.message);
          // toast({ description: "Something went wrong, please try again later." });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="text-white bg-[#5e5170] hover:bg-[#886daf]  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
        {isPending && <div className="mr-2 h-4 w-4 animate-spin"></div>}
        {isCurrentPlan ? "Manage Subscription" : "Subscribe"}
      </button>
    </form>
  );
}
