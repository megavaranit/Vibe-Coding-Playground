import { lazy } from 'react';
import type { SectionConfig } from '@/types/section';

export const sections: SectionConfig[] = [
  {
    id: 'hero',
    navLabel: 'Главная',
    component: lazy(() => import('@/sections/hero/HeroSection')),
  },
  {
    id: 'animations',
    navLabel: 'Animations',
    component: lazy(() => import('@/sections/animations/AnimationsSection')),
  },
  {
    id: 'interactivity',
    navLabel: 'Interactivity',
    component: lazy(() => import('@/sections/interactivity/InteractivitySection')),
  },
  {
    id: 'effects',
    navLabel: 'Visual Effects',
    component: lazy(() => import('@/sections/effects/EffectsSection')),
  },
  {
    id: 'responsive',
    navLabel: 'Responsive',
    component: lazy(() => import('@/sections/responsive/ResponsiveSection')),
  },
  {
    id: 'leads',
    navLabel: 'Заявка',
    component: lazy(() => import('@/sections/leads/LeadFormSection')),
  },
];
