import type { ID, ISODateString } from './common';

export interface CourseProgress {
  courseId: ID;
  percent: number;
  lastChapterId: ID | null;
  updatedAt: ISODateString;
}
