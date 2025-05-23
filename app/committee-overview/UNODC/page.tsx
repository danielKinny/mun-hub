import { CustomNav } from "@/components/ui/customnav";
import { UNODCComp } from "@/components/ui/committeeComponents";
import ProtectedRoute from "@/components/protectedroute";

const Page = () => {
  return (
    <ProtectedRoute>
      <CustomNav />
      <UNODCComp />
    </ProtectedRoute>
  );
};

export default Page;
