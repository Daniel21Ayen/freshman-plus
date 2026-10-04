export const API_PREFIX = '/api/v1';

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    verifyOtp: '/auth/verify-otp',
    me: '/auth/me',
  },
  universities: { list: '/universities', byId: (id: string) => `/universities/${id}` },
  courses: {
    list: '/courses',
    byId: (id: string) => `/courses/${id}`,
    chapters: (id: string) => `/courses/${id}/chapters`,
    menu: (id: string) => `/courses/${id}/menu`,
  },
  content: { list: '/content', byId: (id: string) => `/content/${id}`, download: (id: string) => `/content/${id}/download` },
  exams: { list: '/exams', byId: (id: string) => `/exams/${id}`, start: (id: string) => `/exams/${id}/start` },
  quizzes: { list: '/quizzes', byId: (id: string) => `/quizzes/${id}` },
  payments: {
    methods: '/payments/methods',
    create: '/payments',
    screenshot: (id: string) => `/payments/${id}/screenshot`,
    byId: (id: string) => `/payments/${id}`,
    mine: '/payments/me',
  },
  notifications: { list: '/notifications', read: (id: string) => `/notifications/${id}/read` },
  progress: { mine: '/progress/me' },
  sync: { push: '/sync/push', pull: '/sync/pull' },
  admin: {
    dashboard: '/admin/dashboard',
    paymentQueue: '/admin/payments',
    reviewPayment: (id: string) => `/admin/payments/${id}/review`,
    students: '/admin/students',
    reports: '/admin/reports',
  },
} as const;
