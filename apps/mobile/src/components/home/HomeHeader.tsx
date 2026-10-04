import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { Avatar, SearchBar } from '@/components/ui';
import { colors } from '@/theme';

export interface HomeHeaderProps {
  firstName: string;
  fullName: string;
  onSearchPress: () => void;
}

export function HomeHeader({ firstName, fullName, onSearchPress }: HomeHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text variant="h3" tone="inverse">Hello, {firstName} 👋</Text>
          <Text variant="caption" tone="inverse" style={{ opacity: 0.85 }}>Welcome back!</Text>
        </View>
        <Avatar name={fullName} size={40} bg={colors.primary[300]} />
      </View>
      <SearchBar placeholder="Search courses, past exams, topics..." onPress={onSearchPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 22, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
