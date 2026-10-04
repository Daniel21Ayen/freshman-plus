import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react-native';
import { Button, Stack, Text } from '@freshman-plus/ui';
import { registerSchema, type RegisterInput } from '@freshman-plus/validation';
import { FormInput } from '@/components/forms';
import { colors } from '@/theme';

export function RegisterForm({ onSubmit }: { onSubmit: (values: RegisterInput) => Promise<void> }) {
  const [formError, setFormError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', identifier: '', password: '', confirmPassword: '' },
  });

  const submit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await onSubmit(values);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  });

  const icon = (Icon: typeof Mail) => <Icon size={18} color={colors.text.muted} />;

  return (
    <Stack gap={4}>
      <FormInput control={control} name="fullName" placeholder="Full Name" autoComplete="name" leftIcon={icon(User)} />
      <FormInput control={control} name="identifier" placeholder="Email or Phone Number" autoCapitalize="none" keyboardType="email-address" leftIcon={icon(Mail)} />
      <FormInput control={control} name="password" placeholder="Password" autoCapitalize="none" secureToggle leftIcon={icon(Lock)} />
      <FormInput control={control} name="confirmPassword" placeholder="Confirm Password" autoCapitalize="none" secureToggle leftIcon={icon(Lock)} />
      {formError ? <Text variant="caption" tone="danger">{formError}</Text> : null}
      <Button label="Sign Up" onPress={submit} loading={formState.isSubmitting} />
    </Stack>
  );
}
