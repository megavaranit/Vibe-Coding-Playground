/**
 * MorphButton: idle → loading → success с морфингом содержимого.
 */
import { Check, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOutExpo } from '@/lib/motion';
import { Button } from '@/ui/Button';

type MorphState = 'idle' | 'loading' | 'success';

const labels: Record<MorphState, string> = {
  idle: 'Запустить',
  loading: 'Загрузка',
  success: 'Готово',
};

export function MorphButton() {
  const [state, setState] = useState<MorphState>('idle');
  const reduced = useReducedMotion();

  const onClick = () => {
    if (state !== 'idle') return;
    setState('loading');
    window.setTimeout(() => {
      setState('success');
      window.setTimeout(() => setState('idle'), 2000);
    }, reduced ? 400 : 1200);
  };

  return (
    <Button
      onClick={onClick}
      variant="glass"
      className="min-w-44"
      aria-busy={state === 'loading'}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          className="inline-flex items-center gap-2"
        >
          {state === 'loading' ? (
            <LoaderCircle size={16} className={reduced ? undefined : 'animate-spin'} aria-hidden />
          ) : null}
          {state === 'success' ? <Check size={16} aria-hidden /> : null}
          {labels[state]}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
