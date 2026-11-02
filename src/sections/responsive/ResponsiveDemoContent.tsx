export function ResponsiveDemoContent() {
  return (
    <div className="p-6 [@container(min-width:768px)]:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">Demo</p>
      <h3 className="mt-2 font-display text-2xl [@container(min-width:768px)]:text-3xl">
        Контент смотрит на рамку, не на окно
      </h3>
      <p className="mt-3 text-muted">
        Переключение desktop / tablet / mobile меняет ширину контейнера. Сетка внутри
        перестраивается через container queries.
      </p>
      <div className="mt-6 grid gap-3 [@container(min-width:768px)]:grid-cols-2 [@container(min-width:1024px)]:grid-cols-3">
        {['Hero', 'Cards', 'CTA'].map((item) => (
          <div key={item} className="rounded-[var(--radius-control)] bg-surface-2 p-4">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
