import type { PurchaseItemDto } from '../types';
import { apiFetch } from './appClient';

export const purchaseItemsClient = {
  getAll: (purchaseId?: string): Promise<PurchaseItemDto[]> => apiFetch(`/purchase-items${purchaseId ? `?purchaseId=${purchaseId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<PurchaseItemDto> => apiFetch('/purchase-items', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default purchaseItemsClient;