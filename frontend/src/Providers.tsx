import type { ReactElement, ReactNode } from 'react';
import { AuthProvider } from './contexts/AuthContext';

export function Providers({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return <AuthProvider>{children}</AuthProvider>;
}
