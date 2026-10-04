import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context';
import { ForgotPasswordScreen, LoginScreen, OnboardingScreen, RegisterScreen } from '@/screens/auth';
import { LockedContentScreen } from '@/screens/locked';
import type { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  const { hasSeenOnboarding, sessionExpired } = useAuth();
  const initial: keyof AuthStackParamList = sessionExpired ? 'LockedContent' : hasSeenOnboarding ? 'Login' : 'Onboarding';
  return (
    <Stack.Navigator initialRouteName={initial} screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="LockedContent" component={LockedContentScreen} />
    </Stack.Navigator>
  );
}
