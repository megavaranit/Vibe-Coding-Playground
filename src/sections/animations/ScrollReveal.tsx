import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOutExpo, viewportOnce } from '@/lib/motion';

type Direction = 'up' | 'left' | 'right' | 'scale';

const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 24 },
  left: { x: -24 },
  right: { x: 24 },
  scale: { scale: 0.96 },
};

type ScrollRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  once?: boolean;
  className?: string;
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  once = true,
  className,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={once ? viewportOnce : { once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
