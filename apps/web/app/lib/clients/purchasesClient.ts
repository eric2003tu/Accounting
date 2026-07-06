import type { PurchaseDto } from '../types';
import { apiFetch } from './appClient';

export const purchasesClient = {
  getAll: async (businessId?: string): Promise<PurchaseDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<PurchaseDto[]>(`/api/purchases${params}`);
  },
  getById: async (id: string): Promise<PurchaseDto> => {
    return apiFetch<PurchaseDto>(`/api/purchases/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<PurchaseDto> => {
    return apiFetch<PurchaseDto>('/api/purchases', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default purchasesClient;
