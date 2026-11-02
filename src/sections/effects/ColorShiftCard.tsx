import { Card } from '@/ui/Card';

export function ColorShiftCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="transition-colors duration-[400ms] hover:text-accent-pink">
      <h3 className="font-display text-xl text-accent-violet transition-colors duration-[400ms] hover:text-accent-cyan">
        {title}
      </h3>
      <p className="mt-2 text-muted">{description}</p>
    </Card>
  );
}
