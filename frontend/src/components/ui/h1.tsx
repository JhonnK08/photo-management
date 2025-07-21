import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function TypographyH1({
  children,
  className,
}: Readonly<{
  className?: string;
  children: ReactNode;
}>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
    >
      {children}
    </h1>
  );
}
