import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { Lock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text } from '@freshman-plus/ui';
import type { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'LockedContent'>;

/** Shown when a session expires (or a protected link is opened signed-out). */
export function LockedContentScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={[colors.primary[700], colors.primary[500]]} style={[styles.root, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
      {/* faux blurred content behind the gate */}
      <View style={styles.ghosts} pointerEvents="none">
        <View style={styles.ghost} />
        <View style={[styles.ghost, { opacity: 0.12 }]} />
      </View>

      <View style={styles.center}>
        <View style={styles.lock}>
          <Lock size={30} color={colors.primary[500]} />
        </View>
        <Text variant="h3" tone="inverse" style={{ textAlign: 'center' }}>Please Login to Access{'\n'}This Content</Text>
        <Text variant="body" tone="inverse" style={{ opacity: 0.85, textAlign: 'center' }}>You need to be logged in to view this resource.</Text>
      </View>

      <View style={{ gap: 12 }}>
        <Button label="Login" onPress={() => navigation.navigate('Login')} />
        <Button label="Sign Up" variant="outline" onPress={() => navigation.navigate('Register')} style={styles.signUp} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 24 },
  ghosts: { ...StyleSheet.absoluteFillObject, padding: 24, paddingTop: 120, gap: 16 },
  ghost: { height: 120, borderRadius: 16, backgroundColor: '#FFFFFF', opacity: 0.2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  lock: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  signUp: { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' },
});
