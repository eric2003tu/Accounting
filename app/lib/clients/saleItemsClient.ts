import type { SaleItemDto } from '../types';
import { apiFetch } from './appClient';

export const saleItemsClient = {
  getAll: (saleId?: string): Promise<SaleItemDto[]> => apiFetch(`/sale-items${saleId ? `?saleId=${saleId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<SaleItemDto> => apiFetch('/sale-items', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default saleItemsClient;