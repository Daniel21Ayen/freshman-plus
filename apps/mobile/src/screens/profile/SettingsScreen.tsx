import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogOut } from 'lucide-react-native';
import { Button, Text } from '@freshman-plus/ui';
import { Screen } from '@/components/ui';
import { useAuth } from '@/context';
import type { ProfileStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const { logout, user } = useAuth();
  return (
    <Screen title="Settings" subtitle="App preferences" onBack={navigation.goBack}>
      <Text variant="caption" tone="secondary">Signed in as {user?.email ?? user?.phone ?? user?.fullName}</Text>
      <Button label="Log out" variant="danger" leftSlot={<LogOut size={18} color="#FFFFFF" />} onPress={() => void logout()} />
    </Screen>
  );
}
