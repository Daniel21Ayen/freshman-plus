import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpen, Building2, CreditCard, Settings as SettingsIcon } from 'lucide-react-native';
import { ProfileHeader } from '@/components/profile';
import { IconTile, ListItem, Screen } from '@/components/ui';
import { useAuth } from '@/context';
import { MOCK_PROFILE_STATS } from '@/data';
import { useRootNavigation } from '@/navigation';
import type { ProfileStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const root = useRootNavigation();
  const { user } = useAuth();
  const universityId = user?.universityId ?? 'aau';
  const university = catalogService.getUniversity(universityId);
  const tile = (Icon: typeof BookOpen) => <IconTile icon={Icon} color={colors.primary[500]} bg={colors.primary[50]} />;

  return (
    <Screen title="My Profile">
      <ProfileHeader fullName={user?.fullName ?? 'Student'} stats={MOCK_PROFILE_STATS} />
      <ListItem
        title="My University"
        subtitle={university?.name}
        left={tile(Building2)}
        onPress={() => root.navigate('Main', { screen: 'CoursesTab', params: { screen: 'SelectCourse', params: { universityId } } })}
      />
      <ListItem
        title="My Courses"
        subtitle="View enrolled courses"
        left={tile(BookOpen)}
        onPress={() => root.navigate('Main', { screen: 'CoursesTab', params: { screen: 'MyCourses' } })}
      />
      <ListItem title="Payment History" subtitle="View transactions" left={tile(CreditCard)} onPress={() => navigation.navigate('PaymentHistory')} />
      <ListItem title="Settings" subtitle="App preferences" left={tile(SettingsIcon)} onPress={() => navigation.navigate('Settings')} />
    </Screen>
  );
}
