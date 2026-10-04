import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail } from 'lucide-react-native';
import { Button, Stack, Text } from '@freshman-plus/ui';
import { loginSchema, type LoginInput } from '@freshman-plus/validation';
import { FormInput } from '@/components/forms';
import { colors } from '@/theme';

export interface LoginFormProps {
  onSubmit: (values: LoginInput) => Promise<void>;
  onForgotPassword: () => void;
}

export function LoginForm({ onSubmit, onForgotPassword }: LoginFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const submit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await onSubmit(values);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  });

  return (
    <Stack gap={4}>
      <FormInput
        control={control}
        name="identifier"
        placeholder="Email or Phone Number"
        autoCapitalize="none"
        autoComplete="username"
        keyboardType="email-address"
        leftIcon={<Mail size={18} color={colors.text.muted} />}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="Password"
        autoCapitalize="none"
        autoComplete="password"
        secureToggle
        leftIcon={<Lock size={18} color={colors.text.muted} />}
      />
      <Pressable onPress={onForgotPassword} hitSlop={8} style={{ alignSelf: 'flex-end' }}>
        <Text variant="caption" tone="link">Forgot Password?</Text>
      </Pressable>
      {formError ? <Text variant="caption" tone="danger">{formError}</Text> : null}
      <Button label="Login" onPress={submit} loading={formState.isSubmitting} />
    </Stack>
  );
}
