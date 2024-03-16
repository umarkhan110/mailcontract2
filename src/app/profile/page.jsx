"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ShowNotification } from "../template";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
export default function Tranlator() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [userSubscription, setUserSubscription] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user?.displayName,
          email: user?.email,
        });
      }
    });
    const getUserSubscriptionDetail = async () => {
      const userId = Cookies.get("userId");
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        console.log(userDoc.data());
        setUserSubscription(userDoc.data());
      }
    };
    getUserSubscriptionDetail();
  }, []);
  return (
    <div className="md:mx-20 mx-0 dark:text-white">
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
      <div className="md:p-16">
        <div className="p-8 bg-white dark:bg-gray-700 shadow mt-24">
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="mt-28 text-center pb-12">
            <h1 className="text-4xl font-medium dark:text-white text-gray-700">
              {user?.name}{" "}
            </h1>
            <p className="font-light text-gray-600 mt-3 dark:text-white">
              {user?.email}
            </p>
            <p className="mt-8 text-gray-500 dark:text-white">
              Solution Manager
            </p>
            <p className="mt-2 text-gray-500 dark:text-white">
              University of Computer Science
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 md:p-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br  to-purple-400 from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400  to-indigo-600"></div>
          </div>

          <div className="max-w-7xl mx-1 md:px-12 xl:px-6">
            <div className="md:w-2/3 lg:w-1/2 mt-12 text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="light:black"
                className="w-6 h-6 text-secondary"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h2 className="my-8 text-2xl font-bold dark:text-white md:text-4xl text-gray-700">
                Your Plan
              </h2>
            </div>

            <div className="mt-16 grid divide-x divide-y  divide-gray-700 overflow-hidden  rounded-3xl border text-gray-600 border-gray-700 sm:grid-cols-1 lg:grid-cols-1  lg:divide-y-0 xl:grid-cols-1">
              <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl  hover:shadow-gray-600/10">
                {userSubscription === null ? (
                  <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary m-10">
                    {" "}
                    You don't have subscribe any package.{" "}
                    <a
                      href="/subscription-plans"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Select Plan
                    </a>
                  </h5>
                ) : (
                  <div className="relative space-y-8 py-12 p-8">
                    <img
                      src="https://www.svgrepo.com/show/164986/logo.svg"
                      loading="lazy"
                      width="200"
                      height="200"
                      className="w-12 h-12 rounded-full"
                      style={{ color: "transparent" }}
                    />
                    <div className="space-y-2">
                      <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary">
                        {userSubscription?.planName}
                      </h5>
                      {userSubscription?.planId !== 1 && (
                        <p className="text-gray-300">
                          Extra Feature: Unlimited Hits,{" "}
                          {userSubscription?.extraFeature}
                        </p>
                      )}
                      {userSubscription?.planId !== 1 && (
                        <p className="text-gray-300">
                          Start Date: {userSubscription?.subscriptionStartDate}
                        </p>
                      )}
                      {userSubscription?.planId !== 1 && (
                        <p className="text-gray-300">
                          Expiry Date: {userSubscription?.subscriptionEndDate}
                        </p>
                      )}
                      {userSubscription?.planId === 1 && (
                        <p className="text-gray-300">
                          Free Hits Available: {userSubscription?.freehits}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
