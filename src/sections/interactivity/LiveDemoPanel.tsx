/**
 * LiveDemoPanel: превью, реагирующее на slider/switch (transform + opacity/glow).
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
  const scale = 0.92 + intensity * 0.0016;
  const rotate = reduced ? 0 : (intensity - 50) * 0.08;
  const glowStrength = glowEnabled ? 0.25 + intensity * 0.006 : 0;

  return (
    <Card
      className={cn('relative overflow-hidden', glowEnabled && 'glow')}
      style={{
        boxShadow: glowEnabled
          ? `0 0 ${24 + intensity * 0.4}px color-mix(in srgb, var(--accent-violet) ${Math.round(glowStrength * 100)}%, transparent)`
          : undefined,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 size-44 rounded-full blur-3xl"
        style={{
          background: 'var(--accent-cyan)',
          opacity: 0.15 + intensity * 0.003,
        }}
      />
      <motion.div
        className="relative z-10"
        animate={{ scale, rotate }}
        transition={
          reduced
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 180, damping: 22 }
        }
      >
        <p className="font-mono text-xs tracking-[0.18em] text-accent-cyan uppercase">Live</p>
        <p className="mt-3 font-display text-2xl">Живое превью</p>
        <p className="mt-2 text-muted">
          Слайдер крутит масштаб и угол, переключатель включает свечение — отклик сразу.
        </p>
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
        </p>
      </motion.div>
    </Card>
  );
}
