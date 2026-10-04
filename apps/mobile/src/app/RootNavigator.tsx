import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context';
import { PaymentStack } from '@/navigation/stacks';
import type { RootStackParamList } from '@/navigation/types';
import { SplashScreen } from '@/screens/auth';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { status } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {status === 'booting' ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : status === 'unauthenticated' ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ animation: 'fade' }} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainNavigator} options={{ animation: 'fade' }} />
          <Stack.Screen name="Payment" component={PaymentStack} options={{ animation: 'slide_from_bottom' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
