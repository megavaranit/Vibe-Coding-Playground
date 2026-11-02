/**
 * Visual Effects: модный визуал. Главная техника — glass, glow, gradient-border и смена акцента.
 */
import { Section } from '@/layout/Section';
import { ColorShiftCard } from '@/sections/effects/ColorShiftCard';
import { effectCards } from '@/sections/effects/effects.data';
import { GlassCard } from '@/sections/effects/GlassCard';
import { GlowCard } from '@/sections/effects/GlowCard';
import { GradientBorderCard } from '@/sections/effects/GradientBorderCard';

export default function EffectsSection() {
  const [glass, glow, gradient, shift] = effectCards;

  return (
    <Section
      id="effects"
      eyebrow="Visual Effects"
      title="Стекло, свет и градиенты"
      description="Эффекты собраны классами из effects.css — без копипасты из файла в файл."
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -top-10 left-10 size-40 rounded-full blur-3xl"
          style={{ background: 'var(--accent-violet)', opacity: 0.35 }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-20 right-8 size-48 rounded-full blur-3xl"
          style={{ background: 'var(--accent-cyan)', opacity: 0.28 }}
          aria-hidden
        />
        <div className="relative grid gap-4 sm:grid-cols-2">
          <GlassCard title={glass.title} description={glass.description} />
          <GlowCard title={glow.title} description={glow.description} />
          <GradientBorderCard title={gradient.title} description={gradient.description} />
          <ColorShiftCard title={shift.title} description={shift.description} />
        </div>
      </div>
    </Section>
  );
}
