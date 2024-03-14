"use client";
import React from "react";
import { Fragment } from "react";
import { db } from "@/app/firebase/config";
import { stripeCheckout } from "../service/stripe-checkout";
import { Dialog, Transition } from "@headlessui/react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SubscriptionPlans = () => {
  const plans = [
    { id: 1, name: "Free Trial", price: 0, hits: 3 },
    { id: 2, name: "Basic Plan", price: 10, hits: "Unlimited"},
    { id: 3, name: "Standard Plan", price: 20 , hits: "Unlimited"},
  ];
  const router = useRouter();
  const currentDate = new Date();
  const subscriptionEndDate = new Date(currentDate);
  subscriptionEndDate.setDate(currentDate.getDate() + 30);

  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleSelectPlan = async (plan, e) => {
    e.preventDefault();
    setSelectedPlan(plan);
    if (plan.id === 1) {
      const userId = Cookies.get("userId");
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().availFreeTrialAlready) {
        alert("Already used free trial");
      } else {
        const data = {
          subscriptionStatus: "active",
          subscriptionStartDate: new Date().toISOString(),
          subscriptionEndDate: subscriptionEndDate.toISOString(),
          planId: plan?.id,
          planName: plan.name,
          price: plan.price,
          freehits: 3,
          availFreeTrialAlready: true,
        };
        await setDoc(userDocRef, data, { merge: true });
        Cookies.set("isSubscribed", true);
        handlePaymentSuccess();
      }
      return;
    } else {
      setOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    setOpen(false);
    router.push("/translator");
  };
  const onToken = async (token) => {
    const data = {
      tokenId: token.id,
      amount: selectedPlan?.price,
    };
    const res = await stripeCheckout(data);

    if (res.success) {
      const userId = Cookies.get("userId");
      const data = {
        subscriptionStatus: "active",
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: subscriptionEndDate.toISOString(),
        planId: selectedPlan?.id,
        planName: selectedPlan.name,
        price: selectedPlan.price,
      };
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, data, { merge: true });
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().subscriptionStatus === "active") {
        Cookies.set("isSubscribed", true);
      }
      handlePaymentSuccess();
    }
  };

  const CheckoutForm = ({ open, setOpen }) => {
    return (
      <>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-lg md:px-4 lg:max-w-lg">
                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <div className="h-6 w-6" aria-hidden="true">
                          x
                        </div>
                      </button>

                      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div className="sm:col-span-8 lg:col-span-12">
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                            Stripe Checkout
                          </h2>

                          <section
                            aria-labelledby="information-heading"
                            className="mt-2"
                          >
                            <h3 className="">{selectedPlan.name}</h3>

                            <p className="text-2xl text-gray-900">
                              ${selectedPlan.price}
                            </p>
                          </section>

                          <section
                            aria-labelledby="options-heading"
                            className="mt-10"
                          >
                            <StripeCheckout
                              name="Stripe Checkout"
                              // image={Imge}
                              // billingAddress
                              // shippingAddress
                              // description="Your amount"
                              amount={selectedPlan?.price}
                              token={onToken}
                              stripeKey={process.env.NEXT_PUBLIC_STRIPE_API_KEY}
                            ></StripeCheckout>
                          </section>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  };
  return (
    <div className="container mx-auto mt-8">
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Choose a Subscription Plan
            </h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {plans.map((plan) => (
              <div
                class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
                key={plan.id}
              >
                <h3 class="mb-4 text-2xl font-semibold">{plan.name}</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  Best option for personal use & for your next project.
                </p>
                <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">
                    ${plan.price}
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
                    <span>Individual configuration</span>
                  </li>
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
                    <span>No setup, or hidden fees</span>
                  </li>
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
                      Premium support:{" "}
                      <span class="font-semibold">6 months</span>
                    </span>
                  </li>
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
                      Free updates: <span class="font-semibold">6 months</span>
                    </span>
                  </li>
                </ul>
                <button
                  class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                  onClick={(e) => handleSelectPlan(plan, e)}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedPlan && open && (
        <CheckoutForm
          selectedPlan={selectedPlan}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default SubscriptionPlans;

// const CheckoutForm = ({
//   selectedPlan,
//   handlePaymentSuccess,
//   open,
//   setOpen,
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const currentDate = new Date();
//     const subscriptionEndDate = new Date(currentDate);
//     subscriptionEndDate.setDate(currentDate.getDate() + 30);
//     if (selectedPlan.id === 1) {
//       const userId = Cookies.get("userId");
//       const userDocRef = doc(db, "users", userId);
//       const userDoc = await getDoc(userDocRef);
//       if (userDoc.exists() && userDoc.data().availFreeTrialAlready) {
//         alert("Already used free trial");
//       } else {
//         const data = {
//           subscriptionStatus: "active",
//           subscriptionStartDate: new Date().toISOString(),
//           subscriptionEndDate: subscriptionEndDate.toISOString(),
//           planId: selectedPlan?.id,
//           planName: selectedPlan.name,
//           price: selectedPlan.price,
//           freehits: 3,
//           availFreeTrialAlready: true,
//         };
//         await setDoc(userDocRef, data, { merge: true });
//         handlePaymentSuccess();
//       }
//       return;
//     }
//     if (!stripe || !elements) {
//       return;
//     }

//     const res = await stripeCheckout(selectedPlan);
//     console.log(res);
//     if (res.success) {
//       const userId = Cookies.get("userId");
//       const data = {
//         subscriptionStatus: "active",
//         subscriptionStartDate: new Date().toISOString(),
//         subscriptionEndDate: subscriptionEndDate.toISOString(),
//         planId: selectedPlan?.id,
//         planName: selectedPlan.name,
//         price: selectedPlan.price,
//       };
//       const userDocRef = doc(db, "users", userId);
//       await setDoc(userDocRef, data, { merge: true });
//       handlePaymentSuccess();
//     }
//   };

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
//                           <h3 id="options-heading" className="sr-only">
//                             Product options
//                           </h3>
//                           <form onSubmit={handleSubmit}>
//                             <CardElement />

//                             <button
//                               type="submit"
//                               disabled={!stripe}
//                               className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                               Subscribe to {selectedPlan.name}
//                             </button>
//                           </form>
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

      {/* <div className="flex justify-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-1/3 bg-white p-6 rounded-md shadow-md mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-gray-600 mb-4">Perfect for {plan.name}</p>
            <div className="flex items-center justify-center mt-6">
              <span className="text-2xl font-bold">${plan.price}</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={() => handleSelectPlan(plan)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div> */}
      {/* {selectedPlan && open && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            selectedPlan={selectedPlan}
            handlePaymentSuccess={handlePaymentSuccess}
            open={open}
            setOpen={setOpen}
          />
        </Elements>
      )} */}