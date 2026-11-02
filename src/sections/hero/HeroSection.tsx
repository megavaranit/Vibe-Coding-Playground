/**
 * Hero: первое впечатление. Главная техника — mesh-gradient фон, parallax и stagger-появление заголовка.
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
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 160]);

  return (
    <div ref={ref} className="relative">
      <Section id="hero" withContainer={false} className="relative min-h-screen overflow-hidden pt-28">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <AnimatedBackground />
        </motion.div>
        <Container className="relative">
          <motion.div style={{ y: titleY }}>
            <HeroTitle />
          </motion.div>
        </Container>
        <ScrollHint />
      </Section>
    </div>
  );
}
