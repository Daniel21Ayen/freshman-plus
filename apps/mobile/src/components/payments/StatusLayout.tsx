import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

/** Blue band + big white sheet with centred illustration/text and a pinned action button. */
export function StatusLayout({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <View style={{ height: insets.top + 56 }} />
      <View style={styles.sheet}>
        <View style={styles.center}>{children}</View>
        <View style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>{footer}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gradients.header[0] },
  sheet: { flex: 1, backgroundColor: colors.background.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, gap: 10 },
});
