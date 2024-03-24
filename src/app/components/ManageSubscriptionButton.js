"use client";

import React from "react";
// import { manageStripeSubscriptionAction } from "@/app/api/stripeactions/stripe";
import { stripeactions } from "../service/stripeactions";

// interface ManageUserSubscriptionButtonProps {
//   userId: string;
//   email: string;
//   isCurrentPlan: boolean;
//   isSubscribed: boolean;
//   stripeCustomerId?: string | null;
//   stripePriceId: string;
// }

export function ManageUserSubscriptionButton({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const data ={
          email,
          userId,
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripePriceId,
        }
        const res = await stripeactions(data);
        // console.log("LINE NO 40",res)
        if (res.success) {
          window.location.href = res.res.url ?? "/dashboard/billing";
        }
      } catch (err) {
        console.error((err).message);
        // toast({ description: "Something went wrong, please try again later." });
      }
    });
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