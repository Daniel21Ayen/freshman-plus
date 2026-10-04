// /**
//  * Freshman+ colour tokens.
//  * Sampled directly from the approved designs:
//  *  - Mobile primary button / links  -> #0067F1
//  *  - Splash gradient                -> #003680 → #0B5FA8
//  *  - Admin header / sidebar / page  -> #083164 / #05284F / #031737
//  */
// export const colors = {
//   primary: {
//     50: '#EAF2FF',
//     100: '#D6E6FE',
//     200: '#ADCDFD',
//     300: '#7FB0FB',
//     400: '#3F86F6',
//     500: '#0067F1',
//     600: '#0058D0',
//     700: '#004BB0',
//     800: '#003680',
//     900: '#00265A',
//     DEFAULT: '#0067F1',
//   },
//   navy: {
//     600: '#0B3A75',
//     700: '#083164',
//     800: '#05284F',
//     900: '#031737',
//     DEFAULT: '#05284F',
//   },
//   success: { DEFAULT: '#22C55E', light: '#E8F8EF', dark: '#15803D' },
//   warning: { DEFAULT: '#F59E0B', light: '#FFF3CF', dark: '#B45309' },
//   danger: { DEFAULT: '#EF4444', light: '#FDECEC', dark: '#B91C1C' },
//   info: { DEFAULT: '#0067F1', light: '#EAF2FF', dark: '#004BB0' },
//   accent: {
//     orange: '#F59E0B',
//     purple: '#7C5CFA',
//     pink: '#EC4899',
//     teal: '#14B8A6',
//     green: '#22C55E',
//     blue: '#0067F1',
//   },
//   background: {
//     app: '#F5F8FD',
//     card: '#FFFFFF',
//     subtle: '#EAF2FF',
//     inverse: '#031737',
//   },
//   text: {
//     primary: '#0F2347',
//     secondary: '#5B6B8C',
//     muted: '#8A97B3',
//     inverse: '#FFFFFF',
//     link: '#0067F1',
//   },
//   border: {
//     DEFAULT: '#DAE3F6',
//     strong: '#C0CDE3',
//     focus: '#0067F1',
//   },
//   /** [from, to] — use with LinearGradient on mobile / bg-gradient on web */
//   gradients: {
//     splash: ['#003680', '#0B5FA8'],
//     header: ['#0B67D8', '#0067F1'],
//     premium: ['#0063A8', '#14B8A6'],
//     adminHeader: ['#083164', '#05284F'],
//   },
//   /** Icon-tile tints used on Course Menu / Content Management cards */
//   contentType: {
//     AMHARIC_NOTE: { fg: '#22C55E', bg: '#E8F8EF' },
//     NOTE: { fg: '#0EA5E9', bg: '#E0F2FE' },
//     QUIZ: { fg: '#22C55E', bg: '#E8F8EF' },
//     PAST_EXAM: { fg: '#F59E0B', bg: '#FFF3CF' },
//     TEST: { fg: '#14B8A6', bg: '#DDF7F3' },
//     MATERIAL: { fg: '#EC4899', bg: '#FDE7F3' },
//   },
// } as const;

// export type Colors = typeof colors;

/**
 * Freshman+ colour tokens.
 * Sampled directly from the approved designs:
 *  - Mobile primary button / links  -> #0067F1
 *  - Splash gradient                -> #003680 → #0B5FA8
 *  - Admin header / sidebar / page  -> #083164 / #05284F / #031737
 */
export const colors = {
  primary: {
    50: '#EAF2FF',
    100: '#D6E6FE',
    200: '#ADCDFD',
    300: '#7FB0FB',
    400: '#3F86F6',
    500: '#0067F1',
    600: '#0058D0',
    700: '#004BB0',
    800: '#003680',
    900: '#00265A',
    DEFAULT: '#0067F1',
  },
  navy: {
    600: '#0B3A75',
    700: '#083164',
    800: '#05284F',
    900: '#031737',
    DEFAULT: '#05284F',
  },
  success: { DEFAULT: '#22C55E', light: '#E8F8EF', dark: '#15803D' },
  warning: { DEFAULT: '#F59E0B', light: '#FFF3CF', dark: '#B45309' },
  danger: { DEFAULT: '#EF4444', light: '#FDECEC', dark: '#B91C1C' },
  info: { DEFAULT: '#0067F1', light: '#EAF2FF', dark: '#004BB0' },
  accent: {
    orange: '#F59E0B',
    purple: '#7C5CFA',
    pink: '#EC4899',
    teal: '#14B8A6',
    green: '#22C55E',
    blue: '#0067F1',
  },
  background: {
    app: '#F5F8FD',
    card: '#FFFFFF',
    subtle: '#EAF2FF',
    inverse: '#031737',
  },
  text: {
    primary: '#0F2347',
    secondary: '#5B6B8C',
    muted: '#8A97B3',
    inverse: '#FFFFFF',
    link: '#0067F1',
  },
  border: {
    DEFAULT: '#DAE3F6',
    strong: '#C0CDE3',
    focus: '#0067F1',
  },
  /** [from, to] — use with LinearGradient on mobile / bg-gradient on web */
  gradients: {
    splash: ['#003680', '#0B5FA8'],
    header: ['#0B67D8', '#0067F1'],
    premium: ['#0063A8', '#14B8A6'],
    adminHeader: ['#083164', '#05284F'],
  },
  /** Icon-tile tints used on Course Menu / Content Management cards */
  contentType: {
    AMHARIC_NOTE: { fg: '#22C55E', bg: '#E8F8EF' },
    NOTE: { fg: '#0EA5E9', bg: '#E0F2FE' },
    QUIZ: { fg: '#22C55E', bg: '#E8F8EF' },
    PAST_EXAM: { fg: '#F59E0B', bg: '#FFF3CF' },
    TEST: { fg: '#14B8A6', bg: '#DDF7F3' },
    MATERIAL: { fg: '#EC4899', bg: '#FDE7F3' },
  },
} as const;

export type Colors = typeof colors;
