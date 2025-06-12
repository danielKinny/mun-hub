"use client";
import React, { useEffect } from "react";
import { useSession } from "../app/context/sessionContext";
import { useRouter } from "next/navigation";


// this route protects from all unauthorized
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    // this should be redirecting to the login page if the user is not logged in
    if (currentUser === null) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return <>{children}</>;
};

// protects from any1 who aint a delegate
export const DelegateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!('delegateID' in (currentUser || {})) || currentUser === null) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return <>{children}</>;
};

// protects from any1 who aint an admin
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!('adminID' in (currentUser || {})) || currentUser === null) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return <>{children}</>;
};

export const ParticipantRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (('adminID' in (currentUser || {})) || currentUser === null) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return <>{children}</>;
}

