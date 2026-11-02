/**
 * HoverTiltCard: 3D-наклон за курсором (transform perspective).
 */
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { Card } from '@/ui/Card';

export function HoverTiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-11, 11]), {
    stiffness: 220,
    damping: 22,
  });
  const glareX = useTransform(x, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(y, [-0.5, 0.5], [10, 90]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, color-mix(in srgb, var(--accent-cyan) 32%, transparent), transparent 55%)`;

  return (
    <motion.div
      className={cn('relative h-full', className)}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Card className="relative h-full overflow-hidden transition-shadow duration-300 hover:shadow-[var(--glow)]">
        {!reduced ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
            style={{ background: glareBackground }}
          />
        ) : null}
        <div className="relative z-10">{children}</div>
      </Card>
    </motion.div>
  );
}
