import React from 'react';
import { View } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { getInitials } from '@freshman-plus/utils';
import { colors } from '@/theme';

export function Avatar({ name, size = 40, bg = colors.primary[500] }: { name: string; size?: number; bg?: string }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text variant="title" tone="inverse" style={{ fontSize: size * 0.4 }}>{getInitials(name).charAt(0)}</Text>
    </View>
  );
}
