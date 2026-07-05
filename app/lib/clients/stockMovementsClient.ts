import type { StockMovementDto } from '../types';
import { MOCK_STOCK_MOVEMENTS, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const stockMovementsClient = {
  getAll: async (businessId?: string): Promise<StockMovementDto[]> => {
    await delay();
    if (!businessId) return MOCK_STOCK_MOVEMENTS;
    return MOCK_STOCK_MOVEMENTS.filter((s) => String(s.business_id) === businessId);
  },
  create: async (payload: Record<string, any>): Promise<StockMovementDto> => {
    await delay();
    return { id: generateId(), ...payload, created_at: new Date().toISOString() } as StockMovementDto;
  },
};

export default stockMovementsClient;
