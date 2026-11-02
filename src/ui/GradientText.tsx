import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  /** CSS background-image; defaults to --gradient-main */
  gradient?: string;
};

export function GradientText({
  children,
  className,
  gradient = 'var(--gradient-main)',
}: GradientTextProps) {
  return (
    <span
      className={cn('bg-clip-text text-transparent', className)}
      style={{ backgroundImage: gradient } satisfies CSSProperties}
    >
      {children}
    </span>
  );
}
