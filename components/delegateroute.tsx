"use client";
import React, { useEffect } from "react";
import { useSession } from "../app/context/sessionContext";
import { useRouter } from "next/navigation";

const DelegateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!('delegateID' in (currentUser || {}))) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (currentUser === null) {
    return null;
  }

  return <>{children}</>;
};

export default DelegateRoute;
