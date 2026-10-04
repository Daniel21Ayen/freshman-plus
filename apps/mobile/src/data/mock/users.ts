import type { UserVM } from '../types';

export function buildMockUser(opts: { fullName?: string; identifier: string }): UserVM {
  const isEmail = opts.identifier.includes('@');
  const now = new Date().toISOString();
  return {
    id: 'user-ahmed',
    fullName: opts.fullName?.trim() || 'Ahmed Tesfaye',
    email: isEmail ? opts.identifier : null,
    phone: isEmail ? null : opts.identifier,
    role: 'STUDENT',
    status: 'ACTIVE',
    universityId: 'aau',
    avatarUrl: null,
    language: 'en',
    lastActiveAt: now,
    createdAt: now,
    updatedAt: now,
  };
}

/** Header stats on the My Profile screen. */
export const MOCK_PROFILE_STATS = { courses: 3, exams: 12, quizzes: 8 } as const;
