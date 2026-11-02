/**
 * Visual Effects: модный визуал. Главная техника — glass, glow, gradient-border и смена акцента.
 */
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/layout/Section';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { ColorShiftCard } from '@/sections/effects/ColorShiftCard';
import { effectCards } from '@/sections/effects/effects.data';
import { GlassCard } from '@/sections/effects/GlassCard';
import { GlowCard } from '@/sections/effects/GlowCard';
import { GradientBorderCard } from '@/sections/effects/GradientBorderCard';

export default function EffectsSection() {
  const [glass, glow, gradient, shift] = effectCards;
  const reduced = useReducedMotion();

  const cards: { id: string; node: ReactNode }[] = [
    { id: glass.id, node: <GlassCard title={glass.title} description={glass.description} /> },
    { id: glow.id, node: <GlowCard title={glow.title} description={glow.description} /> },
    {
      id: gradient.id,
      node: <GradientBorderCard title={gradient.title} description={gradient.description} />,
    },
    { id: shift.id, node: <ColorShiftCard title={shift.title} description={shift.description} /> },
  ];

  return (
    <Section
      id="effects"
      eyebrow="Visual Effects"
      title="Стекло, свет и градиенты"
      description="Эффекты собраны классами из effects.css — без копипасты из файла в файл."
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -top-10 left-10 size-44 rounded-full blur-3xl"
          style={{ background: 'var(--accent-violet)', opacity: 0.32 }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-24 right-6 size-52 rounded-full blur-3xl"
          style={{ background: 'var(--accent-cyan)', opacity: 0.24 }}
          aria-hidden
        />
        <motion.div
          className="relative grid gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={reduced ? undefined : fadeUp}
              className="h-full"
            >
              {card.node}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
