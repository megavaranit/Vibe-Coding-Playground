/**
 * DeviceSwitcher: сегментированный контроль с layoutId-подсветкой.
 */
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

const modes: { id: DeviceMode; label: string; hint: string }[] = [
  { id: 'desktop', label: 'Desktop', hint: '1024px' },
  { id: 'tablet', label: 'Tablet', hint: '768px' },
  { id: 'mobile', label: 'Mobile', hint: '375px' },
];

type DeviceSwitcherProps = {
  value: DeviceMode;
  onChange: (value: DeviceMode) => void;
};

export function DeviceSwitcher({ value, onChange }: DeviceSwitcherProps) {
  const reduced = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label="Режим устройства"
      className="relative inline-flex max-w-full flex-wrap rounded-[var(--radius-control)] border border-border bg-surface-2 p-1"
    >
      {modes.map((mode) => {
        const selected = value === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="device-frame"
            onClick={() => onChange(mode.id)}
            className={cn(
              'relative z-10 rounded-[calc(var(--radius-control)-4px)] px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet',
              selected ? 'text-text' : 'text-muted hover:text-text',
            )}
          >
            {selected ? (
              <motion.span
                layoutId={reduced ? undefined : 'device-switcher'}
                className="absolute inset-0 rounded-[calc(var(--radius-control)-4px)] bg-surface"
                transition={
                  reduced
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 380, damping: 32 }
                }
              />
            ) : null}
            <span className="relative z-10 inline-flex flex-col items-start leading-tight sm:flex-row sm:items-center sm:gap-2">
              <span>{mode.label}</span>
              <span className="font-mono text-[0.65rem] text-muted">{mode.hint}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
