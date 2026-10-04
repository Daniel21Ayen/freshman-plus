import { z } from 'zod';
import { EXAM_TYPE, PUBLISH_STATUS, SEMESTER } from '@freshman-plus/constants';

/** Admin → Exam Upload / Edit */
export const examSchema = z.object({
  courseId: z.string().uuid('Select a course'),
  type: z.nativeEnum(EXAM_TYPE),
  academicYear: z.string().regex(/^\d{4}\/\d{4}$/, 'Use the format 2024/2025'),
  semester: z.nativeEnum(SEMESTER),
  title: z.string().trim().min(3).max(160),
  questionCount: z.number().int().min(1).max(500),
  durationMinutes: z.number().int().min(5).max(360).nullable().optional(),
  priceEtb: z.number().min(0).max(100000),
  validityDays: z.number().int().min(1).max(365).default(7),
  publishImmediately: z.boolean().default(false),
  status: z.nativeEnum(PUBLISH_STATUS).default('DRAFT'),
});
export type ExamInput = z.infer<typeof examSchema>;

export const questionSchema = z
  .object({
    text: z.string().trim().min(3),
    textAm: z.string().trim().nullable().optional(),
    options: z.array(z.string().trim().min(1)).min(2).max(6),
    correctIndex: z.number().int().min(0),
    explanation: z.string().trim().nullable().optional(),
    topic: z.string().trim().nullable().optional(),
  })
  .refine((q) => q.correctIndex < q.options.length, {
    path: ['correctIndex'],
    message: 'Correct answer must match one of the options',
  });
export type QuestionInput = z.infer<typeof questionSchema>;

export const quizSchema = z.object({
  courseId: z.string().uuid(),
  kind: z.enum(['QUIZ', 'TEST']),
  title: z.string().trim().min(3).max(160),
  durationMinutes: z.number().int().min(1).max(240),
  priceEtb: z.number().min(0),
  status: z.nativeEnum(PUBLISH_STATUS).default('DRAFT'),
});
export type QuizInput = z.infer<typeof quizSchema>;
