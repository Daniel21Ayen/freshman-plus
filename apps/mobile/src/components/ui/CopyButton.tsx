import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@freshman-plus/ui';
import { copyToClipboard } from '@/lib/utils';
import { colors } from '@/theme';

/** Small blue "Copy" pill next to the account number; flips to "Copied" for 1.5 s. */
export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Copy account number"
      onPress={() => {
        copyToClipboard(value.replace(/\s+/g, ''));
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1500);
      }}
      style={styles.root}
    >
      <Text variant="label" tone="inverse">{copied ? 'Copied' : 'Copy'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { height: 34, paddingHorizontal: 16, borderRadius: 8, backgroundColor: colors.primary[500], alignItems: 'center', justifyContent: 'center' },
});
