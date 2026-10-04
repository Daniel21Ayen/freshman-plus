import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentHistoryScreen } from '@/screens/payments';
import { ProfileScreen, SettingsScreen } from '@/screens/profile';
import type { ProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
