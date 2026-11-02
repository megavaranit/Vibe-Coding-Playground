import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/layout/Container';
import { NavLinks } from '@/layout/Header/NavLinks';
import { ThemeToggle } from '@/layout/Header/ThemeToggle';
import { SITE_TITLE } from '@/lib/constants';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="glass fixed top-0 right-0 left-0 z-40 border-b border-border transition-transform duration-500"
      style={{ transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#hero" className="font-display text-sm font-medium tracking-wide">
          {SITE_TITLE}
        </a>
        <NavLinks className="hidden md:block" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-border md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>
      {menuOpen ? (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <NavLinks onNavigate={() => setMenuOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
