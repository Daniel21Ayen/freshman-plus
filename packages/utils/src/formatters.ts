/** 50 -> "ETB 50.00" (as on the Pay Now / Payment screens) */
export function formatETB(amount: number): string {
  return `ETB ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** 12546 -> "12,546" (admin dashboard stat cards) */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/** 1240 -> "1.2K", 256780 -> "256.8K" */
export function formatCompact(value: number): string {
  if (Math.abs(value) < 1000) return String(value);
  const units = ['K', 'M', 'B'];
  let n = value;
  let i = -1;
  while (Math.abs(n) >= 1000 && i < units.length - 1) {
    n /= 1000;
    i++;
  }
  return `${n.toFixed(1).replace(/\.0$/, '')}${units[i]}`;
}

/** "Ahmed Tesfaye" -> "AT" (avatar fallback) */
export function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('');
}
