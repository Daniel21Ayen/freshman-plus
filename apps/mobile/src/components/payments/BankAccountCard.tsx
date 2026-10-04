import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { PaymentMethod } from '@freshman-plus/types';
import { formatETB } from '@freshman-plus/utils';
import { Text } from '@freshman-plus/ui';
import { CopyButton } from '@/components/ui';
import { borderRadius, colors, shadows } from '@/theme';
import { ProviderLogo } from './ProviderLogo';

export interface BankAccountCardProps {
  method: PaymentMethod;
  amountEtb: number;
  reference: string;
}

/** "Send payment to the following account" card with copyable account number. */
export function BankAccountCard({ method, amountEtb, reference }: BankAccountCardProps) {
  const accountLabel = method.accountNumber ? 'Account Number' : 'Phone Number';
  const accountValue = method.accountNumber ?? method.phoneNumber ?? '—';
  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <ProviderLogo provider={method.provider} size={32} />
        <Text variant="title">{method.displayName}</Text>
      </View>
      <Text variant="caption" tone="secondary">Send payment to the following account</Text>

      <Field label="Amount" value={formatETB(amountEtb)} />
      <Field label="Account Name" value={method.accountName} />

      <View style={{ gap: 6 }}>
        <Text variant="caption" tone="secondary">{accountLabel}</Text>
        <View style={styles.accountRow}>
          <View style={styles.accountBox}>
            <Text variant="bodyStrong" style={{ letterSpacing: 0.5 }}>{accountValue}</Text>
          </View>
          <CopyButton value={accountValue} />
        </View>
      </View>

      <Field label="Reference" value={reference} />
    </View>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 2 }}>
      <Text variant="caption" tone="secondary">{label}</Text>
      <Text variant="bodyStrong">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 14, padding: 16, backgroundColor: colors.background.card, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, ...shadows.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  accountRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  accountBox: { flex: 1, height: 42, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 10, backgroundColor: colors.primary[50] },
});
