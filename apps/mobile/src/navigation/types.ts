import type { NavigatorScreenParams } from '@react-navigation/native';

/** What the student is paying for — carried through the whole payment flow. */
export interface PaymentItem {
  itemType: 'CONTENT' | 'EXAM' | 'QUIZ';
  itemId: string;
  courseId: string;
  title: string;
  amountEtb: number;
}

export type PaymentStackParamList = {
  PaymentMethods: { item: PaymentItem };
  PaymentDetails: { item: PaymentItem; methodId: string };
  PaymentScreenshot: { paymentId: string; methodId: string };
  PaymentSubmitted: { paymentId: string };
  PendingApproval: { paymentId: string };
  AccessGranted: { paymentId: string };
};

export type CoursesStackParamList = {
  SelectUniversity: undefined;
  SelectCourse: { universityId: string };
  CourseMenu: { courseId: string };
  NotesViewer: { courseId: string; language: 'en' | 'am' };
  Materials: { courseId: string };
  Quizzes: { courseId: string; kind?: 'QUIZ' | 'TEST' };
  PastExams: { courseId: string; examType?: 'MIDTERM' | 'FINAL' };
  ExamDetails: { examId: string };
  MyCourses: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  PaymentHistory: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  CoursesTab: NavigatorScreenParams<CoursesStackParamList> | undefined;
  LibraryTab: undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  LockedContent: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  Payment: NavigatorScreenParams<PaymentStackParamList>;
};
