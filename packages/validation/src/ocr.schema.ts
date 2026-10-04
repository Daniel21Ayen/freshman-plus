import { z } from 'zod';
import { questionSchema } from './exam.schema';

/** One row in Admin → Exams → OCR review table, before it becomes a Question. */
export const ocrQuestionDraftSchema = z.object({
  number: z.number().int().positive(),
  text: z.string(),
  options: z.array(z.string()),
  answerIndex: z.number().int().min(0).nullable(),
  confidence: z.number().min(0).max(1),
  needsReview: z.boolean().default(false),
});
export type OcrQuestionDraft = z.infer<typeof ocrQuestionDraftSchema>;

export const ocrReviewSubmitSchema = z.object({
  examId: z.string().uuid(),
  questions: z.array(questionSchema).min(1),
});
export type OcrReviewSubmitInput = z.infer<typeof ocrReviewSubmitSchema>;
