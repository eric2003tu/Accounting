import type { PurchaseDto, PurchaseItemDto } from '../types';
import { MOCK_PURCHASES, generateId } from '@/app/lib/mockData';

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const purchasesClient = {
  getAll: async (businessId?: string): Promise<PurchaseDto[]> => {
    await delay();
    if (!businessId) return MOCK_PURCHASES;
    return MOCK_PURCHASES.filter((p) => String(p.business_id) === businessId);
  },
  getById: async (id: string): Promise<PurchaseDto> => {
    await delay();
    const purchase = MOCK_PURCHASES.find((p) => String(p.id) === id);
    if (!purchase) throw Object.assign(new Error('Purchase not found'), { status: 404 });
    return purchase;
  },
  create: async (payload: Record<string, any>): Promise<PurchaseDto> => {
    await delay();
    return { id: generateId(), ...payload, purchase_date: new Date().toISOString().slice(0, 10), status: 'pending' } as PurchaseDto;
  },
};

export default purchasesClient;
