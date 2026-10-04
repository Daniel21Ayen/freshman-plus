import React, { createContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme } from './darkTheme';
import { lightTheme, type AppTheme } from './lightTheme';

export const ThemeContext = createContext<AppTheme>(lightTheme);

/** The approved designs are light-only; dark mode follows the system but can be disabled via `forceLight`. */
export function ThemeProvider({ children, forceLight = true }: { children: ReactNode; forceLight?: boolean }) {
  const scheme = useColorScheme();
  const theme = useMemo(() => (!forceLight && scheme === 'dark' ? darkTheme : lightTheme), [scheme, forceLight]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
