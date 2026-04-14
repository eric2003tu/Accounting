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

function buildSale(seed: SaleSeed): SaleRecord {
  const isLoanSale = seed.saleType === 'Loan Sale';
  const subtotal = isLoanSale ? seed.loanPrincipal ?? seed.unitPrice * seed.quantity : seed.quantity * seed.unitPrice;
  const discountAmount = roundMoney(subtotal * (seed.discountRate / 100));
  const taxableBase = subtotal - discountAmount;
  const taxAmount = roundMoney(taxableBase * (seed.taxRate / 100));
  const loanInterestRate = seed.loanInterestRate ?? 0;
  const loanPrincipal = seed.loanPrincipal ?? 0;
  const loanInterestAmount = isLoanSale ? roundMoney(loanPrincipal * (loanInterestRate / 100)) : 0;
  const shippingFee = seed.shippingFee;
  const totalAmount = isLoanSale
    ? roundMoney(subtotal + loanInterestAmount + shippingFee)
    : roundMoney(taxableBase + taxAmount + shippingFee);
  const balanceDue = roundMoney(totalAmount - seed.paidAmount);
  const costOfGoods = isLoanSale ? 0 : seed.quantity * seed.unitCost;
  const grossProfit = isLoanSale
    ? roundMoney(loanInterestAmount)
    : roundMoney(subtotal - discountAmount - costOfGoods - shippingFee);
  const grossMargin = totalAmount > 0 ? roundMoney((grossProfit / totalAmount) * 100) : 0;

  return {
    id: seed.id,
    businessId: seed.businessId,
    saleDate: seed.saleDate,
    invoiceNo: seed.invoiceNo,
    saleType: seed.saleType,
    productName: seed.productName,
    sku: seed.sku,
    customer: seed.customer,
    quantity: seed.quantity,
    unitCost: seed.unitCost,
    unitPrice: seed.unitPrice,
    subtotal: roundMoney(subtotal),
    discountRate: seed.discountRate,
    discountAmount,
    taxRate: seed.taxRate,
    taxAmount,
    shippingFee,
    totalAmount,
    paidAmount: seed.paidAmount,
    balanceDue,
    paymentStatus: seed.paymentStatus,
    paymentMethod: seed.paymentMethod,
    dueDate: seed.dueDate,
    lastPaymentDate: seed.lastPaymentDate,
    deliveryStatus: seed.deliveryStatus,
    salesperson: seed.salesperson,
    notes: seed.notes,
    currency: 'USD',
    loanPrincipal,
    loanInterestRate,
    loanInterestAmount,
    loanTermMonths: seed.loanTermMonths ?? 0,
    collateral: seed.collateral ?? '-',
    grossProfit,
    grossMargin,
    saleStatus: balanceDue > 0 ? 'Open' : 'Closed',
  };
}

export const salesByBusiness: Record<number, SaleRecord[]> = {
  1: [
    buildSale({
      id: 1,
      businessId: 1,
      saleDate: '2026-04-12',
      invoiceNo: 'ACM-S-001',
      saleType: 'Product Sale',
      productName: 'ApexBook Pro 14',
      sku: 'ACM-LTP-14PRO',
      customer: 'Greenline Retail',
      quantity: 2,
      unitCost: 980,
      unitPrice: 1299,
      discountRate: 4,
      taxRate: 18,
      shippingFee: 25,
      paidAmount: 2942.7,
      paymentStatus: 'Fully Paid',
      paymentMethod: 'Cash',
      dueDate: '2026-04-12',
      lastPaymentDate: '2026-04-12',
      deliveryStatus: 'Delivered',
      salesperson: 'Aline Niyonsaba',
      notes: 'Upfront retail sale with same-day delivery.',
    }),
    buildSale({
      id: 2,
      businessId: 1,
      saleDate: '2026-04-11',
      invoiceNo: 'ACM-S-002',
      saleType: 'Product Sale',
      productName: 'Orbit XR9 Phone',
      sku: 'ACM-PHN-XR9',
      customer: 'NorthPeak Solutions',
      quantity: 5,
      unitCost: 420,
      unitPrice: 589,
      discountRate: 3,
      taxRate: 18,
      shippingFee: 18,
      paidAmount: 1200,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2026-04-20',
      lastPaymentDate: '2026-04-13',
      deliveryStatus: 'Packed',
      salesperson: 'Samuel Uwizeye',
      notes: 'Balance due after client approval of batch delivery.',
    }),
    buildSale({
      id: 3,
      businessId: 1,
      saleDate: '2026-04-10',
      invoiceNo: 'ACM-S-003',
      saleType: 'Loan Sale',
      productName: 'Working Capital Advance',
      sku: 'LOAN-ACM-003',
      customer: 'Partner Solutions Ltd',
      quantity: 1,
      unitCost: 0,
      unitPrice: 0,
      discountRate: 0,
      taxRate: 0,
      shippingFee: 0,
      paidAmount: 4000,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Mobile Money',
      dueDate: '2026-05-10',
      lastPaymentDate: '2026-04-12',
      deliveryStatus: 'Settled',
      salesperson: 'Claudette Ishimwe',
      notes: 'Loan disbursement recorded as receivable with interest.',
      loanPrincipal: 12000,
      loanInterestRate: 6.5,
      loanTermMonths: 12,
      collateral: 'Equipment and receivables',
    }),
    buildSale({
      id: 4,
      businessId: 1,
      saleDate: '2026-04-09',
      invoiceNo: 'ACM-S-004',
      saleType: 'Product Sale',
      productName: 'Nimbus Tab A11',
      sku: 'ACM-TAB-A11',
      customer: 'Kigali Digital Campus',
      quantity: 8,
      unitCost: 260,
      unitPrice: 359,
      discountRate: 5,
      taxRate: 18,
      shippingFee: 32,
      paidAmount: 0,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Credit',
      dueDate: '2026-04-24',
      lastPaymentDate: '-',
      deliveryStatus: 'Pending',
      salesperson: 'Eric Tuyishime',
      notes: 'Invoice approved; awaiting first deposit.',
    }),
    buildSale({
      id: 5,
      businessId: 1,
      saleDate: '2026-04-08',
      invoiceNo: 'ACM-S-005',
      saleType: 'Product Sale',
      productName: 'Vertex 27Q Monitor',
      sku: 'ACM-MON-27Q',
      customer: 'Acme Partner Desk',
      quantity: 4,
      unitCost: 168,
      unitPrice: 249,
      discountRate: 2,
      taxRate: 18,
      shippingFee: 20,
      paidAmount: 1010,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Cheque',
      dueDate: '2026-04-18',
      lastPaymentDate: '2026-04-10',
      deliveryStatus: 'Delivered',
      salesperson: 'Diane Mutesi',
      notes: 'Partial settlement received against corporate procurement order.',
    }),
  ],
  3: [
    buildSale({
      id: 1,
      businessId: 3,
      saleDate: '2026-04-12',
      invoiceNo: 'KIV-S-001',
      saleType: 'Product Sale',
      productName: 'RoadMaster Tire 18"',
      sku: 'KIV-TIRE-18',
      customer: 'Rwanda Freight Partners',
      quantity: 40,
      unitCost: 88,
      unitPrice: 129,
      discountRate: 4,
      taxRate: 18,
      shippingFee: 60,
      paidAmount: 5032,
      paymentStatus: 'Fully Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2026-04-12',
      lastPaymentDate: '2026-04-12',
      deliveryStatus: 'Delivered',
      salesperson: 'Jean Claude',
      notes: 'Fleet maintenance order cleared on delivery.',
    }),
    buildSale({
      id: 2,
      businessId: 3,
      saleDate: '2026-04-11',
      invoiceNo: 'KIV-S-002',
      saleType: 'Product Sale',
      productName: 'ProFleet Engine Oil 20L',
      sku: 'KIV-OIL-20L',
      customer: 'LakeSide Transit',
      quantity: 18,
      unitCost: 54,
      unitPrice: 82,
      discountRate: 2,
      taxRate: 18,
      shippingFee: 24,
      paidAmount: 750,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Cash',
      dueDate: '2026-04-19',
      lastPaymentDate: '2026-04-11',
      deliveryStatus: 'Delivered',
      salesperson: 'Mercy Nyambura',
      notes: 'Remaining amount due after depot reconciliation.',
    }),
    buildSale({
      id: 3,
      businessId: 3,
      saleDate: '2026-04-10',
      invoiceNo: 'KIV-S-003',
      saleType: 'Loan Sale',
      productName: 'Fleet Expansion Loan',
      sku: 'LOAN-KIV-003',
      customer: 'Coastal Development Bank',
      quantity: 1,
      unitCost: 0,
      unitPrice: 0,
      discountRate: 0,
      taxRate: 0,
      shippingFee: 0,
      paidAmount: 12000,
      paymentStatus: 'Fully Paid',
      paymentMethod: 'Bank Transfer',
      dueDate: '2026-04-10',
      lastPaymentDate: '2026-04-10',
      deliveryStatus: 'Settled',
      salesperson: 'David Mwangi',
      notes: 'Loan principal and interest settled at disbursement review.',
      loanPrincipal: 12000,
      loanInterestRate: 8,
      loanTermMonths: 9,
      collateral: 'Truck logbooks',
    }),
    buildSale({
      id: 4,
      businessId: 3,
      saleDate: '2026-04-09',
      invoiceNo: 'KIV-S-004',
      saleType: 'Product Sale',
      productName: 'Air Filter XL',
      sku: 'KIV-FLT-AIR',
      customer: 'Rubavu Logistics Park',
      quantity: 120,
      unitCost: 19,
      unitPrice: 33,
      discountRate: 0,
      taxRate: 18,
      shippingFee: 0,
      paidAmount: 0,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Credit',
      dueDate: '2026-05-09',
      lastPaymentDate: '-',
      deliveryStatus: 'Pending',
      salesperson: 'Florence Okello',
      notes: 'Credit invoice awaiting monthly cycle payment.',
    }),
    buildSale({
      id: 5,
      businessId: 3,
      saleDate: '2026-04-08',
      invoiceNo: 'KIV-S-005',
      saleType: 'Loan Sale',
      productName: 'Equipment Advance',
      sku: 'LOAN-KIV-005',
      customer: 'Transit Spares East Africa',
      quantity: 1,
      unitCost: 0,
      unitPrice: 0,
      discountRate: 0,
      taxRate: 0,
      shippingFee: 0,
      paidAmount: 5000,
      paymentStatus: 'Partially Paid',
      paymentMethod: 'Mobile Money',
      dueDate: '2026-05-08',
      lastPaymentDate: '2026-04-08',
      deliveryStatus: 'Settled',
      salesperson: 'Patrick Kimani',
      notes: 'Advance loan for equipment procurement with monthly settlement plan.',
      loanPrincipal: 15000,
      loanInterestRate: 7.5,
      loanTermMonths: 10,
      collateral: 'Pending equipment delivery',
    }),
  ],
};
