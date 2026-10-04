import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';

/** freshmanplus://course/<id> opens the course menu once the student is signed in. */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['freshmanplus://'],
  config: {
    screens: {
      Main: {
        screens: {
          CoursesTab: { screens: { CourseMenu: 'course/:courseId', ExamDetails: 'exam/:examId' } },
        },
      },
    },
  },
};
