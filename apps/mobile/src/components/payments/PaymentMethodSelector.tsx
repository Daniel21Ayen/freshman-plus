import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { PaymentMethod } from '@freshman-plus/types';
import { Text } from '@freshman-plus/ui';
import { borderRadius, colors } from '@/theme';
import { ProviderLogo } from './ProviderLogo';

export interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/** Radio list: [logo] Telebirr ○ … */
export function PaymentMethodSelector({ methods, selectedId, onSelect }: PaymentMethodSelectorProps) {
  return (
    <View style={styles.list}>
      {methods.map((m, i) => {
        const selected = m.id === selectedId;
        return (
          <Pressable
            key={m.id}
            onPress={() => onSelect(m.id)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            style={[styles.row, i > 0 && styles.divider]}
          >
            <ProviderLogo provider={m.provider} />
            <Text variant="bodyStrong" style={{ flex: 1 }}>{m.displayName}</Text>
            <View style={[styles.radio, selected && styles.radioOn]}>{selected ? <View style={styles.dot} /> : null}</View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.background.card, borderRadius: borderRadius.md + 2, borderWidth: 1, borderColor: colors.border.DEFAULT, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, height: 56 },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border.DEFAULT },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border.strong, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: colors.primary[500] },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary[500] },
});
