import type { AuthTokenDto, UserDto } from '../types';
import { apiFetch, applyLoginResponse, setCurrentUser } from './appClient';

export const authClient = {
  login: async (payload: Record<string, any>): Promise<AuthTokenDto> => {
    const res = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    applyLoginResponse(res);
    return res;
  },
  register: (payload: Record<string, any>): Promise<UserDto> => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: async (): Promise<UserDto> => {
    const user = await apiFetch('/auth/me', { method: 'GET', withAuth: true });
    setCurrentUser(user);
    return user;
  },
};

export default authClient;