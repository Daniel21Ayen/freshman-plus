export const CONTENT_TYPE = {
  NOTE: 'NOTE',
  AMHARIC_NOTE: 'AMHARIC_NOTE',
  MATERIAL: 'MATERIAL',
  QUIZ: 'QUIZ',
  TEST: 'TEST',
  PAST_EXAM: 'PAST_EXAM',
} as const;
export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

export const CONTENT_TYPE_LABEL: Record<ContentType, string> = {
  NOTE: 'English Notes',
  AMHARIC_NOTE: 'Amharic Notes',
  MATERIAL: 'Materials',
  QUIZ: 'Quizzes',
  TEST: 'Tests',
  PAST_EXAM: 'Past Exams',
};

/** Default prices in ETB — editable by Admin under Settings → Default Pricing. */
export const DEFAULT_PRICE_ETB: Record<ContentType, number> = {
  NOTE: 20,
  AMHARIC_NOTE: 20,
  MATERIAL: 70,
  QUIZ: 25,
  TEST: 50,
  PAST_EXAM: 50,
};

/** Access window granted after an approved payment ("Valid for 7 days"). */
export const DEFAULT_ACCESS_VALIDITY_DAYS = 7;
