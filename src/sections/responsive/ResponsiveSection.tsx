/**
 * Responsive Design: адаптивность. Главная техника — переключатель устройств и container queries внутри рамки.
 */
import { useState } from 'react';
import { Section } from '@/layout/Section';
import { DeviceFrame } from '@/sections/responsive/DeviceFrame';
import { DeviceSwitcher, type DeviceMode } from '@/sections/responsive/DeviceSwitcher';
import { ResponsiveDemoContent } from '@/sections/responsive/ResponsiveDemoContent';

export default function ResponsiveSection() {
  const [mode, setMode] = useState<DeviceMode>('desktop');

  return (
    <Section
      id="responsive"
      eyebrow="Responsive"
      title="Одна вёрстка — три ширины"
      description="Рамка анимирует ширину, контент внутри живёт на container queries."
    >
      <div className="mb-8">
        <DeviceSwitcher value={mode} onChange={setMode} />
      </div>
      <DeviceFrame mode={mode}>
        <ResponsiveDemoContent />
      </DeviceFrame>
    </Section>
  );
}
