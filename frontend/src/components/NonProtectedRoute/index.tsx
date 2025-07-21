import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import type { ReactNode } from 'react';

interface NonProtectedRouteProps {
  children: ReactNode;
}

export function NonProtectedRoute({ children }: NonProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}
