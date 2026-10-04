import type { ExamVM } from '../types';

const MID: Array<[string, string, number]> = [
  ['Midterm Exam 1', '2022/2023', 45],
  ['Midterm Exam 2', '2021/2022', 50],
  ['Midterm Exam 1', '2020/2021', 40],
  ['Midterm Exam 2', '2019/2020', 35],
];
const FINAL: Array<[string, string, number]> = [
  ['Final Exam', '2022/2023', 100],
  ['Final Exam', '2021/2022', 100],
  ['Final Exam', '2020/2021', 90],
];

/** Exam ids are `${courseId}__${slot}` so any course resolves without a lookup table. */
export function buildExams(courseId: string): ExamVM[] {
  const mid = MID.map(([title, year, q], i): ExamVM => ({
    id: `${courseId}__m${i + 1}`,
    courseId,
    type: 'MIDTERM',
    title,
    academicYear: year,
    questionCount: q,
    durationMinutes: 90,
    priceEtb: 50,
    validityDays: 7,
  }));
  const fin = FINAL.map(([title, year, q], i): ExamVM => ({
    id: `${courseId}__f${i + 1}`,
    courseId,
    type: 'FINAL',
    title,
    academicYear: year,
    questionCount: q,
    durationMinutes: 120,
    priceEtb: 70,
    validityDays: 7,
  }));
  return [...mid, ...fin];
}
