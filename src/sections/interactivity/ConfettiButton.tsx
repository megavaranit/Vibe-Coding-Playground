/**
 * ConfettiButton: конфетти из точки клика (dynamic import canvas-confetti).
 */
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fireConfetti } from '@/lib/confetti';
import { springSoft } from '@/lib/motion';
import { Button } from '@/ui/Button';

export function ConfettiButton() {
  const reduced = useReducedMotion();

  return (
    <motion.div whileTap={reduced ? undefined : { scale: 0.96 }} transition={springSoft}>
      <Button
        aria-label="Запустить конфетти"
        onClick={(event) => {
          if (reduced) return;
          const rect = event.currentTarget.getBoundingClientRect();
          void fireConfetti({
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          });
        }}
      >
        <Sparkles size={18} aria-hidden />
        Конфетти
      </Button>
    </motion.div>
  );
}
