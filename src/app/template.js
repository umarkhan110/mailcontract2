"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

const Template = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const isAuthenticated = Cookies.get("access-token");
  const protectedRoutes = ["/", "/sign-in", "/sign-up"];

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
