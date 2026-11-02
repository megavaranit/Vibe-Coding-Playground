/**
 * AnimatedSlider: интенсивность для LiveDemoPanel.
 */
type AnimatedSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export function AnimatedSlider({ value, onChange }: AnimatedSliderProps) {
  return (
    <label className="block">
      <span className="mb-3 flex justify-between text-sm text-muted">
        Сила орба
        <span className="font-mono text-text tabular-nums">{value}</span>
      </span>
      <div className="relative h-10">
        <div
          className="absolute top-1/2 right-0 left-0 h-2 -translate-y-1/2 rounded-full bg-surface-2"
          aria-hidden
        />
        <div
          className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full"
          style={{
            width: `${value}%`,
            backgroundImage: 'var(--gradient-main)',
          }}
          aria-hidden
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-label="Сила орба в превью"
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 w-full cursor-pointer appearance-none bg-transparent accent-[var(--accent-violet)]"
        />
      </div>
    </label>
  );
}
