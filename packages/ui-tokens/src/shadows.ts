/** React Native style objects. */
export const shadows = {
  none: {},
  sm: {
    shadowColor: '#0B3A75',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#0B3A75',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0B3A75',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

/** Equivalent CSS box-shadows for the admin portal (Tailwind theme.extend.boxShadow). */
export const cssShadows = {
  sm: '0 1px 3px rgba(11, 58, 117, 0.06)',
  md: '0 4px 10px rgba(11, 58, 117, 0.10)',
  lg: '0 10px 24px rgba(11, 58, 117, 0.14)',
} as const;
