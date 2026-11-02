import { Card } from '@/ui/Card';

export function GlassCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="glass relative min-h-44 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-6 size-28 rounded-full blur-2xl"
        style={{ background: 'var(--accent-cyan)', opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-4 size-32 rounded-full blur-2xl"
        style={{ background: 'var(--accent-pink)', opacity: 0.4 }}
      />
      <div className="relative z-10">
        <p className="font-mono text-[0.7rem] tracking-[0.18em] text-accent-cyan uppercase">
          Glass
        </p>
        <h3 className="mt-3 font-display text-xl text-text">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </Card>
  );
}
