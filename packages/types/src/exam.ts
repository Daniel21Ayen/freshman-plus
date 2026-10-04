import type { ExamType, PublishStatus, Semester } from '@freshman-plus/constants';
import type { ID, Timestamps } from './common';

export interface Exam extends Timestamps {
  id: ID;
  courseId: ID;
  type: ExamType;
  title: string;
  /** "2024/2025" */
  academicYear: string;
  semester: Semester;
  questionCount: number;
  durationMinutes: number | null;
  priceEtb: number;
  /** Days of access granted after purchase (default 7) */
  validityDays: number;
  pdfUrl: string | null;
  status: PublishStatus;
}

export interface Question {
  id: ID;
  text: string;
  textAm: string | null;
  options: string[];
  /** Never sent to the client before submission for paid/timed exams */
  correctIndex?: number;
  explanation?: string | null;
  order: number;
}

export interface QuizSummary {
  id: ID;
  title: string;
  kind: 'QUIZ' | 'TEST';
  courseId: ID;
  questionCount: number;
  durationMinutes: number;
  priceEtb: number;
  status: PublishStatus;
}
