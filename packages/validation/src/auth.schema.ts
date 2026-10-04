import { z } from 'zod';

/** Ethiopian mobile numbers: 09XXXXXXXX, 07XXXXXXXX, +2519XXXXXXXX */
export const ethiopianPhone = z
  .string()
  .regex(/^(?:\+251|251|0)?[79]\d{8}$/, 'Enter a valid Ethiopian phone number');

/** The design uses a single "Email or Phone Number" field. */
export const identifierSchema = z.union([z.string().email('Enter a valid email'), ethiopianPhone]);

export const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .max(72, 'At most 72 characters')
  .regex(/[A-Za-z]/, 'Include at least one letter')
  .regex(/\d/, 'Include at least one number');

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Full name is required').max(80),
    identifier: identifierSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({ identifier: identifierSchema });
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const otpSchema = z.object({
  identifier: identifierSchema,
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
});
export type OtpInput = z.infer<typeof otpSchema>;
