export function GradientBorderCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="gradient-border p-6">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-muted">{description}</p>
    </div>
  );
}
