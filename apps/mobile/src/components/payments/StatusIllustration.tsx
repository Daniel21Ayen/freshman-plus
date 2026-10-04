import React from 'react';
import { View } from 'react-native';
import { Check, Clock, FileText } from 'lucide-react-native';
import { Confetti } from '@/components/ui';
import { colors } from '@/theme';

export function SuccessIllustration() {
  return (
    <View style={{ width: '100%', height: 190, alignItems: 'center', justifyContent: 'center' }}>
      <Confetti />
      <View style={{ width: 92, height: 92, borderRadius: 46, backgroundColor: colors.success.DEFAULT, alignItems: 'center', justifyContent: 'center' }}>
        <Check size={50} color="#FFFFFF" strokeWidth={3} />
      </View>
    </View>
  );
}

export function PendingIllustration() {
  return (
    <View style={{ width: '100%', height: 190, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 110, height: 124, borderRadius: 16, backgroundColor: colors.primary[50], borderWidth: 2, borderColor: colors.primary[200], alignItems: 'center', justifyContent: 'center' }}>
        <FileText size={54} color={colors.primary[500]} strokeWidth={1.6} />
      </View>
      <View style={{ position: 'absolute', right: '28%', bottom: 26, width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary[500], alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' }}>
        <Clock size={24} color="#FFFFFF" />
      </View>
    </View>
  );
}
