import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { Upload } from 'lucide-react-native';
import { SCREENSHOT_MAX_BYTES, SCREENSHOT_MIME_TYPES } from '@freshman-plus/constants';
import { Button, Text } from '@freshman-plus/ui';
import { formatFileSize } from '@freshman-plus/utils';
import { IconTile, Screen } from '@/components/ui';
import type { PaymentStackParamList } from '@/navigation/types';
import { screenshotPaymentService } from '@/services/payments';
import { borderRadius, colors } from '@/theme';

type Props = NativeStackScreenProps<PaymentStackParamList, 'PaymentScreenshot'>;

interface Picked { uri: string; mimeType: string; sizeBytes: number }

/** Upload Screenshot: dashed drop-card -> pick image -> preview -> "Submit for Approval". */
export function PaymentScreenshotScreen({ navigation, route }: Props) {
  const { paymentId } = route.params;
  const [picked, setPicked] = useState<Picked | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async () => {
    setError(null);
    const res = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1, quality: 0.8 });
    const asset = res.assets?.[0];
    if (!asset?.uri) return;
    const mimeType = asset.type ?? '';
    const sizeBytes = asset.fileSize ?? 0;
    if (!(SCREENSHOT_MIME_TYPES as readonly string[]).includes(mimeType)) return setError('Please choose a JPG, PNG or WebP image.');
    if (sizeBytes > SCREENSHOT_MAX_BYTES) return setError('Image must be 5 MB or smaller.');
    setPicked({ uri: asset.uri, mimeType, sizeBytes });
  };

  const submit = async () => {
    if (!picked) return;
    setBusy(true);
    setError(null);
    try {
      await screenshotPaymentService.submitScreenshot(paymentId, { uri: picked.uri });
      navigation.replace('PaymentSubmitted', { paymentId });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed. Please try again.');
      setBusy(false);
    }
  };

  return (
    <Screen title="Payment Screenshot" onBack={navigation.goBack} safeBottom>
      <View style={styles.drop}>
        {picked ? (
          <>
            <Image source={{ uri: picked.uri }} style={styles.preview} resizeMode="contain" accessibilityLabel="Selected payment screenshot" />
            <Text variant="caption" tone="muted">{formatFileSize(picked.sizeBytes)}</Text>
          </>
        ) : (
          <>
            <IconTile icon={Upload} color={colors.primary[500]} bg={colors.primary[50]} size={52} radius={14} />
            <Text variant="title">Upload Screenshot</Text>
            <Text variant="caption" tone="secondary" style={{ textAlign: 'center' }}>Take a screenshot of your payment and upload here.</Text>
          </>
        )}
      </View>

      {error ? <Text variant="caption" tone="danger">{error}</Text> : null}

      {picked ? (
        <>
          <Button label="Submit for Approval" onPress={submit} loading={busy} />
          <Button label="Choose another" variant="ghost" onPress={pick} disabled={busy} />
        </>
      ) : (
        <Button label="Upload Screenshot" onPress={pick} />
      )}

      <Pressable onPress={navigation.goBack} hitSlop={10} style={{ alignSelf: 'center', paddingVertical: 8 }}>
        <Text variant="label" tone="link">Payment Instructions</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  drop: { minHeight: 190, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 20, borderRadius: borderRadius.lg, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.primary[300], backgroundColor: colors.background.card },
  preview: { width: '100%', height: 260, borderRadius: borderRadius.md },
});
