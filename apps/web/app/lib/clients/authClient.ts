import type { AuthTokenDto, UserDto } from '../types';
import { getAccessToken, applyLoginResponse, setCurrentUser } from './appClient';

export const authClient = {
  login: async (payload: Record<string, any>): Promise<AuthTokenDto> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const response = await fetch('/api/auth/login', { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!response.ok) {
      const error: any = new Error('Invalid email or password');
      error.status = response.status;
      error.body = await response.text();
      throw error;
    }
    const data = await response.json();
    applyLoginResponse(data);
    return data as AuthTokenDto;
  },
  register: async (payload: Record<string, any>): Promise<AuthTokenDto> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const response = await fetch('/api/auth/register', { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!response.ok) {
      const error: any = new Error('Registration failed');
      error.status = response.status;
      error.body = await response.text();
      throw error;
    }
    const data = await response.json();
    applyLoginResponse(data);
    return data as AuthTokenDto;
  },
  me: async (): Promise<UserDto> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(getAccessToken() ? { Authorization: 'Bearer ' + getAccessToken() } : {}),
    };
    const response = await fetch('/api/auth/me', { headers });
    if (!response.ok) {
      const error: any = new Error('Failed to fetch user');
      error.status = response.status;
      error.body = await response.text();
      throw error;
    }
    const data = await response.json();
    setCurrentUser(data);
    return data as UserDto;
  },
};

export default authClient;
