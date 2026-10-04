import {
  COURSES,
  DEFAULT_DEPARTMENT,
  CHAPTERS,
  MATERIALS,
  UNIVERSITIES,
  buildExams,
  buildQuizzes,
  type CourseVM,
  type ExamVM,
  type QuizVM,
  type StudyFileVM,
  type UniversityVM,
} from '@/data';

/** MOCK catalog — replace the bodies with sdk calls; the signatures are what screens depend on. */
export const catalogService = {
  department: DEFAULT_DEPARTMENT,
  listUniversities: (): UniversityVM[] => UNIVERSITIES,
  getUniversity: (id: string): UniversityVM | undefined => UNIVERSITIES.find((u) => u.id === id),
  listCourses: (universityId: string): CourseVM[] => COURSES.filter((c) => c.universityId === universityId),
  getCourse: (id: string): CourseVM | undefined => COURSES.find((c) => c.id === id),
  searchCourses: (query: string): CourseVM[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COURSES.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  },
  listStudyFiles: (_courseId: string, kind: 'notes' | 'materials'): StudyFileVM[] =>
    kind === 'notes' ? CHAPTERS : MATERIALS,
  listExams: (courseId: string, type?: ExamVM['type']): ExamVM[] =>
    buildExams(courseId).filter((e) => !type || e.type === type),
  getExam: (examId: string): ExamVM | undefined => {
    const courseId = examId.split('__')[0];
    return courseId ? buildExams(courseId).find((e) => e.id === examId) : undefined;
  },
  listQuizzes: (courseId: string, kind: 'QUIZ' | 'TEST'): QuizVM[] => buildQuizzes(courseId, kind),
};
