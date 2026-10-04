import React from 'react';
import { View } from 'react-native';
import type { PaymentProvider } from '@freshman-plus/constants';
import { Text } from '@freshman-plus/ui';
import { PROVIDER_STYLE } from './providerStyle';

export function ProviderLogo({ provider, size = 36 }: { provider: PaymentProvider; size?: number }) {
  const s = PROVIDER_STYLE[provider];
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: s.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text variant="bodyStrong" tone="inverse" style={{ fontSize: size * 0.42 }}>{s.glyph}</Text>
    </View>
  );
}
