import { motion } from 'motion/react';
import { cn } from '@/lib/cn';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

const modes: { id: DeviceMode; label: string }[] = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'mobile', label: 'Mobile' },
];

type DeviceSwitcherProps = {
  value: DeviceMode;
  onChange: (value: DeviceMode) => void;
};

export function DeviceSwitcher({ value, onChange }: DeviceSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Режим устройства"
      className="relative inline-flex rounded-[var(--radius-control)] border border-border bg-surface-2 p-1"
    >
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          role="tab"
          aria-selected={value === mode.id}
          onClick={() => onChange(mode.id)}
          className={cn(
            'relative z-10 rounded-[calc(var(--radius-control)-4px)] px-4 py-2 text-sm',
            value === mode.id ? 'text-text' : 'text-muted',
          )}
        >
          {value === mode.id ? (
            <motion.span
              layoutId="device-switcher"
              className="absolute inset-0 rounded-[calc(var(--radius-control)-4px)] bg-surface"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          ) : null}
          <span className="relative z-10">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
