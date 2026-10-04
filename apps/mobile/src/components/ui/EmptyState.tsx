import React from 'react';
import { View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { IconTile } from './IconTile';
import { colors } from '@/theme';

export function EmptyState({ icon, title, message }: { icon: LucideIcon; title: string; message?: string }) {
  return (
    <View style={{ alignItems: 'center', gap: 8, paddingVertical: 48, paddingHorizontal: 24 }}>
      <IconTile icon={icon} color={colors.primary[500]} bg={colors.primary[50]} size={56} radius={16} />
      <Text variant="title">{title}</Text>
      {message ? <Text variant="body" tone="secondary" style={{ textAlign: 'center' }}>{message}</Text> : null}
    </View>
  );
}
