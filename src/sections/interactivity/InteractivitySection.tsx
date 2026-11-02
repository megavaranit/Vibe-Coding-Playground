/**
 * Interactivity: «живой» сайт. Главная техника — отклик на клик и связанные контролы.
 */
import { motion } from 'motion/react';
import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/layout/Section';
import { easeOutExpo, viewportOnce } from '@/lib/motion';
import { AnimatedSlider } from '@/sections/interactivity/AnimatedSlider';
import { AnimatedSwitch } from '@/sections/interactivity/AnimatedSwitch';
import { ConfettiButton } from '@/sections/interactivity/ConfettiButton';
import { LiveDemoPanel } from '@/sections/interactivity/LiveDemoPanel';
import { MorphButton } from '@/sections/interactivity/MorphButton';

export default function InteractivitySection() {
  const [intensity, setIntensity] = useState(42);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const reduced = useReducedMotion();

  return (
    <Section
      id="interactivity"
      eyebrow="Interactivity"
      title="Каждое действие видно"
      description="Кнопки, слайдер и переключатель управляют одним превью — состояние держит секция."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface/40 p-6"
        >
          <div className="flex flex-wrap gap-3">
            <ConfettiButton />
            <MorphButton />
          </div>
          <AnimatedSlider value={intensity} onChange={setIntensity} />
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted">Свечение превью</span>
            <AnimatedSwitch
              checked={glowEnabled}
              onChange={setGlowEnabled}
              label="Свечение превью"
            />
          </div>
        </motion.div>
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
        >
          <LiveDemoPanel intensity={intensity} glowEnabled={glowEnabled} />
        </motion.div>
      </div>
    </Section>
  );
}
