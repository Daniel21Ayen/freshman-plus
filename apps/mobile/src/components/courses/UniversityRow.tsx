import React from 'react';
import { View } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { ListItem } from '@/components/ui';
import { UNIVERSITY_COLORS, type UniversityVM } from '@/data';

export function UniversityCrest({ abbreviation, size = 44 }: { abbreviation: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: UNIVERSITY_COLORS[abbreviation] ?? '#0067F1', alignItems: 'center', justifyContent: 'center' }}>
      <Text variant="caption" tone="inverse" style={{ fontWeight: '700', fontSize: size * 0.26 }}>{abbreviation}</Text>
    </View>
  );
}

export function UniversityRow({ university, onPress }: { university: UniversityVM; onPress: () => void }) {
  return (
    <ListItem
      title={university.name}
      subtitle={university.abbreviation}
      left={<UniversityCrest abbreviation={university.abbreviation} />}
      right={null}
      onPress={onPress}
    />
  );
}
