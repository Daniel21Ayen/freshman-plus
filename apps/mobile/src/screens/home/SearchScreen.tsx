import React, { useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { CourseRow } from '@/components/courses';
import { EmptyState, Screen, SearchBar } from '@/components/ui';
import { useRootNavigation } from '@/navigation';
import type { HomeStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type Props = NativeStackScreenProps<HomeStackParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const root = useRootNavigation();
  const [query, setQuery] = useState('');
  const results = useMemo(() => catalogService.searchCourses(query).slice(0, 20), [query]);

  return (
    <Screen title="Search" onBack={navigation.goBack}>
      <SearchBar placeholder="Search courses, past exams, topics..." value={query} onChangeText={setQuery} autoFocus />
      {results.map((c) => (
        <CourseRow
          key={c.id}
          course={c}
          onPress={() => root.navigate('Main', { screen: 'CoursesTab', params: { screen: 'CourseMenu', params: { courseId: c.id } } })}
        />
      ))}
      {query.trim() && results.length === 0 ? (
        <EmptyState icon={Search} title="No results" message="Try a course name or code, like CS101." />
      ) : null}
    </Screen>
  );
}
