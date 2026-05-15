import { productsClient } from './apiClients';
import { ProductDto } from './types';

export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export type ProductRecord = {
  id: number;
  businessId: number;
  sku: string;
  barcode: string;
  productName: string;
  category: string;
  brand: string;
  supplier: string;
  currency: string;
  unitCost: number;
  unitPrice: number;
  taxRate: number;
  discountRate: number;
  stockQuantity: number;
  reorderLevel: number;
  safetyStock: number;
  valuationMethod: string;
  warehouse: string;
  cogsToDate: number;
  revenueToDate: number;
  lastPurchaseDate: string;
  lastSaleDate: string;
  status: ProductStatus;
};
// Products are served directly from the backend; no local seed data.

function toNumber(val: any) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

export async function fetchProductsByBusiness(businessId: number | string): Promise<ProductRecord[]> {
  try {
    const apiProducts = await productsClient.getAll(String(businessId));
    if (!Array.isArray(apiProducts)) return [];
    return apiProducts.map((p: ProductDto, idx: number) => ({
      id: Number.isFinite(Number(p.id)) ? Number(p.id) : idx + 1,
      businessId: Number(p.business_id),
      sku: p.sku ?? '',
      barcode: p.barcode ?? '',
      productName: p.name,
      category: '',
      brand: '',
      supplier: '',
      currency: 'USD',
      unitCost: toNumber(p.unit_cost),
      unitPrice: toNumber(p.unit_price),
      taxRate: 0,
      discountRate: 0,
      stockQuantity: p.reorder_level ?? 0,
      reorderLevel: p.reorder_level ?? 0,
      safetyStock: 0,
      valuationMethod: 'FIFO',
      warehouse: '',
      cogsToDate: 0,
      revenueToDate: 0,
      lastPurchaseDate: p.created_at ?? '',
      lastSaleDate: '',
      status: 'In Stock' as ProductStatus,
    }));
  } catch (e) {
    throw e;
  }
}
