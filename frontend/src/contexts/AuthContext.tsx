import { AuthContext } from '@/hooks/useAuth';
import { useState, type ReactNode, useMemo } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  );

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;

  const values = useMemo(
    () => ({ isAuthenticated, login, logout, token }),
    [isAuthenticated, token],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
