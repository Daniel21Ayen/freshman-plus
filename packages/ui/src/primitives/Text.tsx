import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { colors, typography } from '@freshman-plus/ui-tokens';

export interface TextProps extends RNTextProps {
  variant?: keyof typeof typography;
  tone?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'link' | 'danger' | 'success';
}

const toneColor = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  inverse: colors.text.inverse,
  link: colors.text.link,
  danger: colors.danger.DEFAULT,
  success: colors.success.DEFAULT,
} as const;

export function Text({ variant = 'body', tone = 'primary', style, ...rest }: TextProps) {
  return <RNText style={[typography[variant], { color: toneColor[tone] }, style]} {...rest} />;
}
