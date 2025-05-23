"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { speeches, delegates, countries } from "@/db/index";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";

const Page = () => {
  const { user: currentUser } = useSession();
  return (
    <ProtectedRoute>
      <CustomNav />
      <div className="text-white">
        <div>
          this will be were speeches are listed
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
