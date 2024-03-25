"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import Cookies from "js-cookie";
import SubscriptionPlans from "../app/components/SubscriptionPlans";

export default function Home() {
  const [route, setRoute] = useState("");
  const isSubscribed = Cookies.get("isSubscribed");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && isSubscribed === "true") {
        setRoute("/translator");
      } else if (isSubscribed === "false") {
        setRoute("/subscription-plans");
      } else {
        setRoute("/sign-in");
      }
    });
  }, []);

  return (
    <div className={`bg-white dark:bg-gray-700`}>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Unlock Premium Benefits for Enhanced Language Translation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-900 dark:text-slate-300">
              Ready to explore the richness of Armenian language across eras and
              mediums? Upgrade to our premium plan to access exclusive
              translation features tailored to your linguistic needs.
            </p>
            <div className="mt-6 text-lg leading-8 text-gray-900 dark:text-slate-300">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-lg">
                <ul className=" list-inside">
                  <li>
                    Translate Modern Armenian text into Classical Armenian
                    effortlessly.
                  </li>
                  <li>
                    Gain access to accurate translations from Classical Armenian
                    to English for comprehensive understanding.
                  </li>
                  <li>
                    Convert Classical Armenian text embedded within images into
                    Modern Armenian text for easy comprehension.
                  </li>
                  <li>
                    Enjoy ad-free browsing and uninterrupted translation
                    sessions.
                  </li>
                  <li>
                    Receive priority support for prompt assistance with any
                    translation queries.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={route}
                className="rounded-md bg-[#5e5170] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#886daf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <SubscriptionPlans />
      </div>
    </div>
  );
}
