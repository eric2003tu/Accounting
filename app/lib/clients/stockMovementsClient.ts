import type { StockMovementDto } from '../types';
import { apiFetch } from './appClient';

export const stockMovementsClient = {
  getAll: (businessId?: string): Promise<StockMovementDto[]> => apiFetch(`/stock-movements${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<StockMovementDto> => apiFetch('/stock-movements', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default stockMovementsClient;