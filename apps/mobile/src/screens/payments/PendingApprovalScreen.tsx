import React, { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { APPROVAL_SLA_HOURS } from '@freshman-plus/constants';
import { Button, Text } from '@freshman-plus/ui';
import { PendingIllustration, StatusLayout } from '@/components/payments';
import { useRootNavigation } from '@/navigation';
import type { PaymentStackParamList } from '@/navigation/types';
import { screenshotPaymentService } from '@/services/payments';

type Props = NativeStackScreenProps<PaymentStackParamList, 'PendingApproval'>;

/** How often to re-check while the screen is open; push notifications are the primary signal. */
const POLL_MS = 4000;

export function PendingApprovalScreen({ navigation, route }: Props) {
  const root = useRootNavigation();
  const { paymentId } = route.params;

  useEffect(() => {
    let active = true;
    const check = async () => {
      const p = await screenshotPaymentService.getPayment(paymentId);
      if (active && p?.status === 'APPROVED') navigation.replace('AccessGranted', { paymentId });
    };
    void check();
    const id = setInterval(() => void check(), POLL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [paymentId, navigation]);

  return (
    <StatusLayout footer={<Button label="Back to Home" onPress={() => root.navigate('Main', { screen: 'HomeTab', params: { screen: 'Home' } })} />}>
      <PendingIllustration />
      <Text variant="h3" style={{ textAlign: 'center' }}>Awaiting Admin Approval</Text>
      <Text variant="body" tone="secondary" style={{ textAlign: 'center', lineHeight: 21 }}>
        Your payment has been submitted. An admin will verify and approve your access within {APPROVAL_SLA_HOURS} hours.
      </Text>
    </StatusLayout>
  );
}
