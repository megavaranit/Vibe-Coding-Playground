import { Card } from '@/ui/Card';

export function GlowCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="glow transition-shadow duration-500 hover:shadow-[var(--glow)]">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-muted">{description}</p>
    </Card>
  );
}
