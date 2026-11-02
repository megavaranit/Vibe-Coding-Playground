import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn('bg-clip-text text-transparent', className)}
      style={{ backgroundImage: 'var(--gradient-main)' }}
    >
      {children}
    </span>
  );
}
