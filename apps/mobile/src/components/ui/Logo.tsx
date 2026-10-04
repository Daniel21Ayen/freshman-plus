import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GraduationCap } from 'lucide-react-native';
import { Text, type TextProps } from '@freshman-plus/ui';
import { colors } from '@/theme';

/** Rounded gradient tile with the graduation-cap mark. */
export function Logo({ size = 72 }: { size?: number }) {
  return (
    <LinearGradient
      colors={[colors.primary[500], '#0E9AA7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size * 0.26, alignItems: 'center', justifyContent: 'center' }}
    >
      <GraduationCap size={size * 0.55} color="#FFFFFF" strokeWidth={1.8} />
    </LinearGradient>
  );
}

/** "Freshman" + green "+" */
export function Wordmark({ size = 28, color = colors.primary[500], style }: { size?: number; color?: string; style?: TextProps['style'] }) {
  return (
    <View>
      <Text variant="h1" style={[{ fontSize: size, color, lineHeight: size * 1.2 }, style]}>
        Freshman<Text variant="h1" style={{ fontSize: size, color: colors.accent.green, lineHeight: size * 1.2 }}>+</Text>
      </Text>
    </View>
  );
}
