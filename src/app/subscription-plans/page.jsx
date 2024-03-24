
"use client"
import Cookies from "js-cookie";
import { ManageUserSubscriptionButton } from "../components/ManageSubscriptionButton";
import { stripe } from "../service/stripe";
import { useEffect, useState } from "react";
const SubscriptionPlans = () => {
const userId = Cookies.get("userId")
const [subscriptionPlan, setSubscriptionPlan] = useState()
  const plans = [
    {
      id: 1,
      name: "Free Trial",
      detail: "Just for testing purpose",
      price: 0,
      hits: 3,
      extraFeature: [
        "During the trial period, you have three attempts to use the app. After reaching the limit, a subscription is required to continue accessing our services",
      ],
    },
    {
      id: 2,
      name: "Basic Plan",
      detail: "Access essential features to get started.",
      price: 10,
      hits: "Unlimited",
      extraFeature: [
        "Translate Classical Armenian Text",
        "Translate Classical Armenian Image",
      ],
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT,
    },
    {
      id: 3,
      name: "Premium Plan",
      detail:
        "Gain access to all features, including advanced tools and resources.",
      price: 20,
      hits: "Unlimited",
      extraFeature: [
        "Translate Classical Armenian Text",
        "Translate Classical Armenian Image",
        "Translate Modren Armenian Text",
        "Translate into English",
      ],
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRODUCT,
    },
  ];
  const data = {
    userId: userId
  }
  console.log(userId)
  const abc =async()=>{
    const res = await stripe(data);
    setSubscriptionPlan(res?.res)
    console.log(res)
  }
useEffect(()=>{
  abc()
}, [])
  return (
    <div className="container mx-auto mt-8"> 
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Choose Your Subscription Plan
            </h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Unlock exclusive features and elevate your experience with our
              subscription plans. Select the plan that best suits your needs and
              start enjoying premium benefits today.
            </p>
          </div>
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {plans.map((plan) => (
              <div
                class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
                key={plan?.id}
              >
                <h3 class="mb-4 text-2xl font-semibold">{plan?.name}</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {plan?.detail}
                </p>
                <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">
                    ${plan?.price}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      Hits: <span class="font-semibold">{plan?.hits}</span>
                    </span>
                  </li>
                  {plan?.extraFeature?.map((feature) => (
                    <li class="flex items-center space-x-3">
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>
                        <span class="font-semibold">{feature}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <ManageUserSubscriptionButton
                  userId={userId}
                  email={"xyz@gmail.com"}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                  isSubscribed={!!subscriptionPlan?.isSubscribed}
                  isCurrentPlan={subscriptionPlan?.name === plan.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// SubscriptionPlans.getInitialProps = async (context) => {
//   let userId; // Declare userId outside the callback function

//   // Listen for authentication state changes
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       userId = user.uid; // Assign the user ID to the userId variable
//     } else {
//       userId = null; // Handle case where user is not logged in
//     }
//   });
//   return {
//     userId,
//   };
// };

export default SubscriptionPlans;
