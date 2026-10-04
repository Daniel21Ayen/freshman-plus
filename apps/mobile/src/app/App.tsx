import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context';
import { colors, ThemeProvider } from '@/theme';
import { linking } from './linking';
import { RootNavigator } from './RootNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background.app, card: colors.background.card, primary: colors.primary[500], text: colors.text.primary, border: colors.border.DEFAULT },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
          <NavigationContainer theme={navTheme} linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
