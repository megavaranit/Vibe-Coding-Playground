import { Check, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/ui/Button';

type MorphState = 'idle' | 'loading' | 'success';

export function MorphButton() {
  const [state, setState] = useState<MorphState>('idle');

  const onClick = () => {
    if (state !== 'idle') return;
    setState('loading');
    window.setTimeout(() => {
      setState('success');
      window.setTimeout(() => setState('idle'), 2000);
    }, 1200);
  };

  return (
    <Button onClick={onClick} variant="glass" className="min-w-40">
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="inline-flex items-center gap-2"
        >
          {state === 'idle' ? 'Запустить' : null}
          {state === 'loading' ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Загрузка
            </>
          ) : null}
          {state === 'success' ? (
            <>
              <Check size={16} />
              Готово
            </>
          ) : null}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
