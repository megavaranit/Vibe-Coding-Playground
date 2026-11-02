type AnimatedSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export function AnimatedSlider({ value, onChange }: AnimatedSliderProps) {
  return (
    <label className="block">
      <span className="mb-2 flex justify-between text-sm text-muted">
        Интенсивность
        <span className="font-mono text-text">{value}</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-accent-violet"
      />
    </label>
  );
}
