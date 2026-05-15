import type { BusinessDto } from '../types';
import { apiFetch } from './appClient';

export const businessClient = {
  getAll: (params = ''): Promise<BusinessDto[]> => apiFetch(`/business${params ? `?${params}` : ''}`, { method: 'GET', withAuth: true }),
  getOwned: (): Promise<BusinessDto[]> => apiFetch('/business/owned/my-business', { method: 'GET', withAuth: true }),
  getManaged: (): Promise<BusinessDto[]> => apiFetch('/business/managed/my-business', { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<BusinessDto> => apiFetch(`/business/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<BusinessDto> => apiFetch('/business', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  delete: (id: string): Promise<void> => apiFetch(`/business/${id}`, { method: 'DELETE', withAuth: true }),
};

export default businessClient;