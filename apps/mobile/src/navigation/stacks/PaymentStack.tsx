import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AccessGrantedScreen,
  PaymentDetailsScreen,
  PaymentMethodsScreen,
  PaymentScreenshotScreen,
  PaymentSubmittedScreen,
  PendingApprovalScreen,
} from '@/screens/payments';
import type { PaymentStackParamList } from '../types';

const Stack = createNativeStackNavigator<PaymentStackParamList>();

/** Payment Methods -> Details (copy account) -> Upload Screenshot -> Submitted -> Pending -> Access Granted */
export function PaymentStack() {
  return (
    <Stack.Navigator initialRouteName="PaymentMethods" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
      <Stack.Screen name="PaymentScreenshot" component={PaymentScreenshotScreen} />
      <Stack.Screen name="PaymentSubmitted" component={PaymentSubmittedScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="PendingApproval" component={PendingApprovalScreen} />
      <Stack.Screen name="AccessGranted" component={AccessGrantedScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
