/**
 * LiveDemoPanel: превью. Слайдер — сила свечения орба, переключатель — glow on/off.
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
  const orbSize = 72 + intensity * 0.9;
  const orbOpacity = 0.35 + intensity * 0.005;

  return (
    <Card className={cn('relative overflow-hidden', glowEnabled && 'glow')}>
      <p className="font-mono text-xs tracking-[0.18em] text-accent-cyan uppercase">Live</p>
      <p className="mt-3 font-display text-2xl">Живое превью</p>
      <p className="mt-2 text-muted">
        Слайдер задаёт силу орба, переключатель включает неоновое свечение карточки.
      </p>

      <div className="relative mt-8 flex h-40 items-center justify-center rounded-[var(--radius-control)] bg-surface-2">
        <motion.div
          aria-hidden
          className="rounded-full"
          animate={{
            width: orbSize,
            height: orbSize,
            opacity: orbOpacity,
          }}
          transition={
            reduced
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 220, damping: 28 }
          }
          style={{
            backgroundImage: 'var(--gradient-main)',
            boxShadow: glowEnabled
              ? `0 0 ${20 + intensity * 0.5}px color-mix(in srgb, var(--accent-violet) 70%, transparent)`
              : 'none',
            filter: glowEnabled ? `blur(${Math.max(0, 8 - intensity * 0.04)}px)` : 'blur(2px)',
          }}
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
        intensity {intensity}
        {glowEnabled ? ' · glow on' : ' · glow off'}
      </p>
    </Card>
  );
}
