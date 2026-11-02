import { motion } from 'motion/react';
import { GITHUB_URL, SITE_TAGLINE, SITE_TITLE } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { Button } from '@/ui/Button';
import { GradientText } from '@/ui/GradientText';

export function HeroTitle() {
  const words = SITE_TITLE.split(' ');

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-4xl pt-24"
    >
      <motion.h1
        variants={staggerContainer}
        className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-medium"
      >
        {words.map((word) => (
          <motion.span key={word} variants={fadeUp} className="mr-[0.3em] inline-block">
            <GradientText>{word}</GradientText>
          </motion.span>
        ))}
      </motion.h1>
      <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-muted">
        {SITE_TAGLINE}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
        <Button href="#animations">Смотреть демо</Button>
        <Button href={GITHUB_URL} variant="glass">
          GitHub
        </Button>
      </motion.div>
    </motion.div>
  );
}
