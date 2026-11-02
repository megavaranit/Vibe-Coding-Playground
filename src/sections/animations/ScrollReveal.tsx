/**
 * ScrollReveal: появление блока при входе в viewport.
 * Главная техника — whileInView + direction/delay/once; опциональный parallax через transform.
 */
import { motion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOutExpo, viewportOnce } from '@/lib/motion';

type Direction = 'up' | 'left' | 'right' | 'scale';

const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 56 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.82 },
};

type ScrollRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  once?: boolean;
  parallax?: boolean;
  className?: string;
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  once = true,
  parallax = false,
  className,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || !parallax ? [0, 0] : [40, -40],
  );

  const variants = {
    hidden: reduced
      ? { opacity: 1, x: 0, y: 0, scale: 1 }
      : { opacity: 0, x: 0, y: 0, scale: 1, ...offset[direction] },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={
        once
          ? viewportOnce
          : { once: false, amount: 0.35, margin: '0px 0px -12% 0px' }
      }
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      <motion.div style={parallax && !reduced ? { y: parallaxY } : undefined}>
        {children}
      </motion.div>
    </motion.div>
  );
}
