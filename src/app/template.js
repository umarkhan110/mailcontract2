"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

const Template = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const isAuthenticated = Cookies.get("access-token");
  const protectedRoutes = ["/", "/sign-in", "/sign-up"];
  const isSubscribed = Cookies.get("isSubscribed");
  useEffect(() => {
    debugger
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

  return (
    <>
      {isAuthenticated ? (
        <div>{children}</div>
      ) : (
        <div className="h-screen min-h-screen max-h-screen">{children}</div>
      )}
    </>
  );
};

export default Template;
