import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  const isGlass = typeof className === 'string' && className.split(/\s+/).includes('glass');

  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-border p-6',
        !isGlass && 'bg-surface',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
