import React, { useMemo, useRef, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@freshman-plus/ui';
import { BankAccountCard, InfoNote } from '@/components/payments';
import { Screen } from '@/components/ui';
import { useAuth } from '@/context';
import type { PaymentStackParamList } from '@/navigation/types';
import { screenshotPaymentService } from '@/services/payments';

type Props = NativeStackScreenProps<PaymentStackParamList, 'PaymentDetails'>;

/** Payment Details (Copy Account): where to send the money, then "I've Made the Payment". */
export function PaymentDetailsScreen({ navigation, route }: Props) {
  const { item, methodId } = route.params;
  const { user } = useAuth();
  const method = screenshotPaymentService.getMethod(methodId);
  const reference = useMemo(() => screenshotPaymentService.suggestReference(user?.fullName ?? 'Student'), [user?.fullName]);
  const idempotencyKey = useRef(`pay-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`).current;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!method || !user) return <Screen title="Payment Details" onBack={navigation.goBack}><Text>Payment method unavailable.</Text></Screen>;

  const confirm = async () => {
    setBusy(true);
    setError(null);
    try {
      const payment = await screenshotPaymentService.createPayment({ userId: user.id, item, methodId, reference, idempotencyKey });
      navigation.navigate('PaymentScreenshot', { paymentId: payment.id, methodId });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start your payment. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen
      title="Payment Details"
      onBack={navigation.goBack}
      safeBottom
      footer={<Button label="I've Made the Payment" onPress={confirm} loading={busy} />}
    >
      <BankAccountCard method={method} amountEtb={item.amountEtb} reference={reference} />
      <InfoNote>After payment, take a screenshot and submit for admin approval.</InfoNote>
      {error ? <Text variant="caption" tone="danger">{error}</Text> : null}
    </Screen>
  );
}
