import type { SaleDto, SaleItemDto } from '../types';
import { MOCK_SALES, generateId } from '@/app/lib/mockData';

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const salesClient = {
  getAll: async (businessId?: string): Promise<SaleDto[]> => {
    await delay();
    if (!businessId) return MOCK_SALES;
    return MOCK_SALES.filter((s) => String(s.business_id) === businessId);
  },
  getById: async (id: string): Promise<SaleDto> => {
    await delay();
    const sale = MOCK_SALES.find((s) => String(s.id) === id);
    if (!sale) throw Object.assign(new Error('Sale not found'), { status: 404 });
    return sale;
  },
  create: async (payload: Record<string, any>): Promise<SaleDto> => {
    await delay();
    return { id: generateId(), ...payload, sale_date: new Date().toISOString().slice(0, 10), status: 'pending' } as SaleDto;
  },
};

export default salesClient;
