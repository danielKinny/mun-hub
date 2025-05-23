import { CustomNav } from "@/components/ui/customnav";
import { UNESCOComp } from "@/components/ui/committeeComponents";
import ProtectedRoute from "@/components/protectedroute";

const Page = () => {
  return (
    <ProtectedRoute>
      <CustomNav />
      <UNESCOComp />
    </ProtectedRoute>
  );
};

export default Page;
