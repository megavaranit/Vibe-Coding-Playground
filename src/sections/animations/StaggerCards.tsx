/**
 * StaggerCards: каскад карточек. Главная техника — staggerChildren 0.08.
 */
import { motion } from 'motion/react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { animationCards } from '@/sections/animations/animations.data';
import { HoverTiltCard } from '@/sections/animations/HoverTiltCard';
import { Badge } from '@/ui/Badge';

export function StaggerCards() {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {animationCards.map((card) => (
        <motion.div key={card.title} variants={fadeUp} className="h-full">
          <HoverTiltCard>
            <Badge>{card.tag}</Badge>
            <h3 className="mt-4 font-display text-xl">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
          </HoverTiltCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
