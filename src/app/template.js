"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@headlessui/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

const Template = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState("");
  const [route, setRoute] = useState("");
  const isAuthenticated = Cookies.get("access-token");
  const protectedRoutes = ["/", "/sign-in", "/sign-up"];
  const isSubscribed = Cookies.get("isSubscribed");
  useEffect(() => {
    if (!isAuthenticated && !protectedRoutes.includes(path)) {
      router.push("/");
    }
    if (!isAuthenticated && path === "/translator") {
      router.push("/sign-in");
    }
    if (!isAuthenticated && path === "/subscription-plans") {
      router.push("/sign-in");
    }
    if (isSubscribed === "false" && path === "/translator") {
      router.push("/subscription-plans");
    }
  }, [isAuthenticated, path, router]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
        setRoute("/subscription-plans");
      } else {
        setRoute("/sign-in");
      }
    });
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("access-token");
      Cookies.remove("userId");
      Cookies.remove("isSubscribed");
      Cookies.remove("premium");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
              <header className="absolute inset-x-0 top-0 z-40">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a
                  href="/"
                  className="-m-1.5 p-1.5 dark:bg-white border rounded-xl"
                >
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
                  <div className="h-6 w-6" aria-hidden="true">
                    Menu
                  </div>
                </button>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {route === "/sign-in" ? (
                  <a
                    href="/sign-in"
                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : (
                  <div className="flex gap-4">
                    <button
                      className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                      onClick={() => handleSignOut()}
                    >
                      Log out <span aria-hidden="true">&rarr;</span>
                    </button>
                    <a
                      href="/profile"
                      className="h-full px-3 rounded-full border border-gray-700 dark:border-white flex justify-center items-center text-2xl font-bold capitalize"
                    >
                      {user?.charAt(0)}
                    </a>
                  </div>
                )}
                <ThemeSwitcher />
              </div>
            </nav>
            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a
                    href="/"
                    className="-m-1.5 p-1.5 dark:bg-white border rounded-xl"
                  >
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
                    <div className="h-6 w-6" aria-hidden="true">
                      x
                    </div>
                  </button>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
      {isAuthenticated ? (
        <div>
          {children}
        </div>
      ) : (
        <div className="h-screen min-h-screen max-h-screen">{children}</div>
      )}
      <ToastContainer />
    </>
  );
};

export default Template;

export const ShowNotification = (message, type) => {
  toast(message, {
    type,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
