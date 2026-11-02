/**
 * Animations: плавное движение. Главная техника — variants, stagger, whileInView и spring.
 */
import { Section } from '@/layout/Section';
import { StaggerCards } from '@/sections/animations/StaggerCards';

export default function AnimationsSection() {
  return (
    <Section
      id="animations"
      eyebrow="Animations"
      title="Движение, которое читается"
      description="Variants, stagger, whileInView и spring — без шума, с уважением к reduced-motion."
    >
      <StaggerCards />
    </Section>
  );
}
