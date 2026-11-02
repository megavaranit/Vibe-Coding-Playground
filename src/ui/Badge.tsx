import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-badge)] border border-border bg-surface-2 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
