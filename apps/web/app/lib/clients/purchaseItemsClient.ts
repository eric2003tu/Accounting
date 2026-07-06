import type { PurchaseItemDto } from '../types';
import { apiFetch } from './appClient';

export const purchaseItemsClient = {
  getAll: async (purchaseId?: string): Promise<PurchaseItemDto[]> => {
    return purchaseId ? apiFetch<PurchaseItemDto[]>(`/api/purchases/${encodeURIComponent(purchaseId)}/items`) : Promise.resolve([]);
  },
  create: async (payload: Record<string, any>): Promise<PurchaseItemDto> => {
    return apiFetch<PurchaseItemDto>('/api/purchase-items', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default purchaseItemsClient;
