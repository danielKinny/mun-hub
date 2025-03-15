import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../app/context/sessionContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;