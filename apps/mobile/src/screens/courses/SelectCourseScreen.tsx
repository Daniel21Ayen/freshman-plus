import React, { useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Building2 } from 'lucide-react-native';
import { CourseRow } from '@/components/courses';
import { IconTile, Screen, SearchBar } from '@/components/ui';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type Props = NativeStackScreenProps<CoursesStackParamList, 'SelectCourse'>;

export function SelectCourseScreen({ navigation, route }: Props) {
  const { universityId } = route.params;
  const university = catalogService.getUniversity(universityId);
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogService.listCourses(universityId).filter((c) => !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [universityId, query]);

  return (
    <Screen
      title={catalogService.department}
      subtitle={university?.name}
      onBack={navigation.goBack}
      left={<IconTile icon={Building2} color="#FFFFFF" bg="rgba(255,255,255,0.18)" size={38} radius={10} />}
    >
      <SearchBar placeholder="Search courses..." value={query} onChangeText={setQuery} />
      {items.map((c) => (
        <CourseRow key={c.id} course={c} onPress={() => navigation.navigate('CourseMenu', { courseId: c.id })} />
      ))}
    </Screen>
  );
}
