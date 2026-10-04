import React from 'react';
import { View, type ViewProps } from 'react-native';
import { colors, borderRadius, shadows } from '@freshman-plus/ui-tokens';

export interface BoxProps extends ViewProps {
  card?: boolean;
  radius?: keyof typeof borderRadius;
  shadow?: keyof typeof shadows;
}

/** `card` reproduces the white, softly-bordered cards used throughout the mobile designs. */
export function Box({ card, radius = 'lg', shadow = 'sm', style, ...rest }: BoxProps) {
  return (
    <View
      style={[
        card && {
          backgroundColor: colors.background.card,
          borderRadius: borderRadius[radius],
          borderWidth: 1,
          borderColor: colors.border.DEFAULT,
          ...shadows[shadow],
        },
        style,
      ]}
      {...rest}
    />
  );
}
