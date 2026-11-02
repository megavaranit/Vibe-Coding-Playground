import type { ComponentType, LazyExoticComponent } from 'react';

export interface SectionConfig {
  id: string;
  navLabel: string;
  component: LazyExoticComponent<ComponentType>;
}
