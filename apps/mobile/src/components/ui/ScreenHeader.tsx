import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';

export interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  left?: ReactNode;
  right?: ReactNode;
}

/** Blue header band used by every inner screen (white back arrow, title, optional subtitle). */
export function ScreenHeader({ title, subtitle, onBack, left, right }: ScreenHeaderProps) {
  return (
    <View style={styles.root}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
          <ArrowLeft size={22} color="#FFFFFF" />
        </Pressable>
      ) : null}
      {left}
      <View style={styles.titles}>
        {title ? (
          <Text variant="title" tone="inverse" numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text variant="caption" tone="inverse" numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 22 },
  titles: { flex: 1 },
  title: { fontSize: 18 },
  subtitle: { opacity: 0.85, marginTop: 2 },
});
