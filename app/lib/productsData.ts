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
      category: p.category ?? '',
      brand: p.brand ?? '',
      supplier: p.supplier ?? '',
      currency: p.currency ?? 'USD',
      unitCost: toNumber(p.unit_cost),
      unitPrice: toNumber(p.unit_price),
      taxRate: toNumber(p.taxRate ?? p.tax_rate),
      discountRate: toNumber(p.discountRate ?? p.discount_rate),
      stockQuantity: toNumber(p.stockQuantity ?? p.stock_quantity ?? 0),
      reorderLevel: toNumber(p.reorder_level ?? 0),
      safetyStock: toNumber(p.safetyStock ?? p.safety_stock ?? 0),
      valuationMethod: p.valuationMethod ?? p.valuation_method ?? 'FIFO',
      warehouse: p.warehouse ?? '',
      cogsToDate: toNumber(p.cogsToDate ?? p.cogs_to_date ?? 0),
      revenueToDate: toNumber(p.revenueToDate ?? p.revenue_to_date ?? 0),
      lastPurchaseDate: p.lastPurchaseDate ?? p.last_purchase_date ?? p.created_at ?? '',
      lastSaleDate: p.lastSaleDate ?? p.last_sale_date ?? '',
      status: (p.status as ProductStatus) ?? 'In Stock',
    }));
  } catch (e) {
    throw e;
  }
}
