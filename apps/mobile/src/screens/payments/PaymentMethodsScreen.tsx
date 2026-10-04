import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatETB } from '@freshman-plus/utils';
import { Button, Text } from '@freshman-plus/ui';
import { PaymentMethodSelector } from '@/components/payments';
import { Screen } from '@/components/ui';
import type { PaymentStackParamList } from '@/navigation/types';
import { screenshotPaymentService } from '@/services/payments';
import { borderRadius, colors } from '@/theme';

type Props = NativeStackScreenProps<PaymentStackParamList, 'PaymentMethods'>;

/** "Payment" screen: Total Amount + Select Payment Method + Proceed to Pay. */
export function PaymentMethodsScreen({ navigation, route }: Props) {
  const { item } = route.params;
  const methods = useMemo(() => screenshotPaymentService.listMethods(), []);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Screen
      title="Payment"
      onBack={navigation.goBack}
      safeBottom
      footer={
        <Button
          label="Proceed to Pay"
          disabled={!selected}
          onPress={() => selected && navigation.navigate('PaymentDetails', { item, methodId: selected })}
        />
      }
    >
      <View style={styles.total}>
        <Text variant="caption" tone="secondary">Total Amount</Text>
        <Text variant="h3">{formatETB(item.amountEtb)}</Text>
      </View>
      <Text variant="title" style={{ marginTop: 4 }}>Select Payment Method</Text>
      <PaymentMethodSelector methods={methods} selectedId={selected} onSelect={setSelected} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  total: { gap: 2, padding: 14, backgroundColor: colors.background.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border.DEFAULT },
});
