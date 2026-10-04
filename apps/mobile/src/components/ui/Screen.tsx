import React, { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';
import { ScreenHeader, type ScreenHeaderProps } from './ScreenHeader';

export interface ScreenProps extends ScreenHeaderProps {
  children: ReactNode;
  /** Replaces the default <ScreenHeader/> (used by Home). */
  header?: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  /** Add the device's bottom inset under the footer (needed outside the tab bar). */
  safeBottom?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Blue header + rounded off-white sheet — the layout every inner screen in the design shares. */
export function Screen({ children, header, footer, scroll = true, safeBottom = false, contentStyle, ...headerProps }: ScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <View style={{ paddingTop: insets.top }}>{header ?? <ScreenHeader {...headerProps} />}</View>
      <View style={styles.sheet}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={[styles.content, contentStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
        )}
        {footer ? (
          <View style={[styles.footer, { paddingBottom: 16 + (safeBottom ? insets.bottom : 0) }]}>{footer}</View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gradients.header[0] },
  sheet: { flex: 1, backgroundColor: colors.background.app, borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  content: { padding: 16, gap: 12 },
  fill: { flex: 1 },
  footer: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: colors.background.app, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border.DEFAULT },
});
