import type { ProductDto } from '../types';
import { apiFetch } from './appClient';

export const productsClient = {
  getAll: (businessId?: string): Promise<ProductDto[]> => apiFetch(`/products${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<ProductDto> => apiFetch(`/products/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<ProductDto> => apiFetch('/products', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  update: (id: string, payload: Record<string, any>): Promise<ProductDto> => apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload), withAuth: true }),
  delete: (id: string): Promise<void> => apiFetch(`/products/${id}`, { method: 'DELETE', withAuth: true }),
};

export default productsClient;