import React, { type ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import { borderRadius, colors, layout, typography } from '@freshman-plus/ui-tokens';
import { Text } from './Text';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  loading?: boolean;
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  leftSlot?: ReactNode;
}

/** Primary = solid #0067F1 pill-rounded button ("Login", "Pay Now", "Proceed to Pay"). */
export function Button({ label, variant = 'primary', loading, fullWidth = true, leftSlot, disabled, style, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const bg = isPrimary ? colors.primary.DEFAULT : isDanger ? colors.danger.DEFAULT : 'transparent';
  const border = variant === 'outline' ? colors.primary.DEFAULT : 'transparent';
  const tone = isPrimary || isDanger ? 'inverse' : 'link';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={(state) => [
        {
          height: layout.controlHeight,
          borderRadius: borderRadius.md,
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: border,
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : state.pressed ? 0.85 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          paddingHorizontal: 20,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary || isDanger ? '#FFFFFF' : colors.primary.DEFAULT} />
      ) : (
        <>
          {leftSlot}
          <Text variant="button" tone={tone} style={{ fontSize: typography.button.fontSize }}>
          {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
