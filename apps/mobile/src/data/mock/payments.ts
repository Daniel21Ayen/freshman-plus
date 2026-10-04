import type { PaymentMethodVM } from '../types';

const STEPS = [
  'Open the payment app.',
  'Send the exact amount shown.',
  'Use your name as the reference.',
  'Upload the screenshot for approval.',
];

/**
 * MOCK — real accounts come from Admin → Payment Methods (GET /payments/methods).
 * Telebirr / CBE Birr values are the ones shown in the approved designs.
 */
export const PAYMENT_METHODS: PaymentMethodVM[] = [
  { id: 'pm-telebirr', provider: 'TELEBIRR', displayName: 'Telebirr', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: '0912 345678', instructions: STEPS, status: 'ACTIVE', sortOrder: 1 },
  { id: 'pm-cbe', provider: 'CBE_BIRR', displayName: 'CBE Birr', accountName: 'Freshman+ Learning Platform', accountNumber: '1000 1234 5678', phoneNumber: null, instructions: STEPS, status: 'ACTIVE', sortOrder: 2 },
  { id: 'pm-mpesa', provider: 'MPESA', displayName: 'M-PESA', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: '0712 345678', instructions: STEPS, status: 'ACTIVE', sortOrder: 3 },
  { id: 'pm-kacha', provider: 'KACHA', displayName: 'Kacha', accountName: 'Freshman+ Admin', accountNumber: '2000 5555 0001', phoneNumber: null, instructions: STEPS, status: 'ACTIVE', sortOrder: 4 },
  { id: 'pm-yaya', provider: 'YAYA', displayName: 'Yaya', accountName: 'Freshman+ Admin', accountNumber: '3000 7777 0002', phoneNumber: null, instructions: STEPS, status: 'ACTIVE', sortOrder: 5 },
  { id: 'pm-chapa', provider: 'CHAPA', displayName: 'Chapa', accountName: 'Freshman+ Admin', accountNumber: '4000 9999 0003', phoneNumber: null, instructions: STEPS, status: 'ACTIVE', sortOrder: 6 },
];
