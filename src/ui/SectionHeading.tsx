import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !title && !description) return null;

  return (
    <div className={cn('mb-12 max-w-3xl', className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-medium">
          {title}
        </h2>
      ) : null}
      {description ? <p className="mt-4 text-muted">{description}</p> : null}
    </div>
  );
}
