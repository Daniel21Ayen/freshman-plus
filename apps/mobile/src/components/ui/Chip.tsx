import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { borderRadius, colors } from '@/theme';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={[styles.root, selected ? styles.on : styles.off]}
    >
      <Text variant="label" style={{ color: selected ? '#FFFFFF' : colors.primary[500] }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { height: 36, paddingHorizontal: 18, borderRadius: borderRadius.full, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  on: { backgroundColor: colors.primary[500], borderColor: colors.primary[500] },
  off: { backgroundColor: colors.background.card, borderColor: colors.border.DEFAULT },
});
