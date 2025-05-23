import { CustomNav } from "@/components/ui/customnav";
import { UNHRCComp } from "@/components/ui/committeeComponents";
import ProtectedRoute from "@/components/protectedroute";

const Page = () => {
  return (
    <ProtectedRoute>
      <CustomNav />
      <UNHRCComp />
    </ProtectedRoute>
  );
};

export default Page;
