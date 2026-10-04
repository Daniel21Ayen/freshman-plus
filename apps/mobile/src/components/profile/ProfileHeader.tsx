import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { Avatar } from '@/components/ui';
import { borderRadius, colors, shadows } from '@/theme';

export interface ProfileHeaderProps {
  fullName: string;
  stats: { courses: number; exams: number; quizzes: number };
}

export function ProfileHeader({ fullName, stats }: ProfileHeaderProps) {
  return (
    <View style={styles.root}>
      <Avatar name={fullName} size={72} />
      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text variant="h3">{fullName}</Text>
        <Text variant="caption" tone="secondary">Student</Text>
      </View>
      <View style={styles.stats}>
        {([['Courses', stats.courses], ['Exams', stats.exams], ['Quizzes', stats.quizzes]] as const).map(([label, n]) => (
          <View key={label} style={styles.stat}>
            <Text variant="h3" tone="link">{n}</Text>
            <Text variant="caption" tone="secondary">{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', gap: 12, padding: 16, backgroundColor: colors.background.card, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, ...shadows.sm },
  stats: { flexDirection: 'row', alignSelf: 'stretch', paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border.DEFAULT },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
});
