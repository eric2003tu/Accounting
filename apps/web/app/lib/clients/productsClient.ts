import type { ProductDto } from '../types';
import { apiFetch } from './appClient';

export const productsClient = {
  getAll: async (businessId?: string): Promise<ProductDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<ProductDto[]>(`/api/products${params}`);
  },
  getById: async (id: string): Promise<ProductDto> => {
    return apiFetch<ProductDto>(`/api/products/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<ProductDto> => {
    return apiFetch<ProductDto>('/api/products', { method: 'POST', body: JSON.stringify(payload) });
  },
  update: async (id: string, payload: Record<string, any>): Promise<ProductDto> => {
    return apiFetch<ProductDto>(`/api/products/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) });
  },
  delete: async (id: string): Promise<void> => {
    await apiFetch<void>(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};

export default productsClient;
