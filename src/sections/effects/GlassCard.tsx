import { Card } from '@/ui/Card';

export function GlassCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="glass">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-muted">{description}</p>
    </Card>
  );
}
