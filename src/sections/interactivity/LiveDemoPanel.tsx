/**
 * LiveDemoPanel: слайдер — размер и угол; переключатель — свечение (независимо от слайдера).
 */
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { Card } from '@/ui/Card';

type LiveDemoPanelProps = {
  intensity: number;
  glowEnabled: boolean;
};

export function LiveDemoPanel({ intensity, glowEnabled }: LiveDemoPanelProps) {
  const reduced = useReducedMotion();
  const scale = 0.85 + intensity * 0.003;
  const rotate = reduced ? 0 : (intensity - 50) * 0.24;

  return (
    <Card className={cn('relative overflow-hidden', glowEnabled && 'glow')}>
      <p className="font-mono text-xs tracking-[0.18em] text-accent-cyan uppercase">Live</p>
      <p className="mt-3 font-display text-2xl">Живое превью</p>
      <p className="mt-2 text-muted">
        Слайдер меняет размер и угол. Свечение включается только переключателем.
      </p>

      <div className="relative mt-8 flex h-44 items-center justify-center rounded-[var(--radius-control)] bg-surface-2">
        <motion.div
          aria-hidden
          className="size-28 rounded-[1.25rem]"
          style={{ backgroundImage: 'var(--gradient-main)' }}
          animate={{ scale, rotate }}
          transition={
            reduced
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 200, damping: 24 }
          }
        />
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundImage: 'var(--gradient-main)' }}
          animate={{ width: `${intensity}%` }}
          transition={reduced ? { duration: 0.01 } : { type: 'spring', stiffness: 200, damping: 28 }}
        />
      </div>
      <p className="mt-3 font-mono text-xs text-muted tabular-nums">
        scale {scale.toFixed(2)} · rotate {rotate.toFixed(1)}°
        {glowEnabled ? ' · glow on' : ' · glow off'}
      </p>
    </Card>
  );
}
