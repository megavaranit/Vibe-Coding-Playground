import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedBackground() {
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();
  const offsetX = reduced ? 0 : (x - 0.5) * 24;
  const offsetY = reduced ? 0 : (y - 0.5) * 24;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-24 -left-16 size-[28rem] rounded-full blur-3xl"
        style={{
          background: 'var(--accent-violet)',
          opacity: 0.35,
          transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
        }}
      />
      <div
        className="absolute top-20 right-0 size-[22rem] rounded-full blur-3xl"
        style={{
          background: 'var(--accent-cyan)',
          opacity: 0.28,
          transform: `translate3d(${-offsetX}px, ${offsetY}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 size-[20rem] rounded-full blur-3xl"
        style={{
          background: 'var(--accent-pink)',
          opacity: 0.22,
          transform: `translate3d(${offsetX}px, ${-offsetY}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: 'url(/noise.svg)' }}
      />
    </div>
  );
}
