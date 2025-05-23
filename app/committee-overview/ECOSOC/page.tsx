import { CustomNav } from "@/components/ui/customnav";
import { ECOSOCComp } from "@/components/ui/committeeComponents";
import ProtectedRoute from "@/components/protectedroute";

const Page = () => {
    return (
        <ProtectedRoute>
            <CustomNav />
            <ECOSOCComp />
        </ProtectedRoute>
    );
};

export default Page;