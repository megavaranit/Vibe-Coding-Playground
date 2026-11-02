/**
 * AnimatedSwitch: переключатель свечения LiveDemoPanel (spring thumb).
 */
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

type AnimatedSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function AnimatedSwitch({
  checked,
  onChange,
  label = 'Свечение превью',
}: AnimatedSwitchProps) {
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-8 w-14 rounded-full border border-border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet',
        checked ? 'bg-accent-lime' : 'bg-surface-2',
      )}
    >
      <motion.span
        className="absolute top-1 size-6 rounded-full bg-surface shadow-sm"
        animate={{ x: checked ? 28 : 4 }}
        transition={
          reduced
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 420, damping: 30 }
        }
      />
    </button>
  );
}
