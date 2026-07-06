import type { AccountDto } from '../types';
import { apiFetch } from './appClient';

export const accountsClient = {
  getAll: async (businessId?: string): Promise<AccountDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<AccountDto[]>(`/api/accounts${params}`);
  },
  getById: async (id: string): Promise<AccountDto> => {
    return apiFetch<AccountDto>(`/api/accounts/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<AccountDto> => {
    return apiFetch<AccountDto>('/api/accounts', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default accountsClient;
