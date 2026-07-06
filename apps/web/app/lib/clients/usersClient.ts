import type { UserDto } from '../types';
import { apiFetch } from './appClient';

export const usersClient = {
  getAll: async (params = ''): Promise<UserDto[]> => {
    const qs = params ? `?${params}` : '';
    return apiFetch<UserDto[]>(`/api/users${qs}`);
  },
  getById: async (id: string): Promise<UserDto> => {
    return apiFetch<UserDto>(`/api/users/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<UserDto> => {
    return apiFetch<UserDto>('/api/users', { method: 'POST', body: JSON.stringify(payload) });
  },
  update: async (id: string, payload: Record<string, any>): Promise<UserDto> => {
    return apiFetch<UserDto>(`/api/users/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) });
  },
  delete: async (id: string): Promise<void> => {
    await apiFetch<void>(`/api/users/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};

export default usersClient;
