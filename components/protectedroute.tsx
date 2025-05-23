"use client";
import React, { useEffect } from "react";
import { useSession } from "../app/context/sessionContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    // this should be redirecting to the login page if the user is not logged in
    if (currentUser === null) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (currentUser === null) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
