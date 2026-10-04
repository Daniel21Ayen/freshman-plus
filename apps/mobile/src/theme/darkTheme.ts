import { colors } from '@freshman-plus/ui-tokens';
import { lightTheme, type AppTheme } from './lightTheme';

export const darkTheme: AppTheme = {
  ...lightTheme,
  dark: true,
  colors: {
    ...lightTheme.colors,
    background: colors.navy[900],
    card: colors.navy[800],
    header: colors.navy[700],
    text: colors.text.inverse,
    textSecondary: '#B7C4DD',
    textMuted: '#8A97B3',
    border: colors.navy[600],
  },
} as unknown as AppTheme;
