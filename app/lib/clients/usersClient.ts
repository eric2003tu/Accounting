import type { UserDto } from '../types';
import { apiFetch } from './appClient';

export const usersClient = {
  create: (payload: Record<string, any>): Promise<UserDto> => apiFetch('/users', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  getAll: (params = ''): Promise<UserDto[]> => apiFetch(`/users${params ? `?${params}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<UserDto> => apiFetch(`/users/${id}`, { method: 'GET', withAuth: true }),
  update: (id: string, payload: Record<string, any>): Promise<UserDto> => apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(payload), withAuth: true }),
  delete: (id: string): Promise<void> => apiFetch(`/users/${id}`, { method: 'DELETE', withAuth: true }),
};

export default usersClient;