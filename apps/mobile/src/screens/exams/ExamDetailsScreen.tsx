import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, Clock, ShieldCheck } from 'lucide-react-native';
import { formatETB } from '@freshman-plus/utils';
import { Button, Text } from '@freshman-plus/ui';
import { UniversityCrest } from '@/components/courses';
import { Screen } from '@/components/ui';
import { useAuth } from '@/context';
import { useRootNavigation } from '@/navigation';
import type { CoursesStackParamList } from '@/navigation/types';
import { catalogService } from '@/services/catalog';
import { screenshotPaymentService } from '@/services/payments';
import { borderRadius, colors, shadows } from '@/theme';

type Props = NativeStackScreenProps<CoursesStackParamList, 'ExamDetails'>;
type AccessState = 'locked' | 'pending' | 'granted';

export function ExamDetailsScreen({ navigation, route }: Props) {
  const root = useRootNavigation();
  const { user } = useAuth();
  const exam = catalogService.getExam(route.params.examId);
  const course = exam ? catalogService.getCourse(exam.courseId) : undefined;
  const university = course ? catalogService.getUniversity(course.universityId) : undefined;

  const [access, setAccess] = useState<AccessState>('locked');
  const [pendingId, setPendingId] = useState<string | null>(null);

  // Re-evaluate whenever the screen regains focus (e.g. returning from the payment flow).
  useFocusEffect(
    useCallback(() => {
      if (!exam || !user) return;
      if (screenshotPaymentService.hasAccess('EXAM', exam.id)) return setAccess('granted');
      const p = screenshotPaymentService.findPaymentForItem(user.id, 'EXAM', exam.id);
      if (p && (p.status === 'PENDING_APPROVAL' || p.status === 'AWAITING_SCREENSHOT')) {
        setPendingId(p.id);
        return setAccess('pending');
      }
      setAccess('locked');
    }, [exam, user]),
  );

  if (!exam) return <Screen title="Exam" onBack={navigation.goBack}><Text>Exam not found.</Text></Screen>;

  const item = { itemType: 'EXAM', itemId: exam.id, courseId: exam.courseId, title: `${exam.title} ${exam.academicYear}`, amountEtb: exam.priceEtb } as const;

  const preview = [
    'Multiple choice questions',
    `Time limit: ${exam.durationMinutes ?? 90} minutes`,
    'PDF download after payment',
    `Valid for ${exam.validityDays} days`,
  ];

  return (
    <Screen title={exam.title} onBack={navigation.goBack}>
      <View style={styles.card}>
        <UniversityCrest abbreviation={university?.abbreviation ?? 'AAU'} size={52} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="bodyStrong">{catalogService.department}</Text>
          <Text variant="caption" tone="secondary">{university?.name}</Text>
          <Text variant="caption" tone="muted">{exam.academicYear} • {exam.questionCount} Questions</Text>
        </View>
      </View>

      <View style={styles.price}>
        <Text variant="h2">{formatETB(exam.priceEtb)}</Text>
      </View>

      {access === 'locked' ? (
        <Button label="Pay Now" onPress={() => root.navigate('Payment', { screen: 'PaymentMethods', params: { item } })} />
      ) : null}
      {access === 'pending' && pendingId ? (
        <Button
          label="Payment Pending — View Status"
          variant="outline"
          leftSlot={<Clock size={18} color={colors.primary[500]} />}
          onPress={() => root.navigate('Payment', { screen: 'PendingApproval', params: { paymentId: pendingId } })}
        />
      ) : null}
      {access === 'granted' ? (
        <View style={styles.granted}>
          <ShieldCheck size={20} color={colors.success.dark} />
          <Text variant="bodyStrong" style={{ color: colors.success.dark }}>Access granted • valid for {exam.validityDays} days</Text>
        </View>
      ) : null}

      <Text variant="title" style={{ marginTop: 8 }}>Exam Preview</Text>
      <View style={{ gap: 12 }}>
        {preview.map((line) => (
          <View key={line} style={styles.line}>
            <View style={styles.tick}><Check size={12} color={colors.primary[500]} strokeWidth={3} /></View>
            <Text variant="body">{line}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.background.card, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, ...shadows.sm },
  price: { alignItems: 'center', paddingVertical: 18, borderRadius: borderRadius.md, backgroundColor: colors.primary[50] },
  granted: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderRadius: borderRadius.md, backgroundColor: colors.success.light },
  line: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tick: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: colors.primary[500], alignItems: 'center', justifyContent: 'center' },
});
