/**
 * Animations: плавное движение. Главная техника — variants, stagger, whileInView, spring и ScrollReveal.
 */
import { Section } from '@/layout/Section';
import { ScrollReveal } from '@/sections/animations/ScrollReveal';
import { StaggerCards } from '@/sections/animations/StaggerCards';
import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';

const revealSamples = [
  { direction: 'left' as const, label: 'Слева', delay: 0, parallax: false },
  { direction: 'up' as const, label: 'Снизу', delay: 0.08, parallax: true },
  { direction: 'right' as const, label: 'Справа', delay: 0.16, parallax: false },
  { direction: 'scale' as const, label: 'Scale', delay: 0.24, parallax: false },
];

export default function AnimationsSection() {
  return (
    <Section
      id="animations"
      eyebrow="Animations"
      title="Движение, которое читается"
      description="Variants, stagger, whileInView, spring и ScrollReveal (direction / delay / once / parallax)."
    >
      <StaggerCards />

      <div className="mt-16">
        <p className="mb-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          ScrollReveal directions
        </p>
        <p className="mb-6 max-w-2xl text-sm text-muted">
          Один компонент — разные направления входа. У «снизу» включён лёгкий parallax.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {revealSamples.map((sample) => (
            <ScrollReveal
              key={sample.label}
              direction={sample.direction}
              delay={sample.delay}
              once
              parallax={sample.parallax}
            >
              <Card className="min-h-36">
                <Badge>{sample.direction}</Badge>
                <p className="mt-4 font-display text-lg">{sample.label}</p>
                <p className="mt-2 text-sm text-muted">
                  delay {sample.delay}s · once
                  {sample.parallax ? ' · parallax' : ''}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
