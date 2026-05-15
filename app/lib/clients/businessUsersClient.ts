import type { BusinessUserDto } from '../types';
import { apiFetch } from './appClient';

export const businessUsersClient = {
  getAll: (params = ''): Promise<BusinessUserDto[]> => apiFetch(`/business-users${params ? `?${params}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<BusinessUserDto> => apiFetch('/business-users', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default businessUsersClient;