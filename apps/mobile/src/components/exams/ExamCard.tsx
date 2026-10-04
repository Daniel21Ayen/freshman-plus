import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FileText } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { IconTile } from '@/components/ui';
import type { ExamVM } from '@/data';
import { borderRadius, colors, shadows } from '@/theme';

export function ExamCard({ exam, onPress }: { exam: ExamVM; onPress: () => void }) {
  return (
    <View style={styles.root}>
      <IconTile icon={FileText} color={colors.danger.DEFAULT} bg={colors.danger.light} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="bodyStrong" numberOfLines={1}>{exam.title}</Text>
        <Text variant="caption" tone="secondary">{exam.academicYear}</Text>
        <Text variant="caption" tone="muted">PDF • {exam.questionCount} Questions</Text>
      </View>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`View ${exam.title} ${exam.academicYear}`} style={styles.view}>
        <Text variant="label" tone="link">View</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, backgroundColor: colors.background.card, borderRadius: borderRadius.md + 2, borderWidth: 1, borderColor: colors.border.DEFAULT, ...shadows.sm },
  view: { height: 32, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.primary[500], alignItems: 'center', justifyContent: 'center' },
});
