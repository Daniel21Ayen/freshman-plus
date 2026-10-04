import React, { useState } from 'react';
import { Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QuizCard } from '@/components/practice';
import { Screen } from '@/components/ui';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';

type Props = NativeStackScreenProps<CoursesStackParamList, 'Quizzes'>;

export function QuizzesScreen({ navigation, route }: Props) {
  const { courseId, kind = 'QUIZ' } = route.params;
  const course = catalogService.getCourse(courseId);
  const quizzes = catalogService.listQuizzes(courseId, kind);
  const [openId, setOpenId] = useState<string | null>(quizzes[0]?.id ?? null);

  return (
    <Screen title={kind === 'QUIZ' ? 'Quizzes' : 'Tests'} subtitle={course?.name} onBack={navigation.goBack}>
      {quizzes.map((q) => (
        <QuizCard
          key={q.id}
          quiz={q}
          expanded={openId === q.id}
          onToggle={() => setOpenId((cur) => (cur === q.id ? null : q.id))}
          onStart={() => Alert.alert(q.title, 'The quiz player ships with the Practice phase.')}
        />
      ))}
    </Screen>
  );
}
