/**
 * Interactivity: «живой» сайт. Главная техника — отклик на клик и связанные контролы (конфетти, morph, slider/switch).
 */
import { useState } from 'react';
import { Section } from '@/layout/Section';
import { AnimatedSlider } from '@/sections/interactivity/AnimatedSlider';
import { AnimatedSwitch } from '@/sections/interactivity/AnimatedSwitch';
import { ConfettiButton } from '@/sections/interactivity/ConfettiButton';
import { LiveDemoPanel } from '@/sections/interactivity/LiveDemoPanel';
import { MorphButton } from '@/sections/interactivity/MorphButton';

export default function InteractivitySection() {
  const [intensity, setIntensity] = useState(42);
  const [glowEnabled, setGlowEnabled] = useState(true);

  return (
    <Section
      id="interactivity"
      eyebrow="Interactivity"
      title="Каждое действие видно"
      description="Кнопки, слайдер и переключатель управляют живым превью."
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <ConfettiButton />
            <MorphButton />
          </div>
          <AnimatedSlider value={intensity} onChange={setIntensity} />
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted">Свечение превью</span>
            <AnimatedSwitch checked={glowEnabled} onChange={setGlowEnabled} />
          </div>
        </div>
        <LiveDemoPanel intensity={intensity} glowEnabled={glowEnabled} />
      </div>
    </Section>
  );
}
