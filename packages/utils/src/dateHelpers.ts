/** "2h ago", "3d ago" — used in admin Students → Last Active */
export function timeAgo(date: Date | string | number, now: Date = new Date()): string {
  const diff = Math.max(0, now.getTime() - new Date(date).getTime());
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return mo < 12 ? `${mo}mo ago` : `${Math.floor(mo / 12)}y ago`;
}

/** "2024/2025" */
export function academicYearLabel(startYear: number): string {
  return `${startYear}/${startYear + 1}`;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isExpired(expiresAt: Date | string | null | undefined, now: Date = new Date()): boolean {
  return expiresAt ? new Date(expiresAt).getTime() <= now.getTime() : false;
}

/** 2026-10-03 */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
