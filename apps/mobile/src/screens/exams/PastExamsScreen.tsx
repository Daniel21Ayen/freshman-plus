import React, { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExamCard } from '@/components/exams';
import { Chip, Screen } from '@/components/ui';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type Props = NativeStackScreenProps<CoursesStackParamList, 'PastExams'>;

export function PastExamsScreen({ navigation, route }: Props) {
  const { courseId, examType = 'MIDTERM' } = route.params;
  const [type, setType] = useState<'MIDTERM' | 'FINAL'>(examType);
  const exams = catalogService.listExams(courseId, type);

  return (
    <Screen title="Past Exams" onBack={navigation.goBack}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip label="Mid Exam" selected={type === 'MIDTERM'} onPress={() => setType('MIDTERM')} />
        <Chip label="Final Exam" selected={type === 'FINAL'} onPress={() => setType('FINAL')} />
      </View>
      {exams.map((e) => (
        <ExamCard key={e.id} exam={e} onPress={() => navigation.navigate('ExamDetails', { examId: e.id })} />
      ))}
    </Screen>
  );
}
