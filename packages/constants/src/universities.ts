/** Universities shown in the designs. Used for seeding & offline fallbacks. */
export const SEED_UNIVERSITIES = [
  { name: 'Addis Ababa University', abbreviation: 'AAU' },
  { name: 'Haramaya University', abbreviation: 'HU' },
  { name: 'Mekelle University', abbreviation: 'MU' },
  { name: 'Bahir Dar University', abbreviation: 'BDU' },
  { name: 'Jimma University', abbreviation: 'JU' },
  { name: 'Wollo University', abbreviation: 'WU' },
] as const;

/** Payment providers shown on the Payment screen & Admin → Payment Methods. */
export const PAYMENT_PROVIDER = {
  TELEBIRR: 'TELEBIRR',
  CBE_BIRR: 'CBE_BIRR',
  MPESA: 'MPESA',
  KACHA: 'KACHA',
  YAYA: 'YAYA',
  CHAPA: 'CHAPA',
} as const;
export type PaymentProvider = (typeof PAYMENT_PROVIDER)[keyof typeof PAYMENT_PROVIDER];

export const PAYMENT_PROVIDER_LABEL: Record<PaymentProvider, string> = {
  TELEBIRR: 'Telebirr',
  CBE_BIRR: 'CBE Birr',
  MPESA: 'M-PESA',
  KACHA: 'Kacha',
  YAYA: 'Yaya',
  CHAPA: 'Chapa',
};

export const SCREENSHOT_MAX_BYTES = 5 * 1024 * 1024;
export const SCREENSHOT_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
