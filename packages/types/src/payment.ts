import type { PaymentProvider, PaymentStatus, EntityStatus } from '@freshman-plus/constants';
import type { ID, ISODateString } from './common';

export type PurchaseItemType = 'CONTENT' | 'EXAM' | 'QUIZ';

/** Admin-managed account students send money to (Payment Details screen). */
export interface PaymentMethod {
  id: ID;
  provider: PaymentProvider;
  displayName: string;
  accountName: string;
  accountNumber: string | null;
  phoneNumber: string | null;
  instructions: string[];
  status: EntityStatus;
  sortOrder: number;
}

export interface Payment {
  id: ID;
  userId: ID;
  methodId: ID;
  itemType: PurchaseItemType;
  itemId: ID;
  amountEtb: number;
  /** Student-entered reference, e.g. "Ahmed123" */
  reference: string;
  screenshotUrl: string | null;
  status: PaymentStatus;
  rejectionReason: string | null;
  submittedAt: ISODateString | null;
  reviewedAt: ISODateString | null;
  createdAt: ISODateString;
}

/** Append-only ledger row; entitlements are derived from APPROVED events. */
export interface PaymentEvent {
  id: ID;
  paymentId: ID;
  type: 'CREATED' | 'SCREENSHOT_UPLOADED' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  actorId: ID | null;
  metadata: Record<string, unknown> | null;
  createdAt: ISODateString;
}
