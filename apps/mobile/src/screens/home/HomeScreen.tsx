import React from 'react';
import { Alert, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Building2 } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { HomeHeader, PremiumCard, QuickActions, type QuickActionKey } from '@/components/home';
import { IconTile, ListItem, Screen } from '@/components/ui';
import { useAuth } from '@/context';
import { useRootNavigation } from '@/navigation';
import type { HomeStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const root = useRootNavigation();
  const { user } = useAuth();
  const fullName = user?.fullName ?? 'Student';
  const firstName = fullName.split(' ')[0] ?? fullName;
  const universityId = user?.universityId ?? 'aau';
  const university = catalogService.getUniversity(universityId);

  const goCourses = (screen: 'SelectUniversity' | 'MyCourses') =>
    root.navigate('Main', { screen: 'CoursesTab', params: { screen } });

  const onAction = (key: QuickActionKey) => {
    if (key === 'courses') return goCourses('MyCourses');
    if (key === 'more') return root.navigate('Main', { screen: 'LibraryTab' });
    return goCourses('SelectUniversity');
  };

  return (
    <Screen header={<HomeHeader firstName={firstName} fullName={fullName} onSearchPress={() => navigation.navigate('Search')} />}>
      <PremiumCard onPress={() => Alert.alert('Premium', 'Premium plans are coming soon.')} />
      <QuickActions onPress={onAction} />
      <Text variant="title" style={{ marginTop: 8 }}>Recently Accessed</Text>
      <ListItem
        title={catalogService.department}
        subtitle={`University of ${university?.name.replace(' University', '') ?? 'Addis Ababa'}`}
        left={<IconTile icon={Building2} color={colors.primary[500]} bg={colors.primary[50]} />}
        onPress={() => root.navigate('Main', { screen: 'CoursesTab', params: { screen: 'SelectCourse', params: { universityId } } })}
      />
      <View style={{ height: 8 }} />
    </Screen>
  );
}
