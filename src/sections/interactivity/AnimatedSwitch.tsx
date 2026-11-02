import { motion } from 'motion/react';
import { cn } from '@/lib/cn';

type AnimatedSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function AnimatedSwitch({ checked, onChange }: AnimatedSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-8 w-14 rounded-full border border-border transition-colors',
        checked ? 'bg-accent-lime' : 'bg-surface-2',
      )}
    >
      <motion.span
        layout
        className="absolute top-1 size-6 rounded-full bg-surface"
        animate={{ x: checked ? 28 : 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </button>
  );
}
