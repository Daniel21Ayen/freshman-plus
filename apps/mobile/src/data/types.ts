import type { Course, Exam, PaymentMethod, University, User } from '@freshman-plus/types';

/** Lean view-models derived from the shared types so mock data can't drift from the API contract. */
export type UniversityVM = Pick<University, 'id' | 'name' | 'abbreviation'>;
export type CourseVM = Pick<Course, 'id' | 'universityId' | 'name' | 'code'>;
export type ExamVM = Pick<
  Exam,
  'id' | 'courseId' | 'type' | 'title' | 'academicYear' | 'questionCount' | 'durationMinutes' | 'priceEtb' | 'validityDays'
>;
export interface StudyFileVM {
  id: string;
  title: string;
  sizeBytes: number;
}
export interface QuizVM {
  id: string;
  courseId: string;
  kind: 'QUIZ' | 'TEST';
  title: string;
  questionCount: number;
  durationMinutes: number;
}
export type PaymentMethodVM = PaymentMethod;
export type UserVM = User;
