import React, { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { borderRadius, colors, layout } from '@freshman-plus/ui-tokens';
import { Text } from './Text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string | undefined;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, leftIcon, rightIcon, style, onFocus, onBlur, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      {label ? <Text variant="label" tone="secondary">{label}</Text> : null}
      <View
        style={{
          height: layout.controlHeight,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 14,
          borderRadius: borderRadius.md,
          borderWidth: 1,
          backgroundColor: colors.background.card,
          borderColor: error ? colors.danger.DEFAULT : focused ? colors.border.focus : colors.border.DEFAULT,
        }}
      >
        {leftIcon}
        <TextInput
          placeholderTextColor={colors.text.muted}
          style={[{ flex: 1, fontSize: 14, color: colors.text.primary }, style]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {rightIcon}
      </View>
      {error ? <Text variant="caption" tone="danger">{error}</Text> : null}
    </View>
  );
}
