import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@freshman-plus/ui';
import { Logo, Wordmark } from '@/components/ui';
import { colors } from '@/theme';

/** Splash — deep-blue gradient, logo tile, "Freshman+", tagline, footer line. */
export function SplashScreen() {
  return (
    <LinearGradient colors={[...colors.gradients.splash]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.root}>
      <View style={styles.center}>
        <Logo size={96} />
        <Wordmark size={38} color="#FFFFFF" />
        <Text variant="body" tone="inverse" style={{ opacity: 0.9 }}>Learn • Practice • Excel</Text>
      </View>
      <Text variant="caption" tone="inverse" style={styles.footer}>Your University Learning Companion</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  footer: { textAlign: 'center', opacity: 0.85, paddingBottom: 48 },
});
