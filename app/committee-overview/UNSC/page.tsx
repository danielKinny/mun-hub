import { CustomNav } from "@/components/ui/customnav";
import { UNSCComp } from "@/components/ui/committeeComponents";
import ProtectedRoute from "@/components/protectedroute";

const Page = () => {

    return (
        <ProtectedRoute>
            <CustomNav />
            <UNSCComp />
        </ProtectedRoute>
    );
};

export default Page;