export type PurchaseType = 'Inventory Purchase' | 'Asset Purchase' | 'Service Purchase';
export type PurchasePaymentStatus = 'Fully Paid' | 'Partially Paid' | 'Unpaid';
export type ReceiveStatus = 'Pending' | 'Partially Received' | 'Received';
export type PurchaseStatus = 'Open' | 'Closed';

export type PurchaseRecord = {
  id: number;
  businessId: number;
  purchaseDate: string;
  billNo: string;
  purchaseType: PurchaseType;
  supplier: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: PurchasePaymentStatus;
  paymentMethod: string;
  dueDate: string;
  lastPaymentDate: string;
  receiveStatus: ReceiveStatus;
  purchaser: string;
  notes: string;
  currency: 'USD';
  expectedRevenue: number;
  expectedGrossProfit: number;
  expectedMargin: number;
  purchaseStatus: PurchaseStatus;
};

type PurchaseSeed = {
  id: number;
  businessId: number;
  purchaseDate: string;
  billNo: string;
  purchaseType: PurchaseType;
  supplier: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  discountRate: number;
  taxRate: number;
  shippingFee: number;
  paidAmount: number;
  paymentStatus: PurchasePaymentStatus;
  paymentMethod: string;
  dueDate: string;
  lastPaymentDate: string;
  receiveStatus: ReceiveStatus;
  purchaser: string;
  notes: string;
  expectedRevenue?: number;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

// Purchases are served directly from the backend; no local seed data.

import { purchasesClient } from './apiClients';
import { PurchaseDto } from './types';

function fmtNumber(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function fetchPurchasesByBusiness(businessId: number | string): Promise<PurchaseRecord[]> {
  try {
    const apiPurchases = await purchasesClient.getAll(String(businessId));
    if (!Array.isArray(apiPurchases)) return [];
    return apiPurchases.map((p: PurchaseDto, idx: number) => {
      const subtotal = fmtNumber(p.items?.reduce((s: number, it: any) => s + fmtNumber(it.total), 0) ?? 0);
      const paid = fmtNumber(p.paid ?? 0);
      const total = fmtNumber(p.total ?? subtotal);
      const balanceDue = Math.round((total - paid) * 100) / 100;
      return {
        id: Number.isFinite(Number(p.id)) ? Number(p.id) : idx + 1,
        businessId: Number(p.business_id),
        purchaseDate: p.purchase_date ?? '',
        billNo: String(p.id),
        purchaseType: 'Inventory Purchase' as const,
        supplier: p.supplier?.name ?? '',
        productName: p.items && p.items.length ? String(p.items[0].product_id ?? '') : '',
        sku: p.items && p.items.length ? String(p.items[0].product_id ?? '') : '',
        quantity: p.items?.reduce((s: number, it: any) => s + (Number(it.qty) || 0), 0) ?? 0,
        unitCost: p.items && p.items.length ? fmtNumber(p.items[0].unit_cost) : 0,
        subtotal,
        discountRate: 0,
        discountAmount: 0,
        taxRate: 0,
        taxAmount: 0,
        shippingFee: 0,
        totalAmount: total,
        paidAmount: paid,
        balanceDue,
        paymentStatus: (balanceDue > 0 ? 'Partially Paid' : 'Fully Paid') as PurchasePaymentStatus,
        paymentMethod: '',
        dueDate: '',
        lastPaymentDate: '',
        receiveStatus: 'Received' as ReceiveStatus,
        purchaser: p.supplier?.name ?? '',
        notes: '',
        currency: 'USD',
        expectedRevenue: 0,
        expectedGrossProfit: 0,
        expectedMargin: 0,
        purchaseStatus: (balanceDue > 0 ? 'Open' : 'Closed') as PurchaseStatus,
      };
    });
  } catch (e) {
    throw e;
  }
}
