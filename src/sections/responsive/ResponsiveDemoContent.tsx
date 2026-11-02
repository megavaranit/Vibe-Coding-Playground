/**
 * ResponsiveDemoContent: демо внутри DeviceFrame на container queries.
 */
export function ResponsiveDemoContent() {
  return (
    <div className="p-5 [@container(min-width:768px)]:p-8">
      <p className="font-mono text-xs tracking-[0.2em] text-accent-cyan uppercase">
        Container queries
      </p>
      <h3 className="mt-2 font-display text-2xl [@container(min-width:768px)]:text-3xl">
        Контент смотрит на рамку, не на окно
      </h3>
      <p className="mt-3 max-w-prose text-sm text-muted [@container(min-width:768px)]:text-base">
        Desktop / tablet / mobile меняют ширину контейнера. Сетка и типографика внутри
        перестраиваются через{' '}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-accent-lime">
          @container
        </code>
        .
      </p>

      <div className="mt-6 grid gap-3 [@container(min-width:768px)]:grid-cols-2 [@container(min-width:1024px)]:grid-cols-3">
        {[
          { title: 'Hero', note: 'Полная ширина' },
          { title: 'Cards', note: '2–3 колонки' },
          { title: 'CTA', note: 'Компактный блок' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[var(--radius-control)] border border-border bg-surface-2 p-4"
          >
            <p className="font-display text-lg">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 hidden rounded-[var(--radius-control)] border border-dashed border-border p-4 text-sm text-muted [@container(min-width:1024px)]:block">
        Desktop-only заметка: на ширине ≥ 1024px внутри рамки появляется этот блок.
      </div>
    </div>
  );
}
