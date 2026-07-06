import type { WarehouseDto } from '../types';
import { apiFetch } from './appClient';

export const warehousesClient = {
  getAll: async (businessId?: string): Promise<WarehouseDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<WarehouseDto[]>(`/api/warehouses${params}`);
  },
  getById: async (id: string): Promise<WarehouseDto> => {
    return apiFetch<WarehouseDto>(`/api/warehouses/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<WarehouseDto> => {
    return apiFetch<WarehouseDto>('/api/warehouses', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default warehousesClient;
