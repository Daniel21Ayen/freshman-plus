import type { CourseVM } from '../types';
import { UNIVERSITIES } from './universities';

/** Department shown in the "Select Course" header. */
export const DEFAULT_DEPARTMENT = 'Computer Science';

const CS_COURSES = [
  { code: 'CS101', name: 'Data Structures & Algorithms' },
  { code: 'CS102', name: 'Database Systems' },
  { code: 'CS103', name: 'Computer Networks' },
  { code: 'CS104', name: 'Operating Systems' },
  { code: 'CS105', name: 'Web Programming' },
  { code: 'CS106', name: 'Software Engineering' },
] as const;

export const COURSES: CourseVM[] = UNIVERSITIES.flatMap((u) =>
  CS_COURSES.map((c) => ({
    id: `${u.id}-${c.code.toLowerCase()}`,
    universityId: u.id,
    name: c.name,
    code: c.code,
  })),
);
