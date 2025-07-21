import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function TypographyP({
  children,
  className,
}: Readonly<{
  className?: string;
  children: ReactNode;
}>) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
}
