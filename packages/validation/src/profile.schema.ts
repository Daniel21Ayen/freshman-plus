import { z } from 'zod';
import { LANGUAGE, SEMESTER } from '@freshman-plus/constants';

export const academicSetupSchema = z.object({
  universityId: z.string().uuid('Select a university'),
  department: z.string().trim().min(2).max(80).optional(),
  semester: z.nativeEnum(SEMESTER),
});
export type AcademicSetupInput = z.infer<typeof academicSetupSchema>;

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2).max(80).optional(),
  language: z.nativeEnum(LANGUAGE).optional(),
  avatarUrl: z.string().url().nullable().optional(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
