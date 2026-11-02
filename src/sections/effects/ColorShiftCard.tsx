import { Card } from '@/ui/Card';

export function ColorShiftCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="color-shift-card group min-h-44 transition-transform duration-500 hover:-translate-y-1">
      <p className="font-mono text-[0.7rem] tracking-[0.18em] text-accent-amber uppercase transition-colors duration-500 group-hover:text-accent-pink">
        Shift
      </p>
      <h3 className="mt-3 font-display text-xl text-accent-violet transition-colors duration-500 group-hover:text-accent-cyan">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-text">
        {description}
      </p>
    </Card>
  );
}
