import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpen } from 'lucide-react-native';
import { CourseRow } from '@/components/courses';
import { EmptyState, Screen } from '@/components/ui';
import { useAuth } from '@/context';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type Props = NativeStackScreenProps<CoursesStackParamList, 'MyCourses'>;

export function MyCoursesScreen({ navigation }: Props) {
  const { user } = useAuth();
  // MOCK — enrolled courses come from GET /courses/me
  const courses = catalogService.listCourses(user?.universityId ?? 'aau').slice(0, 3);
  return (
    <Screen title="My Courses" subtitle="Enrolled courses" onBack={navigation.goBack}>
      {courses.length === 0 ? <EmptyState icon={BookOpen} title="No courses yet" /> : null}
      {courses.map((c) => (
        <CourseRow key={c.id} course={c} onPress={() => navigation.navigate('CourseMenu', { courseId: c.id })} />
      ))}
    </Screen>
  );
}
