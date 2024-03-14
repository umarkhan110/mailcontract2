"use client"
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "@/app/firebase/config";
import Cookies from 'js-cookie';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [route, setRoute] = useState("")
  const isSubscribed = Cookies.get("isSubscribed");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && isSubscribed === "true") {
        const uid = user.uid;
        setRoute("/translator")
      }else if(isSubscribed === "false"){
        setRoute("/subscription-plans")
      }else{
        setRoute("/sign-in")
      }
    });
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("access-token")
      Cookies.remove("userId")
      Cookies.remove("isSubscribed")

    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  return (
    <div className={`bg-white dark:bg-gray-700`}>
      <header className="absolute inset-x-0 top-0 z-40">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 dark:bg-white border rounded-xl">
              <span className="sr-only">Your Company</span>
              <img
                className="h-12 w-auto"
                src="/images/translator.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="h-6 w-6" aria-hidden="true" >Menu</div>
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-16">
            {route === "/sign-in" ?
            <a href="/sign-in" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>:
            <button className="text-sm font-semibold leading-6 text-gray-900 dark:text-white" onClick={()=>handleSignOut()}>
              Log out <span aria-hidden="true">&rarr;</span>
            </button>}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5 dark:bg-white border rounded-xl">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="/images/translator.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <div className="h-6 w-6" aria-hidden="true" >x</div>
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Translate Classical Armenian language to Modern Armenian language
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-900 dark:text-slate-300">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={route}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
