import type { PaymentProvider } from '@freshman-plus/constants';

/** Brand-tinted discs until the official provider logos are added to assets/. */
export const PROVIDER_STYLE: Record<PaymentProvider, { bg: string; glyph: string }> = {
  TELEBIRR: { bg: '#0B6BD6', glyph: 'T' },
  CBE_BIRR: { bg: '#F5A524', glyph: 'C' },
  MPESA: { bg: '#16A34A', glyph: 'M' },
  KACHA: { bg: '#6D4AE0', glyph: 'K' },
  YAYA: { bg: '#E5484D', glyph: 'Y' },
  CHAPA: { bg: '#7C3AED', glyph: 'C' },
};
