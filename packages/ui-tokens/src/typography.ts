export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  /** CSS stack for the admin web portal */
  web: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans Ethiopic', sans-serif",
  /** Amharic content must render with a Ge'ez-capable font */
  amharic: "'Noto Sans Ethiopic', 'Abyssinica SIL', sans-serif",
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const;

export const typography = {
  h1: { fontSize: fontSize['3xl'], fontWeight: fontWeight.bold, lineHeight: 36 },
  h2: { fontSize: fontSize['2xl'], fontWeight: fontWeight.bold, lineHeight: 30 },
  h3: { fontSize: fontSize.xl, fontWeight: fontWeight.semibold, lineHeight: 26 },
  title: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, lineHeight: 22 },
  body: { fontSize: fontSize.base, fontWeight: fontWeight.regular, lineHeight: 20 },
  bodyStrong: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, lineHeight: 20 },
  caption: { fontSize: fontSize.sm, fontWeight: fontWeight.regular, lineHeight: 16 },
  label: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, lineHeight: 16 },
  button: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, lineHeight: 20 },
} as const;
