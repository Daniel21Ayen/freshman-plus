import React from 'react';
import { FileText } from 'lucide-react-native';
import { formatFileSize } from '@freshman-plus/utils';
import { IconTile, ListItem } from '@/components/ui';
import type { StudyFileVM } from '@/data';
import { colors } from '@/theme';

export function StudyFileRow({ file, onPress }: { file: StudyFileVM; onPress: () => void }) {
  return (
    <ListItem
      title={file.title}
      subtitle={`PDF • ${formatFileSize(file.sizeBytes)}`}
      left={<IconTile icon={FileText} color={colors.danger.DEFAULT} bg={colors.danger.light} />}
      onPress={onPress}
    />
  );
}
