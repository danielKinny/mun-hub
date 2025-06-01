import React from "react";
import ProtectedRoute from "@/components/protectedroute";

export default function Page() {
  return (
    <ProtectedRoute>
      <div></div>
    </ProtectedRoute>
  );
}
