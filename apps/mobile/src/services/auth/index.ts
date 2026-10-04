import type { AuthSession } from '@freshman-plus/types';
import type { LoginInput, RegisterInput } from '@freshman-plus/validation';
import { buildMockUser } from '@/data';
import { delay } from '@/lib/utils';

/** MOCK — swap for sdk calls (POST /auth/login, /auth/register). Role always comes from the server. */
export const authService = {
  async login(input: LoginInput): Promise<AuthSession> {
    await delay(600);
    return {
      user: buildMockUser({ identifier: input.identifier }),
      tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
    };
  },
  async register(input: RegisterInput): Promise<AuthSession> {
    await delay(800);
    return {
      user: buildMockUser({ identifier: input.identifier, fullName: input.fullName }),
      tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
    };
  },
};
