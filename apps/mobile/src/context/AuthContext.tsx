import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@freshman-plus/types';
import type { LoginInput, RegisterInput } from '@freshman-plus/validation';
import { STORAGE_KEYS } from '@/lib/constants';
import { delay } from '@/lib/utils';
import { authService } from '@/services/auth';
import { mmkv, secureStorage } from '@/storage';

export type AuthStatus = 'booting' | 'unauthenticated' | 'authenticated';

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  hasSeenOnboarding: boolean;
  /** True when a signed-in session was invalidated -> Auth stack opens on "Locked Content". */
  sessionExpired: boolean;
  completeOnboarding: () => void;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  expireSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Splash is shown at least this long, even when restore is instant. */
const SPLASH_MIN_MS = 1800;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('booting');
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenOnboarding, setSeen] = useState<boolean>(mmkv.getBoolean(STORAGE_KEYS.onboardingSeen) ?? false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [token] = await Promise.all([secureStorage.getToken().catch(() => null), delay(SPLASH_MIN_MS)]);
      const raw = mmkv.getString(STORAGE_KEYS.user);
      if (cancelled) return;
      if (token && raw) {
        setUser(JSON.parse(raw) as User);
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (session: { user: User; tokens: { accessToken: string } }) => {
    await secureStorage.setToken(session.tokens.accessToken);
    mmkv.set(STORAGE_KEYS.user, JSON.stringify(session.user));
    setUser(session.user);
    setSessionExpired(false);
    setStatus('authenticated');
  }, []);

  const clear = useCallback(async () => {
    await secureStorage.clear().catch(() => undefined);
    mmkv.delete(STORAGE_KEYS.user);
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      hasSeenOnboarding,
      sessionExpired,
      completeOnboarding: () => {
        mmkv.set(STORAGE_KEYS.onboardingSeen, true);
        setSeen(true);
      },
      login: async (input) => persist(await authService.login(input)),
      register: async (input) => persist(await authService.register(input)),
      logout: async () => {
        setSessionExpired(false);
        await clear();
      },
      expireSession: async () => {
        setSessionExpired(true);
        await clear();
      },
    }),
    [status, user, hasSeenOnboarding, sessionExpired, persist, clear],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
