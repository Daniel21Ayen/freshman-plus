import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Info } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { colors } from '@/theme';

export function InfoNote({ children }: { children: string }) {
  return (
    <View style={styles.root}>
      <Info size={16} color={colors.primary[500]} style={{ marginTop: 2 }} />
      <Text variant="caption" style={{ flex: 1, color: colors.primary[700] }}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', gap: 10, padding: 12, borderRadius: 12, backgroundColor: colors.primary[50] },
});
