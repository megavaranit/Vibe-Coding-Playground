import { Card } from '@/ui/Card';

export function GlassCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="glass min-h-44 transition-transform duration-300 hover:-translate-y-1">
      <p className="font-mono text-[0.7rem] tracking-[0.18em] text-accent-cyan uppercase">Glass</p>
      <h3 className="mt-3 font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </Card>
  );
}
