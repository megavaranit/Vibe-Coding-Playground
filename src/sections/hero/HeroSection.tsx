/**
 * Hero: first viewport — brand, headline, tagline, CTAs on an animated mesh field.
 * Main technique — composition of background / title / hint (без скролл-параллакса фона).
 */
import { Container } from '@/layout/Container';
import { Section } from '@/layout/Section';
import { AnimatedBackground } from '@/sections/hero/AnimatedBackground';
import { HeroTitle } from '@/sections/hero/HeroTitle';
import { ScrollHint } from '@/sections/hero/ScrollHint';

export default function HeroSection() {
  return (
    <div className="relative">
      <Section
        id="hero"
        withContainer={false}
        className="relative min-h-svh overflow-hidden pt-24 md:pt-28"
      >
        <div className="absolute inset-0">
          <AnimatedBackground />
        </div>
        <Container className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center pb-24">
          <HeroTitle />
        </Container>
        <ScrollHint />
      </Section>
    </div>
  );
}
