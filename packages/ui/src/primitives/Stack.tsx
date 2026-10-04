import React from 'react';
import { View, type ViewProps } from 'react-native';
import { spacing } from '@freshman-plus/ui-tokens';

export interface StackProps extends ViewProps {
  direction?: 'row' | 'column';
  gap?: keyof typeof spacing;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}

export function Stack({ direction = 'column', gap = 3, align, justify, style, ...rest }: StackProps) {
  return (
    <View
      style={[{ flexDirection: direction, gap: spacing[gap], alignItems: align, justifyContent: justify }, style]}
      {...rest}
    />
  );
}
