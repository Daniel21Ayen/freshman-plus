import type { ID, ISODateString } from './common';

export type NotificationKind = 'ANNOUNCEMENT' | 'PAYMENT' | 'CONTENT' | 'SYSTEM' | 'EXAM';
export type AnnouncementAudience = 'ALL' | 'UNIVERSITY' | 'COURSE';

export interface Notification {
  id: ID;
  userId: ID;
  kind: NotificationKind;
  title: string;
  message: string;
  readAt: ISODateString | null;
  createdAt: ISODateString;
}
