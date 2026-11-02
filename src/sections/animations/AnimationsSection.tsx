/**
 * Animations: плавное движение. Главная техника — variants, stagger, whileInView, spring и ScrollReveal.
 */
import { Section } from '@/layout/Section';
import { ScrollReveal } from '@/sections/animations/ScrollReveal';
import { StaggerCards } from '@/sections/animations/StaggerCards';
import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';

const revealSamples = [
  { direction: 'left' as const, label: 'from left', delay: 0 },
  { direction: 'up' as const, label: 'from bottom', delay: 0.08 },
  { direction: 'right' as const, label: 'from right', delay: 0.16 },
  { direction: 'scale' as const, label: 'scale in', delay: 0.24 },
];

export default function AnimationsSection() {
  return (
    <Section
      id="animations"
      eyebrow="Animations"
      title="Движение, которое читается"
      description="Variants, stagger, whileInView и spring — без шума, с уважением к reduced-motion."
    >
      <StaggerCards />

      <div className="mt-16">
        <p className="mb-6 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          ScrollReveal directions
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {revealSamples.map((sample) => (
            <ScrollReveal
              key={sample.label}
              direction={sample.direction}
              delay={sample.delay}
              parallax={sample.direction === 'up'}
            >
              <Card className="min-h-36">
                <Badge>{sample.direction}</Badge>
                <p className="mt-4 font-display text-lg">{sample.label}</p>
                <p className="mt-2 text-sm text-muted">once: true · ease [0.22, 1, 0.36, 1]</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
