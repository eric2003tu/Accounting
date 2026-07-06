import type { StockMovementDto } from '../types';
import { apiFetch } from './appClient';

export const stockMovementsClient = {
  getAll: async (businessId?: string): Promise<StockMovementDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<StockMovementDto[]>(`/api/stock-movements${params}`);
  },
  create: async (payload: Record<string, any>): Promise<StockMovementDto> => {
    return apiFetch<StockMovementDto>('/api/stock-movements', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default stockMovementsClient;
