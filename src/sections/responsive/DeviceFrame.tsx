/**
 * DeviceFrame: анимируемая рамка 1024 / 768 / 375 (layout width — исключение из правил motion).
 */
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { DeviceMode } from '@/sections/responsive/DeviceSwitcher';

const widths: Record<DeviceMode, number> = {
  desktop: 1024,
  tablet: 768,
  mobile: 375,
};

export function DeviceFrame({
  mode,
  children,
}: {
  mode: DeviceMode;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const width = Math.min(widths[mode], 1024);

  return (
    <div className="mx-auto w-full max-w-full overflow-x-auto pb-2">
      <motion.div
        id="device-frame"
        role="tabpanel"
        layout={!reduced}
        className="mx-auto overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--glow)]"
        animate={{ width }}
        transition={
          reduced
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 180, damping: 26 }
        }
        style={{ containerType: 'inline-size', maxWidth: '100%' }}
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-3 py-2">
          <span className="size-2.5 rounded-full bg-accent-pink/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-accent-amber/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-accent-lime/80" aria-hidden />
          <span className="ml-3 font-mono text-[0.65rem] text-muted">{widths[mode]}px</span>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
