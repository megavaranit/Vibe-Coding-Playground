import { Github } from 'lucide-react';
import { Container } from '@/layout/Container';
import { COURSE_URL, GITHUB_URL, SITE_TITLE } from '@/lib/constants';
import { Button } from '@/ui/Button';

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl">О проекте</h2>
          <p className="mt-3 text-muted">
            {SITE_TITLE} — учебная витрина: анимации, интерактив, эффекты и адаптивность в одном
            одностраничном сайте.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl">Исходный код</h2>
          <a
            href={GITHUB_URL}
            className="mt-3 inline-flex items-center gap-2 text-accent-cyan hover:underline"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
        <div>
          <h2 className="font-display text-xl">Хочешь научиться так же?</h2>
          <p className="mt-3 text-muted">Пройди курс по вайбкодингу.</p>
          <Button href={COURSE_URL} className="mt-4 glow">
            Пройти курс
          </Button>
        </div>
      </Container>
      <Container>
        <p className="mt-12 text-sm text-muted">Сделано с Claude и Cursor</p>
      </Container>
    </footer>
  );
}
