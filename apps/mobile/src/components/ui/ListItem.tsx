import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { borderRadius, colors, shadows } from '@/theme';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  caption?: string;
  left?: ReactNode;
  /** Pass `null` to hide the chevron. */
  right?: ReactNode | null;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** White bordered row card: [icon] title / subtitle  ›  — used for every list in the design. */
export function ListItem({ title, subtitle, caption, left, right, onPress, style }: ListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [styles.root, pressed && styles.pressed, style]}
    >
      {left}
      <View style={styles.texts}>
        <Text variant="bodyStrong" numberOfLines={1}>{title}</Text>
        {subtitle ? <Text variant="caption" tone="secondary" numberOfLines={1}>{subtitle}</Text> : null}
        {caption ? <Text variant="caption" tone="muted" numberOfLines={1}>{caption}</Text> : null}
      </View>
      {right === undefined ? <ChevronRight size={18} color={colors.text.muted} /> : right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    minHeight: 64,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md + 2,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
    ...shadows.sm,
  },
  pressed: { opacity: 0.85 },
  texts: { flex: 1, gap: 2 },
});
