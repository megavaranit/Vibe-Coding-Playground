import { useEffect, useState } from 'react';
import { sections } from '@/app/sections.config';
import { cn } from '@/lib/cn';

type NavLinksProps = {
  onNavigate?: () => void;
  className?: string;
};

export function NavLinks({ onNavigate, className }: NavLinksProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Навигация по секциям" className={className}>
      <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={onNavigate}
              className={cn(
                'rounded-sm text-sm transition-colors duration-300 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-violet',
                activeId === section.id ? 'text-text' : 'text-muted',
              )}
              aria-current={activeId === section.id ? 'true' : undefined}
            >
              {section.navLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
