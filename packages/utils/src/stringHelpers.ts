export function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, Math.max(0, max - 1))}…`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Masks an account number for logs: 1000 1234 5678 -> •••• •••• 5678 */
export function maskAccount(value: string): string {
  const digits = value.replace(/\s+/g, '');
  return digits.length <= 4 ? digits : `${'•'.repeat(digits.length - 4)}${digits.slice(-4)}`;
}

/** Normalises Ethiopian phone numbers to +2519XXXXXXXX / +2517XXXXXXXX. */
export function normalizeEthiopianPhone(input: string): string | null {
  const digits = input.replace(/[\s-]/g, '');
  const m = /^(?:\+251|251|0)?([79]\d{8})$/.exec(digits);
  return m ? `+251${m[1]}` : null;
}
