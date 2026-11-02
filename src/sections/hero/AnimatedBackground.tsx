/**
 * Hero background: soft mesh blobs, grid and grain. Main technique — CSS mesh-drift keyframes + mouse parallax.
 * Cool violet/cyan only — title uses warm lime/amber gradient for contrast.
 */
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export function AnimatedBackground() {
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();
  const offsetX = reduced ? 0 : (x - 0.5) * 24;
  const offsetY = reduced ? 0 : (y - 0.5) * 24;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
        }}
      >
        <div
          className={cn(
            'mesh-blob mesh-blob--a absolute -top-28 -left-20 size-[30rem] rounded-full blur-3xl',
          )}
          style={{ background: 'var(--accent-violet)', opacity: 0.28 }}
        />
        <div
          className={cn(
            'mesh-blob mesh-blob--b absolute top-16 -right-16 size-[26rem] rounded-full blur-3xl',
          )}
          style={{ background: 'var(--accent-cyan)', opacity: 0.22 }}
        />
        <div
          className={cn(
            'mesh-blob mesh-blob--c absolute -bottom-10 left-[40%] size-[24rem] rounded-full blur-3xl',
          )}
          style={{
            background: 'color-mix(in srgb, var(--accent-violet) 55%, var(--accent-cyan))',
            opacity: 0.18,
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: 'url(/noise.svg)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, color-mix(in srgb, var(--bg) 85%, transparent) 100%)',
        }}
      />
    </div>
  );
}
