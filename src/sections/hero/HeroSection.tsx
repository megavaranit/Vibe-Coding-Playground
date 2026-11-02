/**
 * Hero: first viewport — brand, one headline, tagline, CTAs on an animated mesh field.
 * Main technique — scroll parallax (transform) + composition of background / title / hint.
 */
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/layout/Container';
import { Section } from '@/layout/Section';
import { AnimatedBackground } from '@/sections/hero/AnimatedBackground';
import { HeroTitle } from '@/sections/hero/HeroTitle';
import { ScrollHint } from '@/sections/hero/ScrollHint';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 140]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], reduced ? [1, 1] : [1, 0.15]);

  return (
    <div ref={ref} className="relative">
      <Section
        id="hero"
        withContainer={false}
        className="relative min-h-svh overflow-hidden pt-24 md:pt-28"
      >
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <AnimatedBackground />
        </motion.div>
        <Container className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center pb-24">
          <motion.div style={{ y: titleY, opacity: titleOpacity }}>
            <HeroTitle />
          </motion.div>
        </Container>
        <ScrollHint />
      </Section>
    </div>
  );
}
