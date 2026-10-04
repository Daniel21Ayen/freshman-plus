export const EXAM_TYPE = { MIDTERM: 'MIDTERM', FINAL: 'FINAL', MOCK: 'MOCK', COC: 'COC' } as const;
export type ExamType = (typeof EXAM_TYPE)[keyof typeof EXAM_TYPE];

export const SEMESTER = { FIRST: 'FIRST', SECOND: 'SECOND', SUMMER: 'SUMMER' } as const;
export type Semester = (typeof SEMESTER)[keyof typeof SEMESTER];

export const SEMESTER_LABEL: Record<Semester, string> = {
  FIRST: '1st Semester',
  SECOND: '2nd Semester',
  SUMMER: 'Summer',
};
