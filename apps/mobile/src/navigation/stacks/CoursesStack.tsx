import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourseMenuScreen, MyCoursesScreen, SelectCourseScreen, SelectUniversityScreen } from '@/screens/courses';
import { ExamDetailsScreen, PastExamsScreen } from '@/screens/exams';
import { QuizzesScreen } from '@/screens/practice';
import { MaterialsScreen, NotesViewerScreen } from '@/screens/study';
import type { CoursesStackParamList } from '../types';

const Stack = createNativeStackNavigator<CoursesStackParamList>();

export function CoursesStack() {
  return (
    <Stack.Navigator initialRouteName="SelectUniversity" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectUniversity" component={SelectUniversityScreen} />
      <Stack.Screen name="SelectCourse" component={SelectCourseScreen} />
      <Stack.Screen name="CourseMenu" component={CourseMenuScreen} />
      <Stack.Screen name="NotesViewer" component={NotesViewerScreen} />
      <Stack.Screen name="Materials" component={MaterialsScreen} />
      <Stack.Screen name="Quizzes" component={QuizzesScreen} />
      <Stack.Screen name="PastExams" component={PastExamsScreen} />
      <Stack.Screen name="ExamDetails" component={ExamDetailsScreen} />
      <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
    </Stack.Navigator>
  );
}
