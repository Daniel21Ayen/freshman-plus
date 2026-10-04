import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BookOpen, ClipboardCheck, FileText, Layers, MoreHorizontal, StickyNote, type LucideIcon } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { IconTile } from '@/components/ui';
import { borderRadius, colors, shadows } from '@/theme';

export type QuickActionKey = 'courses' | 'exams' | 'quizzes' | 'notes' | 'materials' | 'more';

const ACTIONS: Array<{ key: QuickActionKey; label: string; icon: LucideIcon; fg: string; bg: string }> = [
  { key: 'courses', label: 'My Courses', icon: BookOpen, fg: '#22C55E', bg: '#E8F8EF' },
  { key: 'exams', label: 'Past Exams', icon: FileText, fg: '#EC4899', bg: '#FDE7F3' },
  { key: 'quizzes', label: 'Quizzes', icon: ClipboardCheck, fg: '#0067F1', bg: '#EAF2FF' },
  { key: 'notes', label: 'Notes', icon: StickyNote, fg: '#F59E0B', bg: '#FFF3CF' },
  { key: 'materials', label: 'Materials', icon: Layers, fg: '#0067F1', bg: '#EAF2FF' },
  { key: 'more', label: 'More', icon: MoreHorizontal, fg: '#5B6B8C', bg: '#EEF2F8' },
];

export function QuickActions({ onPress }: { onPress: (key: QuickActionKey) => void }) {
  return (
    <View style={styles.grid}>
      {ACTIONS.map((a) => (
        <Pressable key={a.key} onPress={() => onPress(a.key)} accessibilityRole="button" style={styles.tile}>
          <IconTile icon={a.icon} color={a.fg} bg={a.bg} size={38} radius={10} />
          <Text variant="caption" style={{ fontWeight: '500' }}>{a.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  tile: {
    width: '31.5%',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md + 2,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
    ...shadows.sm,
  },
});
