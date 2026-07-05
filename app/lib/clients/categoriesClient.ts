import type { CategoryDto } from '../types';
import { MOCK_CATEGORIES, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const categoriesClient = {
  getAll: async (businessId?: string): Promise<CategoryDto[]> => {
    await delay();
    if (!businessId) return MOCK_CATEGORIES;
    return MOCK_CATEGORIES.filter((c) => String(c.business_id) === businessId);
  },
  create: async (payload: Record<string, any>): Promise<CategoryDto> => {
    await delay();
    return { id: generateId(), ...payload } as CategoryDto;
  },
};

export default categoriesClient;
