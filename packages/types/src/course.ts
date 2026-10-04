import type { EntityStatus, Semester } from '@freshman-plus/constants';
import type { ID } from './common';

export interface University {
  id: ID;
  name: string;
  abbreviation: string;
  logoUrl: string | null;
  status: EntityStatus;
  courseCount?: number;
  studentCount?: number;
}

export interface Course {
  id: ID;
  universityId: ID;
  name: string;
  /** e.g. CS101 */
  code: string;
  semester: Semester;
  status: EntityStatus;
  contentCount?: number;
}

export interface Chapter {
  id: ID;
  courseId: ID;
  title: string;
  order: number;
}
