import type { AuthTokenDto, UserDto } from '../types';
import { applyLoginResponse, setCurrentUser } from './appClient';
import { MOCK_USERS, MOCK_PASSWORD } from '@/app/lib/mockData';

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findMockUser(email: string): UserDto | undefined {
  return MOCK_USERS.find((u) => u.email?.toLowerCase() === email.toLowerCase());
}

export const authClient = {
  login: async (payload: Record<string, any>): Promise<AuthTokenDto> => {
    await delay();
    const { email, password } = payload;
    const user = findMockUser(email);
    if (!user || password !== MOCK_PASSWORD) {
      const err: any = new Error('Invalid email or password');
      err.status = 401;
      err.body = 'Invalid email or password';
      throw err;
    }
    const token = `mock-token-${user.id}-${Date.now()}`;
    const authResult: AuthTokenDto & { user: any } = {
      access_token: token,
      token_type: 'bearer',
      user: { ...user, id: String(user.id) },
    };
    applyLoginResponse(authResult as any);
    return authResult as AuthTokenDto;
  },
  register: async (payload: Record<string, any>): Promise<AuthTokenDto> => {
    await delay();
    const { email, first_name, last_name } = payload;
    const newUser: UserDto = {
      id: Date.now(),
      email,
      first_name: first_name || '',
      last_name: last_name || '',
      system_role: 'NORMAL',
      is_active: true,
    };
    const token = `mock-token-${newUser.id}-${Date.now()}`;
    const authResult: AuthTokenDto & { user: any } = {
      access_token: token,
      token_type: 'bearer',
      user: { ...newUser, id: String(newUser.id) },
    };
    applyLoginResponse(authResult as any);
    return authResult as AuthTokenDto;
  },
  me: async (): Promise<UserDto> => {
    await delay();
    const user = MOCK_USERS[0];
    setCurrentUser({ ...user, id: String(user.id) } as any);
    return user;
  },
};

export default authClient;
