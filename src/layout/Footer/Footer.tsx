/**
 * Footer: о проекте, GitHub, призыв к курсу.
 */
import { Github } from 'lucide-react';
import { Container } from '@/layout/Container';
import { COURSE_URL, GITHUB_URL, SITE_TAGLINE, SITE_TITLE } from '@/lib/constants';
import { Button } from '@/ui/Button';

export function Footer() {
  return (
    <footer id="course" className="border-t border-border py-16 md:py-20">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl">О проекте</h2>
          <p className="mt-3 text-muted">
            {SITE_TITLE} — учебная витрина: анимации, интерактив, эффекты и адаптивность в одном
            одностраничном сайте.
          </p>
          <p className="mt-3 text-sm text-muted">{SITE_TAGLINE}</p>
        </div>
        <div>
          <h2 className="font-display text-xl">Исходный код</h2>
          <a
            href={GITHUB_URL}
            className="mt-3 inline-flex items-center gap-2 text-accent-cyan transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={18} aria-hidden />
            GitHub
          </a>
        </div>
        <div>
          <h2 className="font-display text-xl">Хочешь научиться так же?</h2>
          <p className="mt-3 text-muted">Пройди курс по вайбкодингу и собери свой playground.</p>
          <Button href={COURSE_URL} className="mt-4 glow">
            Пройти курс
          </Button>
        </div>
      </Container>
      <Container>
        <p className="mt-12 text-sm text-muted">Сделано с Claude и Cursor · {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}
