import type { StudyFileVM } from '../types';

const MB = 1024 * 1024;

/** "Chapter 1 - Introduction · PDF • 2.4 MB" … as in the Notes viewer design. */
export const CHAPTERS: StudyFileVM[] = [
  { id: 'ch1', title: 'Chapter 1 - Introduction', sizeBytes: 2.4 * MB },
  { id: 'ch2', title: 'Chapter 2 - Arrays', sizeBytes: 1.8 * MB },
  { id: 'ch3', title: 'Chapter 3 - Linked Lists', sizeBytes: 2.1 * MB },
  { id: 'ch4', title: 'Chapter 4 - Stacks and Queues', sizeBytes: 1.6 * MB },
  { id: 'ch5', title: 'Chapter 5 - Trees', sizeBytes: 2.3 * MB },
];

export const MATERIALS: StudyFileVM[] = [
  { id: 'm1', title: 'Lecture Slides - Weeks 1-4', sizeBytes: 4.2 * MB },
  { id: 'm2', title: 'Lab Manual', sizeBytes: 3.1 * MB },
  { id: 'm3', title: 'Reference Cheat Sheet', sizeBytes: 0.9 * MB },
];
