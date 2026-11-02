import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '@/hooks/useTheme';
import { springSoft } from '@/lib/motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface-2 text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={springSoft}
        className="inline-flex"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}
