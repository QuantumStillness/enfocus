
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Modified to allow access without login during beta
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // During beta, we allow access without login
  // Simply render the children without any protection
  return <>{children}</>;
};

export default ProtectedRoute;
