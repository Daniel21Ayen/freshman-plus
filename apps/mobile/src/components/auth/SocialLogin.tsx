import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { borderRadius, colors, layout } from '@/theme';

export function SocialLogin({ onGoogle }: { onGoogle: () => void }) {
  return (
    <View style={{ gap: 14 }}>
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text variant="caption" tone="muted">or</Text>
        <View style={styles.line} />
      </View>
      <Pressable onPress={onGoogle} accessibilityRole="button" style={styles.google}>
        <Text style={styles.g}>G</Text>
        <Text variant="bodyStrong" style={{ color: colors.primary[500] }}>Continue with Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border.strong },
  google: {
    height: layout.controlHeight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.strong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  g: { fontSize: 18, fontWeight: '700', color: '#4285F4' },
});
