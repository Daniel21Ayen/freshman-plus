import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@freshman-plus/ui';
import { AuthLayout, LoginForm, SocialLogin } from '@/components/auth';
import { Logo, Wordmark } from '@/components/ui';
import { useAuth } from '@/context';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  return (
    <AuthLayout>
      <View style={{ alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 }}>
        <Logo size={72} />
        <Wordmark size={28} />
        <Text variant="body" tone="secondary">Login to your account</Text>
      </View>

      <LoginForm onSubmit={login} onForgotPassword={() => navigation.navigate('ForgotPassword')} />

      <SocialLogin onGoogle={() => Alert.alert('Google sign-in', 'Google sign-in will be enabled once OAuth credentials are configured.')} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 'auto', paddingTop: 16 }}>
        <Text variant="caption" tone="secondary">Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Register')} hitSlop={8}>
          <Text variant="caption" tone="link" style={{ fontWeight: '600' }}>Sign Up</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
