import { Card } from '@/ui/Card';

type LiveDemoPanelProps = {
  intensity: number;
  glowEnabled: boolean;
};

export function LiveDemoPanel({ intensity, glowEnabled }: LiveDemoPanelProps) {
  const radius = 8 + intensity * 0.16;
  const blur = intensity * 0.12;

  return (
    <Card
      className={glowEnabled ? 'glow' : undefined}
      style={{
        borderRadius: `${radius}px`,
        filter: `blur(${blur * 0.02}px)`,
      }}
    >
      <p className="font-display text-xl">Живое превью</p>
      <p className="mt-2 text-muted">
        Слайдер меняет радиус, переключатель включает свечение. Сайт отвечает сразу.
      </p>
    </Card>
  );
}
