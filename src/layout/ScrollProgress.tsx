import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-50 h-1 origin-left"
      style={{
        scaleX: reduced ? scrollYProgress : scaleX,
        backgroundImage: 'var(--gradient-main)',
      }}
    />
  );
}
