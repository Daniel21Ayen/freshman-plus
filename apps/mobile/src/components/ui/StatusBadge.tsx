import React from 'react';
import { View } from 'react-native';
import type { PaymentStatus } from '@freshman-plus/constants';
import { Text } from '@freshman-plus/ui';
import { colors } from '@/theme';

const MAP: Record<PaymentStatus, { label: string; fg: string; bg: string }> = {
  AWAITING_SCREENSHOT: { label: 'Awaiting screenshot', fg: colors.warning.dark, bg: colors.warning.light },
  PENDING_APPROVAL: { label: 'Pending', fg: colors.warning.dark, bg: colors.warning.light },
  APPROVED: { label: 'Approved', fg: colors.success.dark, bg: colors.success.light },
  REJECTED: { label: 'Rejected', fg: colors.danger.dark, bg: colors.danger.light },
  EXPIRED: { label: 'Expired', fg: colors.text.secondary, bg: colors.background.subtle },
};

export function StatusBadge({ status }: { status: PaymentStatus }) {
  const s = MAP[status];
  return (
    <View style={{ backgroundColor: s.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
      <Text variant="caption" style={{ color: s.fg, fontWeight: '600' }}>{s.label}</Text>
    </View>
  );
}
