import type { QuizVM } from '../types';

const QUIZ_SPECS: Array<[number, number]> = [
  [10, 15],
  [15, 20],
  [20, 25],
  [15, 20],
];

export function buildQuizzes(courseId: string, kind: 'QUIZ' | 'TEST'): QuizVM[] {
  const label = kind === 'QUIZ' ? 'Quiz' : 'Test';
  return QUIZ_SPECS.map(([questionCount, durationMinutes], i) => ({
    id: `${courseId}__${kind.toLowerCase()}${i + 1}`,
    courseId,
    kind,
    title: `${label} ${i + 1}`,
    questionCount,
    durationMinutes,
  }));
}
