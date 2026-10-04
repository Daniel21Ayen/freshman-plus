import React, { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { Button, Text } from '@freshman-plus/ui';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@freshman-plus/validation';
import { AuthLayout } from '@/components/auth';
import { FormInput } from '@/components/forms';
import { delay } from '@/lib/utils';
import type { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [busy, setBusy] = useState(false);
  const { control, handleSubmit } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: '' },
  });

  const submit = handleSubmit(async () => {
    setBusy(true);
    await delay(600); // MOCK — POST /auth/forgot-password
    setBusy(false);
    Alert.alert('Check your messages', 'If an account exists, we sent a reset code.', [{ text: 'OK', onPress: navigation.goBack }]);
  });

  return (
    <AuthLayout>
      <Pressable onPress={navigation.goBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
        <ArrowLeft size={24} color={colors.text.primary} />
      </Pressable>
      <View style={{ gap: 6, marginBottom: 8 }}>
        <Text variant="h2">Reset Password</Text>
        <Text variant="body" tone="secondary">Enter your email or phone number and we'll send you a reset code.</Text>
      </View>
      <FormInput control={control} name="identifier" placeholder="Email or Phone Number" autoCapitalize="none" keyboardType="email-address" leftIcon={<Mail size={18} color={colors.text.muted} />} />
      <Button label="Send Reset Code" onPress={submit} loading={busy} />
    </AuthLayout>
  );
}
