import type { WarehouseDto } from '../types';
import { MOCK_WAREHOUSES, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const warehousesClient = {
  getAll: async (businessId?: string): Promise<WarehouseDto[]> => {
    await delay();
    if (!businessId) return MOCK_WAREHOUSES;
    return MOCK_WAREHOUSES.filter((w) => String(w.business_id) === businessId);
  },
  getById: async (id: string): Promise<WarehouseDto> => {
    await delay();
    const warehouse = MOCK_WAREHOUSES.find((w) => String(w.id) === id);
    if (!warehouse) throw Object.assign(new Error('Warehouse not found'), { status: 404 });
    return warehouse;
  },
  create: async (payload: Record<string, any>): Promise<WarehouseDto> => {
    await delay();
    return { id: generateId(), ...payload } as WarehouseDto;
  },
};

export default warehousesClient;
