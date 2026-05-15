import type { PurchaseDto, PurchaseItemDto } from '../types';
import { apiFetch } from './appClient';

export const purchasesClient = {
  getAll: (businessId?: string): Promise<PurchaseDto[]> => apiFetch(`/purchases${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<PurchaseDto> => apiFetch(`/purchases/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<PurchaseDto> => apiFetch('/purchases', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default purchasesClient;