import type { SaleDto, SaleItemDto } from '../types';
import { apiFetch } from './appClient';

export const salesClient = {
  getAll: (businessId?: string): Promise<SaleDto[]> => apiFetch(`/sales${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<SaleDto> => apiFetch(`/sales/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<SaleDto> => apiFetch('/sales', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default salesClient;