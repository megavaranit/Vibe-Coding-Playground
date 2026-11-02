/**
 * Hero title block: brand headline by words, tagline, CTAs.
 * Main technique — blur-stagger word reveal via motion presets.
 */
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GITHUB_URL, SITE_TAGLINE, SITE_TITLE } from '@/lib/constants';
import {
  fadeUp,
  fadeUpBlur,
  fadeUpBlurReduced,
  heroStaggerContainer,
} from '@/lib/motion';
import { Button } from '@/ui/Button';
import { GradientText } from '@/ui/GradientText';

export function HeroTitle() {
  const reduced = useReducedMotion();
  const wordVariant = reduced ? fadeUpBlurReduced : fadeUpBlur;
  const words = SITE_TITLE.split(' ');

  return (
    <motion.div
      variants={heroStaggerContainer}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-4xl pt-16 md:pt-24"
    >
      <motion.h1
        variants={heroStaggerContainer}
        className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-medium tracking-tight"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariant}
            className="mr-[0.28em] inline-block"
          >
            <GradientText gradient="var(--gradient-title)">{word}</GradientText>
          </motion.span>
        ))}
      </motion.h1>
      <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-muted md:text-xl">
        {SITE_TAGLINE}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
        <Button href="#animations" size="lg">
          Смотреть демо
        </Button>
        <Button href={GITHUB_URL} variant="glass" size="lg">
          GitHub
        </Button>
      </motion.div>
    </motion.div>
  );
}
