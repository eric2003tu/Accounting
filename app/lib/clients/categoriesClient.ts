import type { CategoryDto } from '../types';
import { apiFetch } from './appClient';

export const categoriesClient = {
  getAll: (businessId?: string): Promise<CategoryDto[]> => apiFetch(`/categories${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<CategoryDto> => apiFetch('/categories', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default categoriesClient;