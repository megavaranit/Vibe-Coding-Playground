function resolvePalette(): string[] {
  const styles = getComputedStyle(document.documentElement);
  return [
    styles.getPropertyValue('--accent-violet').trim(),
    styles.getPropertyValue('--accent-cyan').trim(),
    styles.getPropertyValue('--accent-pink').trim(),
    styles.getPropertyValue('--accent-lime').trim(),
    styles.getPropertyValue('--accent-amber').trim(),
  ].filter(Boolean);
}

export async function fireConfetti(origin: { x: number; y: number }) {
  const confetti = (await import('canvas-confetti')).default;
  await confetti({
    particleCount: 80,
    spread: 70,
    origin,
    colors: resolvePalette(),
  });
}
