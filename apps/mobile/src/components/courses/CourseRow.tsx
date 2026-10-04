import React from 'react';
import { BookOpen } from 'lucide-react-native';
import { IconTile, ListItem } from '@/components/ui';
import type { CourseVM } from '@/data';
import { colors } from '@/theme';

export function CourseRow({ course, onPress }: { course: CourseVM; onPress: () => void }) {
  return (
    <ListItem
      title={course.name}
      subtitle={course.code}
      left={<IconTile icon={BookOpen} color={colors.primary[500]} bg={colors.primary[50]} />}
      onPress={onPress}
    />
  );
}
