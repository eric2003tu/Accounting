import type { SaleItemDto } from '../types';
import { apiFetch } from './appClient';

export const saleItemsClient = {
  getAll: async (saleId?: string): Promise<SaleItemDto[]> => {
    return saleId ? apiFetch<SaleItemDto[]>(`/api/sales/${encodeURIComponent(saleId)}/items`) : Promise.resolve([]);
  },
  create: async (payload: Record<string, any>): Promise<SaleItemDto> => {
    return apiFetch<SaleItemDto>('/api/sale-items', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default saleItemsClient;
