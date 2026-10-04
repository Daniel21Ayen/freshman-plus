import { z } from 'zod';
import { CONTENT_TYPE, ENTITY_STATUS, LANGUAGE, PUBLISH_STATUS, SEMESTER } from '@freshman-plus/constants';

export const universitySchema = z.object({
  name: z.string().trim().min(3).max(120),
  abbreviation: z.string().trim().min(2).max(10).toUpperCase(),
  logoUrl: z.string().url().nullable().optional(),
  status: z.nativeEnum(ENTITY_STATUS).default('ACTIVE'),
});
export type UniversityInput = z.infer<typeof universitySchema>;

export const courseSchema = z.object({
  universityId: z.string().uuid(),
  name: z.string().trim().min(3).max(120),
  code: z.string().trim().min(2).max(12).toUpperCase(),
  semester: z.nativeEnum(SEMESTER),
  status: z.nativeEnum(ENTITY_STATUS).default('ACTIVE'),
});
export type CourseInput = z.infer<typeof courseSchema>;

export const chapterSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().trim().min(2).max(120),
  order: z.number().int().min(0),
});
export type ChapterInput = z.infer<typeof chapterSchema>;

export const contentSchema = z.object({
  courseId: z.string().uuid(),
  chapterId: z.string().uuid().nullable().optional(),
  type: z.nativeEnum(CONTENT_TYPE),
  language: z.nativeEnum(LANGUAGE).default('en'),
  title: z.string().trim().min(2).max(160),
  priceEtb: z.number().min(0).max(100000),
  isFree: z.boolean().default(false),
  status: z.nativeEnum(PUBLISH_STATUS).default('DRAFT'),
});
export type ContentInput = z.infer<typeof contentSchema>;
