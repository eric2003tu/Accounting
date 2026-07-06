import type { CategoryDto } from '../types';
import { apiFetch } from './appClient';

export const categoriesClient = {
  getAll: async (businessId?: string): Promise<CategoryDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<CategoryDto[]>(`/api/categories${params}`);
  },
  create: async (payload: Record<string, any>): Promise<CategoryDto> => {
    return apiFetch<CategoryDto>('/api/categories', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default categoriesClient;
