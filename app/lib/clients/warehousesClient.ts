import type { WarehouseDto } from '../types';
import { apiFetch } from './appClient';

export const warehousesClient = {
  getAll: (businessId?: string): Promise<WarehouseDto[]> => apiFetch(`/warehouses${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<WarehouseDto> => apiFetch(`/warehouses/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<WarehouseDto> => apiFetch('/warehouses', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default warehousesClient;