import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hidden) return null;

  return (
    <motion.a
      href="#animations"
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Прокрутить дальше"
    >
      <ChevronDown />
    </motion.a>
  );
}
