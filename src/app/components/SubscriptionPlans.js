"use client";
import React from "react";
// import { Fragment } from "react";
// import { auth, db } from "@/app/firebase/config";
// import { stripeCheckout } from "../service/stripe-checkout";
// import { Dialog, Transition } from "@headlessui/react";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import StripeCheckout from "react-stripe-checkout";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { ShowNotification } from "../template";
// import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

const SubscriptionPlans = () => {
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
    },
  ];
  // const router = useRouter();
  // const currentDate = new Date();
  // const subscriptionEndDate = new Date(currentDate);
  // subscriptionEndDate.setDate(currentDate.getDate() + 30);

  // const [selectedPlan, setSelectedPlan] = React.useState(null);
  // const [open, setOpen] = React.useState(false);

  // const handleSelectPlan = async (plan, e) => {
  //   e.preventDefault();
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.push("/sign-in");
  //     }
  //   });
  //   setSelectedPlan(plan);
  //   if (plan.id === 1) {
  //     const userId = Cookies.get("userId");
  //     const userDocRef = doc(db, "users", userId);
  //     const userDoc = await getDoc(userDocRef);
  //     if (userDoc.exists() && userDoc.data().availFreeTrialAlready) {
  //       ShowNotification("Already used free trial", "error");
  //     } else {
  //       const data = {
  //         subscriptionStatus: "active",
  //         subscriptionStartDate: new Date().toISOString(),
  //         subscriptionEndDate: subscriptionEndDate.toISOString(),
  //         planId: plan?.id,
  //         planName: plan.name,
  //         price: plan.price,
  //         freehits: 3,
  //         availFreeTrialAlready: true,
  //       };
  //       await setDoc(userDocRef, data, { merge: true });
  //       Cookies.set("isSubscribed", true);
  //       handlePaymentSuccess();
  //     }
  //     return;
  //   } else {
  //     setOpen(true);
  //   }
  // };

  // const handlePaymentSuccess = () => {
  //   // console.log("Payment successful!");
  //   ShowNotification("Payment Successfully", "success");
  //   setOpen(false);
  //   router.push("/translator");
  // };
  // const onToken = async (token) => {
  //   const data = {
  //     tokenId: token.id,
  //     amount: selectedPlan?.price,
  //   };
  //   const res = await stripeCheckout(data);

  //   if (res.success) {
  //     const userId = Cookies.get("userId");
  //     const data = {
  //       subscriptionStatus: "active",
  //       subscriptionStartDate: new Date().toISOString(),
  //       subscriptionEndDate: subscriptionEndDate.toISOString(),
  //       planId: selectedPlan?.id,
  //       planName: selectedPlan.name,
  //       price: selectedPlan.price,
  //       extraFeature: selectedPlan.extraFeature,
  //     };
  //     const userDocRef = doc(db, "users", userId);
  //     await setDoc(userDocRef, data, { merge: true });
  //     const userDoc = await getDoc(userDocRef);
  //     if (userDoc.exists() && userDoc.data().subscriptionStatus === "active") {
  //       Cookies.set("isSubscribed", true);
  //       if (userDoc.data().planId === 3) {
  //         Cookies.set("premium", true);
  //       }else{
  //         Cookies.set("premium", false);
  //       }
  //     }
  //     handlePaymentSuccess();
  //   }
  // };

  // const CheckoutForm = ({ open, setOpen }) => {
  //   return (
  //     <>
  //       <Transition.Root show={open} as={Fragment}>
  //         <Dialog as="div" className="relative z-10" onClose={setOpen}>
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0"
  //             enterTo="opacity-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
  //           </Transition.Child>

  //           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  //             <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
  //               <Transition.Child
  //                 as={Fragment}
  //                 enter="ease-out duration-300"
  //                 enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
  //                 enterTo="opacity-100 translate-y-0 md:scale-100"
  //                 leave="ease-in duration-200"
  //                 leaveFrom="opacity-100 translate-y-0 md:scale-100"
  //                 leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
  //               >
  //                 <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-lg md:px-4 lg:max-w-lg">
  //                   <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
  //                     <button
  //                       type="button"
  //                       className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
  //                       onClick={() => setOpen(false)}
  //                     >
  //                       <span className="sr-only">Close</span>
  //                       <div className="h-6 w-6" aria-hidden="true">
  //                         x
  //                       </div>
  //                     </button>

  //                     <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
  //                       <div className="sm:col-span-8 lg:col-span-12">
  //                         <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
  //                           Stripe Checkout
  //                         </h2>

  //                         <section
  //                           aria-labelledby="information-heading"
  //                           className="mt-2"
  //                         >
  //                           <h3 className="">{selectedPlan.name}</h3>

  //                           <p className="text-2xl text-gray-900">
  //                             ${selectedPlan.price}
  //                           </p>
  //                         </section>

  //                         <section
  //                           aria-labelledby="options-heading"
  //                           className="mt-10"
  //                         >
  //                           <StripeCheckout
  //                             name="Stripe Checkout"
  //                             // image={Imge}
  //                             // billingAddress
  //                             // shippingAddress
  //                             // description="Your amount"
  //                             amount={selectedPlan?.price}
  //                             token={onToken}
  //                             stripeKey={process.env.NEXT_PUBLIC_STRIPE_API_KEY}
  //                           ></StripeCheckout>
  //                         </section>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </Dialog.Panel>
  //               </Transition.Child>
  //             </div>
  //           </div>
  //         </Dialog>
  //       </Transition.Root>
  //     </>
  //   );
  // };
  return (
    <div className="container mx-auto mt-8">
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          {/* <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Choose Your Subscription Plan
            </h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Unlock exclusive features and elevate your experience with our
              subscription plans. Select the plan that best suits your needs and
              start enjoying premium benefits today.
            </p>
          </div> */}
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {plans.map((plan) => (
              <div
                class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
                key={plan?.id}
              >
                <h3 class="mb-4 text-2xl font-semibold">{plan?.name}</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {/* {plan?.detail} */}
                </p>
                {/* <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">
                    ${plan?.price}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div> */}

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
   
              </div>
            ))}
          </div>
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 mt-10">

          <Link
                href={"/subscription-plans"}
                class="text-white bg-[#5e5170] hover:bg-[#886daf]  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                // onClick={(e) => handleSelectPlan(plan, e)}
                >
                  Upgrade to Premium
                </Link>
                  </div>
        </div>
      </section>
      {/* {selectedPlan && open && (
        <CheckoutForm
          selectedPlan={selectedPlan}
          open={open}
          setOpen={setOpen}
        />
      )} */}
    </div>
  );
};

export default SubscriptionPlans;
