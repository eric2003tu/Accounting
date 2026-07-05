import type { PurchaseItemDto } from '../types';
import { generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const purchaseItemsClient = {
  getAll: async (purchaseId?: string): Promise<PurchaseItemDto[]> => {
    await delay();
    return [];
  },
  create: async (payload: Record<string, any>): Promise<PurchaseItemDto> => {
    await delay();
    return { id: generateId(), ...payload } as PurchaseItemDto;
  },
};

export default purchaseItemsClient;
