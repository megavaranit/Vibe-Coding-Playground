/**
 * Animations: плавное движение. Главная техника — variants, stagger, whileInView и spring.
 */
import { Section } from '@/layout/Section';
import { ScrollReveal } from '@/sections/animations/ScrollReveal';
import { StaggerCards } from '@/sections/animations/StaggerCards';

export default function AnimationsSection() {
  return (
    <Section
      id="animations"
      eyebrow="Animations"
      title="Движение, которое читается"
      description="Что здесь показано: variants, stagger, whileInView, spring."
    >
      <ScrollReveal>
        <StaggerCards />
      </ScrollReveal>
    </Section>
  );
}
