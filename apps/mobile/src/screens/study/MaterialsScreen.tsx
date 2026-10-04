import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CoursesStackParamList } from '@/navigation/types';
import { StudyList } from './NotesViewerScreen';

type Props = NativeStackScreenProps<CoursesStackParamList, 'Materials'>;

export function MaterialsScreen({ navigation, route }: Props) {
  return <StudyList title="Materials" courseId={route.params.courseId} kind="materials" onBack={navigation.goBack} />;
}
