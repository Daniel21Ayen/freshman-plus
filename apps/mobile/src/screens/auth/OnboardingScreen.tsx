import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarChart3, BookOpen, Check, FileText, GraduationCap, ClipboardCheck, StickyNote, Target, type LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text } from '@freshman-plus/ui';
import { useAuth } from '@/context';
import type { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const { width: SCREEN_W } = Dimensions.get('window');

interface Slide {
  key: string;
  title: string;
  body: string;
  hero: LucideIcon;
  tiles: Array<{ icon: LucideIcon; fg: string; bg: string; style: { top?: number; bottom?: number; left?: number; right?: number } }>;
}

const SLIDES: Slide[] = [
  {
    key: 'study',
    title: 'Study Smarter',
    body: 'Access notes, past exams, quizzes and more — all in one place.',
    hero: GraduationCap,
    tiles: [
      { icon: BookOpen, fg: '#0067F1', bg: '#EAF2FF', style: { top: 12, left: 24 } },
      { icon: BarChart3, fg: '#0067F1', bg: '#EAF2FF', style: { top: 36, right: 20 } },
      { icon: FileText, fg: '#22C55E', bg: '#E8F8EF', style: { bottom: 28, left: 40 } },
    ],
  },
  {
    key: 'everything',
    title: 'Everything You Need',
    body: 'Get course materials, past exams, quizzes, notes and more for your university courses.',
    hero: BookOpen,
    tiles: [
      { icon: GraduationCap, fg: '#0067F1', bg: '#EAF2FF', style: { top: 4, left: 110 } },
      { icon: FileText, fg: '#22C55E', bg: '#E8F8EF', style: { top: 70, left: 12 } },
      { icon: ClipboardCheck, fg: '#7C5CFA', bg: '#F0E9FE', style: { top: 70, right: 12 } },
      { icon: StickyNote, fg: '#F59E0B', bg: '#FFF3CF', style: { bottom: 18, right: 52 } },
    ],
  },
  {
    key: 'goals',
    title: 'Achieve Your Goals',
    body: 'Track your progress, improve performance and reach your academic dreams.',
    hero: Target,
    tiles: [
      { icon: Check, fg: '#22C55E', bg: '#E8F8EF', style: { top: 16, right: 30 } },
      { icon: BarChart3, fg: '#0067F1', bg: '#EAF2FF', style: { bottom: 24, left: 24 } },
    ],
  },
];

/**
 * 3-slide onboarding. Illustrations are composed from icon tiles — swap `Slide.hero/tiles`
 * for the exported artwork (assets/onboarding/*.png) when the design files are available.
 */
export function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const last = index === SLIDES.length - 1;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));

  const next = () => {
    if (last) {
      completeOnboarding();
      navigation.replace('Login');
    } else {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, i) => ({ length: SCREEN_W, offset: SCREEN_W * i, index: i })}
        renderItem={({ item }) => {
          const Hero = item.hero;
          return (
            <View style={styles.slide}>
              <View style={styles.art}>
                <View style={styles.disc}>
                  <Hero size={84} color={colors.primary[500]} strokeWidth={1.4} />
                </View>
                {item.tiles.map((t, i) => (
                  <View key={i} style={[styles.tile, { backgroundColor: t.bg }, t.style]}>
                    <t.icon size={22} color={t.fg} />
                  </View>
                ))}
              </View>
              <Text variant="h2" style={styles.title}>{item.title}</Text>
              <Text variant="body" tone="secondary" style={styles.body}>{item.body}</Text>
            </View>
          );
        }}
      />
      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View key={s.key} style={[styles.dot, i === index && styles.dotOn]} />
        ))}
      </View>
      <View style={{ paddingHorizontal: 24 }}>
        <Button label={last ? 'Get Started' : 'Next'} onPress={next} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background.card },
  slide: { width: SCREEN_W, alignItems: 'center', paddingHorizontal: 32, paddingTop: 40, gap: 12 },
  art: { width: 280, height: 280, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  disc: { width: 220, height: 220, borderRadius: 110, backgroundColor: colors.primary[50], alignItems: 'center', justifyContent: 'center' },
  tile: { position: 'absolute', width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center' },
  body: { textAlign: 'center', lineHeight: 21 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 20 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border.strong },
  dotOn: { width: 18, backgroundColor: colors.primary[500] },
});
