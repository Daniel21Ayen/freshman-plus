import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import { borderRadius, colors, cssShadows, fontFamily, layout } from '@freshman-plus/ui-tokens';

/** Everything below comes from @freshman-plus/ui-tokens so web and mobile never drift. */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        navy: colors.navy,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
        info: colors.info,
        accent: colors.accent,
        surface: { app: colors.background.app, card: colors.background.card, subtle: colors.background.subtle },
        ink: colors.text,
        line: colors.border,
      },
      borderRadius: Object.fromEntries(Object.entries(borderRadius).map(([k, v]) => [k, `${v}px`])),
      boxShadow: cssShadows,
      fontFamily: { sans: [fontFamily.web] },
      width: { sidebar: `${layout.adminSidebarWidth}px` },
      height: { header: `${layout.adminHeaderHeight}px` },
      backgroundImage: {
        'admin-header': `linear-gradient(90deg, ${colors.gradients.adminHeader[0]}, ${colors.gradients.adminHeader[1]})`,
      },
    },
  },
  plugins: [animate],
};

export default config;
