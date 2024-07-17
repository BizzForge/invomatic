import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext'; // Import your AuthContext

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect to login page if user is not authenticated
  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default PrivateRoute;
