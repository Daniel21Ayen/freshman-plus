import { z } from 'zod';
import { SCREENSHOT_MAX_BYTES, SCREENSHOT_MIME_TYPES } from '@freshman-plus/constants';

export const purchaseItemTypeSchema = z.enum(['CONTENT', 'EXAM', 'QUIZ']);

/** Step 1 — "Proceed to Pay": creates a payment awaiting a screenshot. */
export const createPaymentSchema = z.object({
  itemType: purchaseItemTypeSchema,
  itemId: z.string().uuid(),
  methodId: z.string().uuid('Select a payment method'),
  /** Client-generated; makes retries safe (no duplicate entitlements). */
  idempotencyKey: z.string().min(8).max(64),
});
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

/** Step 2 — "Upload Screenshot": reference + image metadata. The file itself is multipart. */
export const submitScreenshotSchema = z.object({
  reference: z.string().trim().min(3, 'Reference is too short').max(40),
  mimeType: z.enum(SCREENSHOT_MIME_TYPES, { errorMap: () => ({ message: 'Use a JPG, PNG or WebP image' }) }),
  sizeBytes: z.number().int().positive().max(SCREENSHOT_MAX_BYTES, 'Image must be 5 MB or smaller'),
});
export type SubmitScreenshotInput = z.infer<typeof submitScreenshotSchema>;

/** Admin → Payment Screenshot Approval */
export const reviewPaymentSchema = z.discriminatedUnion('decision', [
  z.object({ decision: z.literal('APPROVE'), note: z.string().max(200).optional() }),
  z.object({ decision: z.literal('REJECT'), reason: z.string().trim().min(5, 'Give the student a reason').max(200) }),
]);
export type ReviewPaymentInput = z.infer<typeof reviewPaymentSchema>;

/** Admin → Payment Methods / Admin Account */
export const paymentMethodSchema = z.object({
  provider: z.enum(['TELEBIRR', 'CBE_BIRR', 'MPESA', 'KACHA', 'YAYA', 'CHAPA']),
  displayName: z.string().trim().min(2).max(40),
  accountName: z.string().trim().min(2).max(80),
  accountNumber: z.string().trim().max(32).nullable().optional(),
  phoneNumber: z.string().trim().max(20).nullable().optional(),
  instructions: z.array(z.string().trim().min(1).max(200)).max(8).default([]),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});
export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;
