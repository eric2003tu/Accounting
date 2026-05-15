import api, { productsClient, salesClient } from './apiClients';

export type SaleType = 'Product Sale' | 'Loan Sale';
export type PaymentStatus = 'Fully Paid' | 'Partially Paid' | 'Unpaid';
export type SaleStatus = 'Open' | 'Closed';

export type SaleRecord = {
  id: number;
  businessId: number;
  saleDate: string;
  invoiceNo: string;
  saleType: SaleType;
  productName: string;
  sku: string;
  customer: string;
  quantity: number;
  unitCost: number;
  unitPrice: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  dueDate: string;
  lastPaymentDate: string;
  deliveryStatus: 'Pending' | 'Packed' | 'Delivered' | 'Settled';
  salesperson: string;
  notes: string;
  currency: 'USD';
  loanPrincipal: number;
  loanInterestRate: number;
  loanInterestAmount: number;
  loanTermMonths: number;
  collateral: string;
  grossProfit: number;
  grossMargin: number;
  saleStatus: SaleStatus;
};

type SaleSeed = {
  id: number;
  businessId: number;
  saleDate: string;
  invoiceNo: string;
  saleType: SaleType;
  productName: string;
  sku: string;
  customer: string;
  quantity: number;
  unitCost: number;
  unitPrice: number;
  discountRate: number;
  taxRate: number;
  shippingFee: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  dueDate: string;
  lastPaymentDate: string;
  deliveryStatus: SaleRecord['deliveryStatus'];
  salesperson: string;
  notes: string;
  loanPrincipal?: number;
  loanInterestRate?: number;
  loanTermMonths?: number;
  collateral?: string;
};

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

// Sales come directly from the backend; no local seed data.

function toNumber(val: any) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function mapApiSaleToSaleRecord(apiSale: any, productsMap: Record<string, any>): SaleRecord {
  const items = Array.isArray(apiSale.items) ? apiSale.items : [];
  const qty = items.reduce((s: number, i: any) => s + (i.qty ?? 0), 0);
  const unitPrice = items.length > 0 ? toNumber(items[0].unit_price) : 0;
  const unitCost = items.length > 0 ? toNumber((productsMap[items[0].product_id] || {}).unit_cost) : 0;
  const subtotal = items.reduce((s: number, i: any) => s + toNumber(i.unit_price) * toNumber(i.qty), 0);
  const totalAmount = toNumber(apiSale.total ?? subtotal);
  const paidAmount = toNumber(apiSale.paid ?? 0);
  const balanceDue = totalAmount - paidAmount;

  const productInfo = productsMap[items[0]?.product_id] || null;

  return {
    id: typeof apiSale.id === 'number' ? apiSale.id : 0,
    businessId: apiSale.business_id ?? 0,
    saleDate: apiSale.sale_date ?? apiSale.saleDate ?? '',
    invoiceNo: apiSale.reference ?? String(apiSale.id),
    saleType: apiSale.sale_type ?? 'Product Sale',
    productName: productInfo?.name ?? items[0]?.product_id ?? 'N/A',
    sku: productInfo?.sku ?? 'N/A',
    customer: apiSale.customer?.name ?? apiSale.customer_id ?? 'N/A',
    quantity: qty,
    unitCost: unitCost,
    unitPrice: unitPrice,
    subtotal: Math.round(subtotal * 100) / 100,
    discountRate: 0,
    discountAmount: 0,
    taxRate: 0,
    taxAmount: 0,
    shippingFee: 0,
    totalAmount,
    paidAmount,
    balanceDue,
    paymentStatus: paidAmount >= totalAmount ? 'Fully Paid' : paidAmount > 0 ? 'Partially Paid' : 'Unpaid',
    paymentMethod: apiSale.payment_method ?? 'Unknown',
    dueDate: apiSale.due_date ?? '',
    lastPaymentDate: apiSale.lastPaymentDate ?? '',
    deliveryStatus: 'Pending',
    salesperson: apiSale.salesperson ?? '',
    notes: apiSale.description ?? apiSale.notes ?? '',
    currency: 'USD',
    loanPrincipal: toNumber(apiSale.loanPrincipal ?? 0),
    loanInterestRate: toNumber(apiSale.loanInterestRate ?? 0),
    loanInterestAmount: toNumber(apiSale.loanInterestAmount ?? 0),
    loanTermMonths: toNumber(apiSale.loanTermMonths ?? 0),
    collateral: apiSale.collateral ?? '-',
    grossProfit: Math.round((totalAmount - unitCost * qty) * 100) / 100,
    grossMargin: totalAmount > 0 ? Math.round(((totalAmount - unitCost * qty) / totalAmount) * 10000) / 100 : 0,
    saleStatus: balanceDue > 0 ? 'Open' : 'Closed',
  };
}

export async function fetchSalesByBusiness(businessId: number | string): Promise<SaleRecord[]> {
  try {
    const [apiSales, products] = await Promise.all([
      salesClient.getAll(String(businessId)),
      productsClient.getAll(String(businessId)),
    ]);

    const productsMap: Record<string, any> = {};
    if (Array.isArray(products)) products.forEach((p: any) => (productsMap[p.id] = p));

    if (!Array.isArray(apiSales)) return [];

    return apiSales.map((s: any) => mapApiSaleToSaleRecord(s, productsMap));
  } catch (e) {
    throw e;
  }
}
