import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Receipt } from 'lucide-react-native';
import { formatETB } from '@freshman-plus/utils';
import { Text } from '@freshman-plus/ui';
import { EmptyState, IconTile, ListItem, Screen, StatusBadge } from '@/components/ui';
import { useAuth } from '@/context';
import { useRootNavigation } from '@/navigation';
import type { ProfileStackParamList } from '@/navigation/types';
import { screenshotPaymentService, type PaymentRecord } from '@/services/payments';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PaymentHistory'>;

export function PaymentHistoryScreen({ navigation }: Props) {
  const root = useRootNavigation();
  const { user } = useAuth();
  const [items, setItems] = useState<PaymentRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (user) setItems(screenshotPaymentService.listPayments(user.id));
    }, [user]),
  );

  const open = (p: PaymentRecord) => {
    if (p.status === 'APPROVED') root.navigate('Payment', { screen: 'AccessGranted', params: { paymentId: p.id } });
    else if (p.status === 'PENDING_APPROVAL') root.navigate('Payment', { screen: 'PendingApproval', params: { paymentId: p.id } });
    else if (p.status === 'AWAITING_SCREENSHOT') root.navigate('Payment', { screen: 'PaymentScreenshot', params: { paymentId: p.id, methodId: p.methodId } });
  };

  return (
    <Screen title="Payment History" subtitle="View transactions" onBack={navigation.goBack}>
      {items.length === 0 ? <EmptyState icon={Receipt} title="No payments yet" message="Your purchases and their approval status will show up here." /> : null}
      {items.map((p) => (
        <ListItem
          key={p.id}
          title={p.itemTitle}
          subtitle={`${formatETB(p.amountEtb)} • ${new Date(p.createdAt).toLocaleDateString()}`}
          left={<IconTile icon={Receipt} color={colors.primary[500]} bg={colors.primary[50]} />}
          right={<View><StatusBadge status={p.status} /></View>}
          onPress={() => open(p)}
        />
      ))}
      <Text variant="caption" tone="muted" style={{ textAlign: 'center', marginTop: 8 }}>Payments are verified manually by an admin.</Text>
    </Screen>
  );
}
