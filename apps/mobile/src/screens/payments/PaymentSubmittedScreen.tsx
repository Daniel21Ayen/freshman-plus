import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@freshman-plus/ui';
import { StatusLayout, SuccessIllustration } from '@/components/payments';
import { useRootNavigation } from '@/navigation';
import type { PaymentStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<PaymentStackParamList, 'PaymentSubmitted'>;

export function PaymentSubmittedScreen(_props: Props) {
  const root = useRootNavigation();
  return (
    <StatusLayout footer={<Button label="Back to Courses" onPress={() => root.navigate('Main', { screen: 'CoursesTab', params: { screen: 'SelectUniversity' } })} />}>
      <SuccessIllustration />
      <Text variant="h3" style={{ textAlign: 'center' }}>Payment Submitted!</Text>
      <Text variant="body" tone="secondary" style={{ textAlign: 'center', lineHeight: 21 }}>
        Your payment has been sent to the admin for approval. You will be notified once it's verified.
      </Text>
    </StatusLayout>
  );
}
