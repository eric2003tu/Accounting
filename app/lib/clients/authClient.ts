import type { AuthTokenDto, UserDto } from '../types';
import { apiFetch, setAuthToken } from './appClient';

export const authClient = {
  login: async (payload: Record<string, any>): Promise<AuthTokenDto> => {
    const res = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    if (res && res.access_token) setAuthToken(res.access_token);
    return res;
  },
  register: (payload: Record<string, any>): Promise<UserDto> => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: (): Promise<UserDto> => apiFetch('/auth/me', { method: 'GET', withAuth: true }),
};

export default authClient;