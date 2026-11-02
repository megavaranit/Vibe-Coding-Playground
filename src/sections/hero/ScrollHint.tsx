/**
 * Hero scroll cue. Main technique — looping translateY, disabled when reduced-motion.
 */
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ScrollHint() {
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hidden) return null;

  return (
    <motion.a
      href="#animations"
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition-opacity hover:text-text"
      initial={{ opacity: 0 }}
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: [0, 8, 0] }
      }
      transition={
        reduced
          ? { duration: 0.4 }
          : { opacity: { duration: 0.5 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }
      }
      aria-label="Прокрутить к демо"
    >
      <ChevronDown aria-hidden />
    </motion.a>
  );
}
