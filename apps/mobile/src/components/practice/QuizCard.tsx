import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronRight, ClipboardCheck } from 'lucide-react-native';
import { Button, Text } from '@freshman-plus/ui';
import { IconTile } from '@/components/ui';
import type { QuizVM } from '@/data';
import { borderRadius, colors, shadows } from '@/theme';

export interface QuizCardProps {
  quiz: QuizVM;
  expanded: boolean;
  onToggle: () => void;
  onStart: () => void;
}

/** Accordion card: collapsed = row + chevron, expanded = row + "Start Quiz" button. */
export function QuizCard({ quiz, expanded, onToggle, onStart }: QuizCardProps) {
  return (
    <View style={[styles.root, expanded && styles.expanded]}>
      <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded }} style={styles.row}>
        <IconTile icon={ClipboardCheck} color={colors.warning.DEFAULT} bg={colors.warning.light} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="bodyStrong">{quiz.title}</Text>
          <Text variant="caption" tone="secondary">{quiz.questionCount} Questions • {quiz.durationMinutes} min</Text>
        </View>
        <ChevronRight size={18} color={colors.text.muted} style={{ transform: [{ rotate: expanded ? '90deg' : '0deg' }] }} />
      </Pressable>
      {expanded ? <Button label={quiz.kind === 'QUIZ' ? 'Start Quiz' : 'Start Test'} onPress={onStart} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 12, padding: 12, backgroundColor: colors.background.card, borderRadius: borderRadius.md + 2, borderWidth: 1, borderColor: colors.border.DEFAULT, ...shadows.sm },
  expanded: { borderColor: colors.primary[300] },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
