import React from 'react';
import { Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@freshman-plus/ui';
import { Screen } from '@/components/ui';
import { StudyFileRow } from '@/components/study';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type NotesProps = NativeStackScreenProps<CoursesStackParamList, 'NotesViewer'>;

export interface StudyListProps {
  title: string;
  courseId: string;
  kind: 'notes' | 'materials';
  onBack: () => void;
}

/** Shared list for Notes + Materials: "Chapter 1 - Introduction · PDF • 2.4 MB" … and "Download All". */
export function StudyList({ title, courseId, kind, onBack }: StudyListProps) {
  const course = catalogService.getCourse(courseId);
  const files = catalogService.listStudyFiles(courseId, kind);
  // PDF viewer + offline download manager land with the Study/Downloads phase.
  const soon = (what: string) => Alert.alert(what, 'The PDF viewer and offline downloads arrive in the next phase.');

  return (
    <Screen
      title={title}
      subtitle={course?.name}
      onBack={onBack}
      footer={<Button label="Download All" onPress={() => soon('Download All')} />}
    >
      {files.map((file) => (
        <StudyFileRow key={file.id} file={file} onPress={() => soon(file.title)} />
      ))}
    </Screen>
  );
}

export function NotesViewerScreen({ navigation, route }: NotesProps) {
  const { courseId, language } = route.params;
  return (
    <StudyList
      title={language === 'am' ? 'Amharic Notes' : 'English Notes'}
      courseId={courseId}
      kind="notes"
      onBack={navigation.goBack}
    />
  );
}
