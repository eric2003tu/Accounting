import type { SaleDto } from '../types';
import { apiFetch } from './appClient';

export const salesClient = {
  getAll: async (businessId?: string): Promise<SaleDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<SaleDto[]>(`/api/sales${params}`);
  },
  getById: async (id: string): Promise<SaleDto> => {
    return apiFetch<SaleDto>(`/api/sales/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<SaleDto> => {
    return apiFetch<SaleDto>('/api/sales', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default salesClient;
