import type { ProductDto } from '../types';
import { MOCK_PRODUCTS, generateId } from '@/app/lib/mockData';

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const productsClient = {
  getAll: async (businessId?: string): Promise<ProductDto[]> => {
    await delay();
    if (!businessId) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => String(p.business_id) === businessId);
  },
  getById: async (id: string): Promise<ProductDto> => {
    await delay();
    const product = MOCK_PRODUCTS.find((p) => String(p.id) === id);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    return product;
  },
  create: async (payload: Record<string, any>): Promise<ProductDto> => {
    await delay();
    return { id: generateId(), ...payload, created_at: new Date().toISOString() } as ProductDto;
  },
  update: async (id: string, payload: Record<string, any>): Promise<ProductDto> => {
    await delay();
    const product = MOCK_PRODUCTS.find((p) => String(p.id) === id);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    return { ...product, ...payload, id: product.id };
  },
  delete: async (id: string): Promise<void> => {
    await delay();
  },
};

export default productsClient;
