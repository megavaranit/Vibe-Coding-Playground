import { motion } from 'motion/react';
import type { ReactNode } from 'react';
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
  return (
    <motion.div
      layout
      className="mx-auto max-w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface"
      animate={{ width: Math.min(widths[mode], 1024) }}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      style={{ containerType: 'inline-size' }}
    >
      {children}
    </motion.div>
  );
}
