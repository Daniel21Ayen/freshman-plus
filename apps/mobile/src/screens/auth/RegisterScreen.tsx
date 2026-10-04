import React from 'react';
import { Pressable, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { AuthLayout, RegisterForm } from '@/components/auth';
import { useAuth } from '@/context';
import type { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  return (
    <AuthLayout>
      <Pressable onPress={navigation.goBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
        <ArrowLeft size={24} color={colors.text.primary} />
      </Pressable>
      <View style={{ gap: 6, marginBottom: 8 }}>
        <Text variant="h2">Create Your Account</Text>
        <Text variant="body" tone="secondary">Join Freshman+ and start your learning journey.</Text>
      </View>

      <RegisterForm onSubmit={register} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 'auto', paddingTop: 16 }}>
        <Text variant="caption" tone="secondary">Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
          <Text variant="caption" tone="link" style={{ fontWeight: '600' }}>Login</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
