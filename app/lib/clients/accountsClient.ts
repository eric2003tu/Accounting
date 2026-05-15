import type { AccountDto } from '../types';
import { apiFetch } from './appClient';

export const accountsClient = {
  getAll: (businessId?: string): Promise<AccountDto[]> => apiFetch(`/accounts${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<AccountDto> => apiFetch(`/accounts/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<AccountDto> => apiFetch('/accounts', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default accountsClient;