export const LANGUAGE = { EN: 'en', AM: 'am' } as const;
export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE];
export const DEFAULT_LANGUAGE: Language = LANGUAGE.EN;
export const LANGUAGE_LABEL: Record<Language, string> = { en: 'English', am: 'አማርኛ' };
