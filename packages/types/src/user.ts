import type { Language, Role, UserStatus } from '@freshman-plus/constants';
import type { ID, ISODateString, Timestamps } from './common';

export interface User extends Timestamps {
  id: ID;
  fullName: string;
  email: string | null;
  phone: string | null;
  role: Role;
  status: UserStatus;
  universityId: ID | null;
  avatarUrl: string | null;
  language: Language;
  lastActiveAt: ISODateString | null;
}

/** Shape of the mobile "My Profile" header stats (Courses / Exams / Quizzes). */
export interface ProfileStats {
  courses: number;
  exams: number;
  quizzes: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}
