import { borderRadius, colors, layout, shadows, spacing, typography } from '@freshman-plus/ui-tokens';

export const lightTheme = {
  dark: false,
  colors: {
    background: colors.background.app,
    card: colors.background.card,
    header: colors.primary[500],
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    textMuted: colors.text.muted,
    border: colors.border.DEFAULT,
    primary: colors.primary[500],
    success: colors.success.DEFAULT,
    warning: colors.warning.DEFAULT,
    danger: colors.danger.DEFAULT,
  },
  spacing,
  layout,
  radius: borderRadius,
  shadows,
  typography,
} as const;

export type AppTheme = typeof lightTheme;
