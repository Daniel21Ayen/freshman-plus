import React, { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpen, ClipboardCheck, ClipboardList, FileText, Layers, type LucideIcon } from 'lucide-react-native';
import { Chip, IconTile, ListItem, Screen } from '@/components/ui';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<CoursesStackParamList, 'CourseMenu'>;
type Filter = 'ALL' | 'MIDTERM' | 'FINAL';
type Key = 'AMHARIC_NOTE' | 'NOTE' | 'QUIZ' | 'PAST_EXAM' | 'TEST' | 'MATERIAL';

const ITEMS: Array<{ key: Key; title: string; subtitle: string; icon: LucideIcon }> = [
  { key: 'AMHARIC_NOTE', title: 'Amharic Notes', subtitle: 'View and download notes', icon: BookOpen },
  { key: 'NOTE', title: 'English Notes', subtitle: 'View and download notes', icon: FileText },
  { key: 'QUIZ', title: 'Quizzes', subtitle: 'Test your knowledge', icon: ClipboardCheck },
  { key: 'PAST_EXAM', title: 'Past Exams', subtitle: 'View previous exams', icon: FileText },
  { key: 'TEST', title: 'Tests', subtitle: 'Take practice tests', icon: ClipboardList },
  { key: 'MATERIAL', title: 'Materials', subtitle: 'Additional learning materials', icon: Layers },
];

/** Mid/Final chips narrow the menu to exam-related entries and pre-select the exam type. */
const EXAM_KEYS: Key[] = ['QUIZ', 'PAST_EXAM', 'TEST'];

export function CourseMenuScreen({ navigation, route }: Props) {
  const { courseId } = route.params;
  const course = catalogService.getCourse(courseId);
  const [filter, setFilter] = useState<Filter>('ALL');
  const items = filter === 'ALL' ? ITEMS : ITEMS.filter((i) => EXAM_KEYS.includes(i.key));

  const open = (key: Key) => {
    switch (key) {
      case 'AMHARIC_NOTE': return navigation.navigate('NotesViewer', { courseId, language: 'am' });
      case 'NOTE': return navigation.navigate('NotesViewer', { courseId, language: 'en' });
      case 'QUIZ': return navigation.navigate('Quizzes', { courseId, kind: 'QUIZ' });
      case 'TEST': return navigation.navigate('Quizzes', { courseId, kind: 'TEST' });
      case 'MATERIAL': return navigation.navigate('Materials', { courseId });
      case 'PAST_EXAM':
        return navigation.navigate('PastExams', { courseId, ...(filter === 'ALL' ? {} : { examType: filter }) });
    }
  };

  const tint = (key: Key) => colors.contentType[key];

  return (
    <Screen title={course?.name ?? 'Course'} subtitle={course?.code} onBack={navigation.goBack}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip label="All" selected={filter === 'ALL'} onPress={() => setFilter('ALL')} />
        <Chip label="Mid Exam" selected={filter === 'MIDTERM'} onPress={() => setFilter('MIDTERM')} />
        <Chip label="Final Exam" selected={filter === 'FINAL'} onPress={() => setFilter('FINAL')} />
      </View>
      {items.map((i) => (
        <ListItem
          key={i.key}
          title={i.title}
          subtitle={i.subtitle}
          left={<IconTile icon={i.icon} color={tint(i.key).fg} bg={tint(i.key).bg} />}
          onPress={() => open(i.key)}
        />
      ))}
    </Screen>
  );
}
