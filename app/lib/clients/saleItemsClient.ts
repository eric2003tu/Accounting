import type { SaleItemDto } from '../types';
import { generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const saleItemsClient = {
  getAll: async (saleId?: string): Promise<SaleItemDto[]> => {
    await delay();
    return [];
  },
  create: async (payload: Record<string, any>): Promise<SaleItemDto> => {
    await delay();
    return { id: generateId(), ...payload } as SaleItemDto;
  },
};

export default saleItemsClient;
