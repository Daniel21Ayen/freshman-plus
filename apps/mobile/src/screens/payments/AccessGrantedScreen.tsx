import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@freshman-plus/ui';
import { StatusLayout, SuccessIllustration } from '@/components/payments';
import { useRootNavigation } from '@/navigation';
import type { PaymentStackParamList } from '@/navigation/types';
import { screenshotPaymentService } from '@/services/payments';

type Props = NativeStackScreenProps<PaymentStackParamList, 'AccessGranted'>;

export function AccessGrantedScreen({ route }: Props) {
  const root = useRootNavigation();

  const goToCourse = async () => {
    const p = await screenshotPaymentService.getPayment(route.params.paymentId);
    root.navigate('Main', {
      screen: 'CoursesTab',
      params: p ? { screen: 'CourseMenu', params: { courseId: p.courseId } } : { screen: 'SelectUniversity' },
    });
  };

  return (
    <StatusLayout footer={<Button label="Go to Course" onPress={() => void goToCourse()} />}>
      <SuccessIllustration />
      <Text variant="h3" style={{ textAlign: 'center' }}>Access Granted!</Text>
      <Text variant="body" tone="secondary" style={{ textAlign: 'center', lineHeight: 21 }}>
        Your payment has been approved. You can now access the course content.
      </Text>
    </StatusLayout>
  );
}
