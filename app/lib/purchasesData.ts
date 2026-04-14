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

function buildPurchase(seed: PurchaseSeed): PurchaseRecord {
  const subtotal = seed.quantity * seed.unitCost;
  const discountAmount = roundMoney(subtotal * (seed.discountRate / 100));
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = roundMoney(taxableAmount * (seed.taxRate / 100));
  const totalAmount = roundMoney(taxableAmount + taxAmount + seed.shippingFee);
  const balanceDue = roundMoney(totalAmount - seed.paidAmount);
  const expectedRevenue = roundMoney(seed.expectedRevenue ?? totalAmount * 1.2);
  const expectedGrossProfit = roundMoney(expectedRevenue - totalAmount);
  const expectedMargin = expectedRevenue > 0 ? roundMoney((expectedGrossProfit / expectedRevenue) * 100) : 0;

  return {
    id: seed.id,
    businessId: seed.businessId,
    purchaseDate: seed.purchaseDate,
    billNo: seed.billNo,
    purchaseType: seed.purchaseType,
    supplier: seed.supplier,
    productName: seed.productName,
    sku: seed.sku,
    quantity: seed.quantity,
    unitCost: seed.unitCost,
    subtotal: roundMoney(subtotal),
    discountRate: seed.discountRate,
    discountAmount,
    taxRate: seed.taxRate,
    taxAmount,
    shippingFee: seed.shippingFee,
    totalAmount,
    paidAmount: seed.paidAmount,
    balanceDue,
    paymentStatus: seed.paymentStatus,
    paymentMethod: seed.paymentMethod,
    dueDate: seed.dueDate,
    lastPaymentDate: seed.lastPaymentDate,
    receiveStatus: seed.receiveStatus,
    purchaser: seed.purchaser,
    notes: seed.notes,
    currency: 'USD',
    expectedRevenue,
    expectedGrossProfit,
    expectedMargin,
    purchaseStatus: balanceDue > 0 ? 'Open' : 'Closed',
  };
}

export const purchasesByBusiness: Record<number, PurchaseRecord[]> = {
  1: [
    buildPurchase({
      id: 1,
      businessId: 1,
      purchaseDate: '2026-04-12',
      billNo: 'ACM-P-001',
      purchaseType: 'Inventory Purchase',
      supplier: 'Global Devices Ltd',
      productName: 'ApexBook Pro 14',
      sku: 'ACM-LTP-14PRO',
      quantity: 12,
      unitCost: 980,
      discountRate: 3,
      taxRate: 18,
      shippingFee: 90,
      paidAmount: 9000,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2026-04-25',
      lastPaymentDate: '2026-04-12',
      receiveStatus: 'Received',
      purchaser: 'Samuel Uwizeye',
      notes: 'Quarterly laptop stock replenishment.',
      expectedRevenue: 15480,
    }),
    buildPurchase({
      id: 2,
      businessId: 1,
      purchaseDate: '2026-04-10',
      billNo: 'ACM-P-002',
      purchaseType: 'Inventory Purchase',
      supplier: 'Eastwave Telecom Supply',
      productName: 'Orbit XR9 Phone',
      sku: 'ACM-PHN-XR9',
      quantity: 25,
      unitCost: 420,
      discountRate: 5,
      taxRate: 18,
      shippingFee: 70,
      paidAmount: 11827,
      paymentStatus: 'Fully Paid',
      paymentMethod: 'Cash',
      dueDate: '2026-04-10',
      lastPaymentDate: '2026-04-10',
      receiveStatus: 'Received',
      purchaser: 'Aline Niyonsaba',
      notes: 'Smartphone stock top-up for campaign season.',
      expectedRevenue: 14725,
    }),
    buildPurchase({
      id: 3,
      businessId: 1,
      purchaseDate: '2026-04-08',
      billNo: 'ACM-P-003',
      purchaseType: 'Asset Purchase',
      supplier: 'ClearView Tech Supplies',
      productName: 'Warehouse Barcode Scanners',
      sku: 'ACM-ASSET-SCN',
      quantity: 10,
      unitCost: 145,
      discountRate: 0,
      taxRate: 18,
      shippingFee: 20,
      paidAmount: 500,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Cheque',
      dueDate: '2026-04-30',
      lastPaymentDate: '2026-04-09',
      receiveStatus: 'Partially Received',
      purchaser: 'Claudette Ishimwe',
      notes: 'Asset purchase for warehouse modernization.',
      expectedRevenue: 0,
    }),
    buildPurchase({
      id: 4,
      businessId: 1,
      purchaseDate: '2026-04-05',
      billNo: 'ACM-P-004',
      purchaseType: 'Service Purchase',
      supplier: 'Kigali Freight Forwarders',
      productName: 'Inbound Logistics Service',
      sku: 'SVC-LOG-APR',
      quantity: 1,
      unitCost: 1250,
      discountRate: 2,
      taxRate: 18,
      shippingFee: 0,
      paidAmount: 0,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Credit',
      dueDate: '2026-04-20',
      lastPaymentDate: '-',
      receiveStatus: 'Received',
      purchaser: 'Eric Tuyishime',
      notes: 'Monthly inbound freight and handling services.',
      expectedRevenue: 0,
    }),
    buildPurchase({
      id: 5,
      businessId: 1,
      purchaseDate: '2026-04-03',
      billNo: 'ACM-P-005',
      purchaseType: 'Inventory Purchase',
      supplier: 'Bitware Components',
      productName: 'Quantum SSD 1TB',
      sku: 'ACM-SSD-1TB',
      quantity: 60,
      unitCost: 92,
      discountRate: 4,
      taxRate: 18,
      shippingFee: 55,
      paidAmount: 6200,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Mobile Money',
      dueDate: '2026-04-17',
      lastPaymentDate: '2026-04-11',
      receiveStatus: 'Pending',
      purchaser: 'Diane Mutesi',
      notes: 'Awaiting supplier dispatch confirmation.',
      expectedRevenue: 8340,
    }),
  ],
  3: [
    buildPurchase({
      id: 1,
      businessId: 3,
      purchaseDate: '2026-04-12',
      billNo: 'KIV-P-001',
      purchaseType: 'Inventory Purchase',
      supplier: 'Kivu Fleet Parts',
      productName: 'RoadMaster Tire 18"',
      sku: 'KIV-TIRE-18',
      quantity: 90,
      unitCost: 88,
      discountRate: 3,
      taxRate: 18,
      shippingFee: 110,
      paidAmount: 7500,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2026-04-26',
      lastPaymentDate: '2026-04-12',
      receiveStatus: 'Received',
      purchaser: 'David Mwangi',
      notes: 'Bulk tire procurement for fleet clients.',
      expectedRevenue: 11610,
    }),
    buildPurchase({
      id: 2,
      businessId: 3,
      purchaseDate: '2026-04-11',
      billNo: 'KIV-P-002',
      purchaseType: 'Inventory Purchase',
      supplier: 'Rwanda Lubricants Co',
      productName: 'ProFleet Engine Oil 20L',
      sku: 'KIV-OIL-20L',
      quantity: 120,
      unitCost: 54,
      discountRate: 2,
      taxRate: 18,
      shippingFee: 48,
      paidAmount: 7750,
      paymentStatus: 'Fully Paid',
      paymentMethod: 'Cash',
      dueDate: '2026-04-11',
      lastPaymentDate: '2026-04-11',
      receiveStatus: 'Received',
      purchaser: 'Mercy Nyambura',
      notes: 'Routine consumable stock for maintenance contracts.',
      expectedRevenue: 9840,
    }),
    buildPurchase({
      id: 3,
      businessId: 3,
      purchaseDate: '2026-04-09',
      billNo: 'KIV-P-003',
      purchaseType: 'Service Purchase',
      supplier: 'Rubavu Port Services',
      productName: 'Cross-border Clearance Service',
      sku: 'SVC-CLEAR-009',
      quantity: 1,
      unitCost: 980,
      discountRate: 0,
      taxRate: 18,
      shippingFee: 0,
      paidAmount: 450,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Credit',
      dueDate: '2026-04-21',
      lastPaymentDate: '2026-04-10',
      receiveStatus: 'Received',
      purchaser: 'Charles Mutua',
      notes: 'Import clearance and customs broker fees.',
      expectedRevenue: 0,
    }),
    buildPurchase({
      id: 4,
      businessId: 3,
      purchaseDate: '2026-04-07',
      billNo: 'KIV-P-004',
      purchaseType: 'Asset Purchase',
      supplier: 'Transit Spares East Africa',
      productName: 'Hydraulic Lift Platform',
      sku: 'KIV-ASSET-HLP',
      quantity: 1,
      unitCost: 8900,
      discountRate: 1,
      taxRate: 18,
      shippingFee: 120,
      paidAmount: 0,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Credit',
      dueDate: '2026-05-07',
      lastPaymentDate: '-',
      receiveStatus: 'Pending',
      purchaser: 'Florence Okello',
      notes: 'Capital investment for workshop throughput.',
      expectedRevenue: 0,
    }),
    buildPurchase({
      id: 5,
      businessId: 3,
      purchaseDate: '2026-04-04',
      billNo: 'KIV-P-005',
      purchaseType: 'Inventory Purchase',
      supplier: 'Transit Spares East Africa',
      productName: 'Brake Pad HDX Set',
      sku: 'KIV-PAD-HDX',
      quantity: 140,
      unitCost: 64,
      discountRate: 4,
      taxRate: 18,
      shippingFee: 95,
      paidAmount: 10200,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2026-04-18',
      lastPaymentDate: '2026-04-12',
      receiveStatus: 'Partially Received',
      purchaser: 'Patrick Kimani',
      notes: 'Backorder partially fulfilled by supplier.',
      expectedRevenue: 13440,
    }),
  ],
};
