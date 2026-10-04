import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GraduationCap } from 'lucide-react-native';
import { Text } from '@freshman-plus/ui';
import { colors } from '@/theme';

export function PremiumCard({ onPress }: { onPress: () => void }) {
  return (
    <LinearGradient colors={[...colors.gradients.premium]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.root}>
      <View style={styles.icon}>
        <GraduationCap size={26} color="#FFFFFF" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="bodyStrong" tone="inverse">Upgrade to Premium</Text>
        <Text variant="caption" tone="inverse" style={{ opacity: 0.9 }}>Get unlimited access to all content</Text>
        <Pressable onPress={onPress} accessibilityRole="button" style={styles.button}>
          <Text variant="label" style={{ color: colors.primary[600] }}>Go Premium</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16 },
  icon: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  button: { alignSelf: 'flex-start', marginTop: 8, height: 30, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
});
