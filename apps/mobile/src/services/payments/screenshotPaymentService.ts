import { DEFAULT_ACCESS_VALIDITY_DAYS, PAYMENT_STATUS } from '@freshman-plus/constants';
import type { Payment, PaymentMethod } from '@freshman-plus/types';
import { PAYMENT_METHODS } from '@/data';
import { delay } from '@/lib/utils';
import type { PaymentItem } from '@/navigation/types';

export interface PaymentRecord extends Payment {
  itemTitle: string;
  courseId: string;
}

/** DEV ONLY: a submitted payment flips to APPROVED after this long, standing in for the admin. */
const MOCK_AUTO_APPROVE_MS = 20_000;

const payments = new Map<string, PaymentRecord>();
const byIdempotencyKey = new Map<string, string>();
const entitlements = new Map<string, number>(); // `${type}:${id}` -> expiresAt (ms)

const itemKey = (type: string, id: string) => `${type}:${id}`;

/**
 * MOCK implementation of the manual screenshot-payment flow:
 * create -> upload screenshot -> PENDING_APPROVAL -> (admin) APPROVED -> entitlement.
 * Swap the bodies for sdk calls (POST /payments, POST /payments/:id/screenshot, GET /payments/:id).
 */
export const screenshotPaymentService = {
  listMethods(): PaymentMethod[] {
    return PAYMENT_METHODS.filter((m) => m.status === 'ACTIVE').sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getMethod(id: string): PaymentMethod | undefined {
    return PAYMENT_METHODS.find((m) => m.id === id);
  },

  /** "Ahmed Tesfaye" -> "Ahmed123" (as shown in the Payment Details design) */
  suggestReference(fullName: string): string {
    const first = fullName.trim().split(/\s+/)[0] ?? 'Student';
    return `${first}${100 + Math.floor(Math.random() * 900)}`;
  },

  async createPayment(args: {
    userId: string;
    item: PaymentItem;
    methodId: string;
    reference: string;
    idempotencyKey: string;
  }): Promise<PaymentRecord> {
    await delay(400);
    const existingId = byIdempotencyKey.get(args.idempotencyKey);
    const existing = existingId ? payments.get(existingId) : undefined;
    if (existing) return existing;

    const now = new Date().toISOString();
    const record: PaymentRecord = {
      id: `pay-${Date.now()}`,
      userId: args.userId,
      methodId: args.methodId,
      itemType: args.item.itemType,
      itemId: args.item.itemId,
      amountEtb: args.item.amountEtb,
      reference: args.reference,
      screenshotUrl: null,
      status: PAYMENT_STATUS.AWAITING_SCREENSHOT,
      rejectionReason: null,
      submittedAt: null,
      reviewedAt: null,
      createdAt: now,
      itemTitle: args.item.title,
      courseId: args.item.courseId,
    };
    payments.set(record.id, record);
    byIdempotencyKey.set(args.idempotencyKey, record.id);
    return record;
  },

  async submitScreenshot(paymentId: string, args: { uri: string }): Promise<PaymentRecord> {
    await delay(900);
    const p = payments.get(paymentId);
    if (!p) throw new Error('Payment not found');
    const updated: PaymentRecord = {
      ...p,
      screenshotUrl: args.uri,
      status: PAYMENT_STATUS.PENDING_APPROVAL,
      submittedAt: new Date().toISOString(),
    };
    payments.set(paymentId, updated);
    return updated;
  },

  async getPayment(paymentId: string): Promise<PaymentRecord | undefined> {
    const p = payments.get(paymentId);
    if (!p) return undefined;
    if (
      p.status === PAYMENT_STATUS.PENDING_APPROVAL &&
      p.submittedAt &&
      Date.now() - new Date(p.submittedAt).getTime() > MOCK_AUTO_APPROVE_MS
    ) {
      const approved: PaymentRecord = { ...p, status: PAYMENT_STATUS.APPROVED, reviewedAt: new Date().toISOString() };
      payments.set(paymentId, approved);
      entitlements.set(
        itemKey(p.itemType, p.itemId),
        Date.now() + DEFAULT_ACCESS_VALIDITY_DAYS * 24 * 60 * 60 * 1000,
      );
      return approved;
    }
    return p;
  },

  hasAccess(itemType: string, itemId: string): boolean {
    const expiresAt = entitlements.get(itemKey(itemType, itemId));
    return expiresAt !== undefined && expiresAt > Date.now();
  },

  /** Latest payment for an item in one of the given states (used by Exam Details). */
  findPaymentForItem(userId: string, itemType: string, itemId: string): PaymentRecord | undefined {
    return [...payments.values()]
      .filter((p) => p.userId === userId && p.itemType === itemType && p.itemId === itemId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  },

  listPayments(userId: string): PaymentRecord[] {
    return [...payments.values()]
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
};
