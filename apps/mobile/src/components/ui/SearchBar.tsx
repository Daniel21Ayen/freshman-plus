import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { borderRadius, colors } from '@/theme';

export interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChangeText?: (v: string) => void;
  /** When set the bar is a tappable fake input (Home -> Search screen). */
  onPress?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ placeholder, value, onChangeText, onPress, autoFocus }: SearchBarProps) {
  const body = (
    <View style={styles.root}>
      <Search size={18} color={colors.text.muted} />
      {onPress ? (
        <Text variant="body" tone="muted" style={styles.flex}>{placeholder}</Text>
      ) : (
        <TextInput
          style={[styles.flex, styles.input]}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={value ?? ''}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
      )}
    </View>
  );
  return onPress ? <Pressable onPress={onPress} accessibilityRole="search">{body}</Pressable> : body;
}

const styles = StyleSheet.create({
  root: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
  },
  flex: { flex: 1 },
  input: { fontSize: 14, color: colors.text.primary, paddingVertical: 0 },
});
