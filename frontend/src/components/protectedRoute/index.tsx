import { Navigate } from 'react-router';
import type { ReactElement } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
