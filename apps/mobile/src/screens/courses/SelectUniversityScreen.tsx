import React, { useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UniversityRow } from '@/components/courses';
import { Screen, SearchBar } from '@/components/ui';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type Props = NativeStackScreenProps<CoursesStackParamList, 'SelectUniversity'>;

export function SelectUniversityScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogService.listUniversities().filter((u) => !q || u.name.toLowerCase().includes(q) || u.abbreviation.toLowerCase().includes(q));
  }, [query]);

  return (
    <Screen title="Select University" onBack={navigation.canGoBack() ? navigation.goBack : undefined}>
      <SearchBar placeholder="Search university..." value={query} onChangeText={setQuery} />
      {items.map((u) => (
        <UniversityRow key={u.id} university={u} onPress={() => navigation.navigate('SelectCourse', { universityId: u.id })} />
      ))}
    </Screen>
  );
}
