import type { ContentType, Language, PublishStatus } from '@freshman-plus/constants';
import type { ID, Timestamps } from './common';

export interface Content extends Timestamps {
  id: ID;
  courseId: ID;
  chapterId: ID | null;
  type: ContentType;
  language: Language;
  title: string;
  fileUrl: string | null;
  fileSizeBytes: number | null;
  version: number;
  priceEtb: number;
  isFree: boolean;
  status: PublishStatus;
}
