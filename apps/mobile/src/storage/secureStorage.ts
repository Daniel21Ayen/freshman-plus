import * as Keychain from 'react-native-keychain';

const SERVICE = 'freshman-plus.auth';

/** Auth tokens live in the OS keychain/keystore — never in MMKV or AsyncStorage. */
export const secureStorage = {
  async setToken(token: string): Promise<void> {
    await Keychain.setGenericPassword('session', token, { service: SERVICE });
  },
  async getToken(): Promise<string | null> {
    const creds = await Keychain.getGenericPassword({ service: SERVICE });
    return creds ? creds.password : null;
  },
  async clear(): Promise<void> {
    await Keychain.resetGenericPassword({ service: SERVICE });
  },
};
