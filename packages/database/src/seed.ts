import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SEED_UNIVERSITIES } from '@freshman-plus/constants';

const prisma = new PrismaClient();

/** Courses shown on the "Select Course" screen (Addis Ababa University). */
const AAU_COURSES = [
  { code: 'CS101', name: 'Data Structures & Algorithms' },
  { code: 'CS102', name: 'Database Systems' },
  { code: 'CS103', name: 'Computer Networks' },
  { code: 'CS104', name: 'Operating Systems' },
  { code: 'CS105', name: 'Web Programming' },
  { code: 'CS106', name: 'Software Engineering' },
];

/** Account details from the Admin → Payment Methods design. */
const PAYMENT_METHODS = [
  { provider: 'TELEBIRR', displayName: 'Telebirr', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: '0912 345678', sortOrder: 1 },
  { provider: 'CBE_BIRR', displayName: 'CBE Birr', accountName: 'Freshman+ Learning Platform', accountNumber: '1000 1234 5678', phoneNumber: null, sortOrder: 2 },
  { provider: 'MPESA', displayName: 'M-PESA', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: null, sortOrder: 3 },
  { provider: 'KACHA', displayName: 'Kacha', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: null, sortOrder: 4 },
  { provider: 'YAYA', displayName: 'Yaya', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: null, sortOrder: 5, status: 'INACTIVE' },
  { provider: 'CHAPA', displayName: 'Chapa', accountName: 'Freshman+ Admin', accountNumber: null, phoneNumber: null, sortOrder: 6 },
] as const;

const INSTRUCTIONS = [
  'Open the payment app.',
  'Send the exact amount shown.',
  'Use your name as the reference.',
  'Upload the screenshot for approval.',
];

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@freshmanplus.et';
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!password) throw new Error('SEED_ADMIN_PASSWORD must be set to seed the admin account.');

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { fullName: 'Super Admin', email, passwordHash: await bcrypt.hash(password, 12), role: 'ADMIN' },
  });

  const universities = [];
  for (const u of SEED_UNIVERSITIES) {
    universities.push(
      await prisma.university.upsert({ where: { abbreviation: u.abbreviation }, update: {}, create: { ...u } }),
    );
  }

  const aau = universities.find((u) => u.abbreviation === 'AAU');
  if (aau) {
    for (const c of AAU_COURSES) {
      await prisma.course.upsert({
        where: { universityId_code: { universityId: aau.id, code: c.code } },
        update: {},
        create: { universityId: aau.id, code: c.code, name: c.name, semester: 'FIRST' },
      });
    }
  }

  for (const m of PAYMENT_METHODS) {
    await prisma.paymentMethod.upsert({
      where: { provider: m.provider },
      update: {},
      create: { ...m, instructions: INSTRUCTIONS },
    });
  }

  console.log('✔ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
