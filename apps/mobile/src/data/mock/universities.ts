import { SEED_UNIVERSITIES } from '@freshman-plus/constants';
import type { UniversityVM } from '../types';

export const UNIVERSITIES: UniversityVM[] = SEED_UNIVERSITIES.map((u) => ({
  id: u.abbreviation.toLowerCase(),
  name: u.name,
  abbreviation: u.abbreviation,
}));

/** Crest placeholders until the real university logos are uploaded via Admin → Universities. */
export const UNIVERSITY_COLORS: Record<string, string> = {
  AAU: '#B91C1C',
  HU: '#15803D',
  MU: '#B45309',
  BDU: '#1D4ED8',
  JU: '#0F766E',
  WU: '#7C3AED',
};
