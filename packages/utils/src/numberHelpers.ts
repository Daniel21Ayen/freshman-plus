export const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

export function percent(part: number, total: number, digits = 0): number {
  if (total <= 0) return 0;
  return Number(((part / total) * 100).toFixed(digits));
}

export function sum(values: readonly number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
