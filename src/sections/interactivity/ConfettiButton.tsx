import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { fireConfetti } from '@/lib/confetti';
import { springSoft } from '@/lib/motion';
import { Button } from '@/ui/Button';

export function ConfettiButton() {
  return (
    <motion.div whileTap={{ scale: 0.96 }} transition={springSoft}>
      <Button
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          void fireConfetti({
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          });
        }}
      >
        <Sparkles size={18} />
        Конфетти
      </Button>
    </motion.div>
  );
}
