import type {
  ProductDto, SaleDto, PurchaseDto, UserDto, BusinessDto,
  CategoryDto, ContactDto, WarehouseDto, AccountDto,
  JournalEntryDto, JournalLineDto, FiscalYearDto,
  NotificationDto, ReceivableDto, PayableDto, StockMovementDto,
  BusinessUserDto, AuthTokenDto,
} from '@/app/lib/types';
import type {
  PortfolioDashboardDto, OwnerApplicationDto, OwnerApplicationListResponse,
  CreateBusinessPayload, DashboardStatCard,
} from '@/app/lib/clients/businessClient';

export const MOCK_ACCOUNTANTS: any[] = [
  { id: 101, name: 'Alice Uwimana', email: 'alice.uwimana@accplan.com', phone: '+250789100101', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-04 08:30', joinedAt: '2025-03-15', department: 'Finance' },
  { id: 102, name: 'Bob Niyonzima', email: 'bob.niyonzima@accplan.com', phone: '+250789100102', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-04 09:15', joinedAt: '2025-06-01', department: 'Accounting' },
  { id: 103, name: 'Claire Mukamana', email: 'claire.mukamana@accplan.com', phone: '+250789100103', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-03 14:45', joinedAt: '2025-08-20', department: 'Finance' },
  { id: 104, name: 'David Habimana', email: 'david.habimana@accplan.com', phone: '+250789100104', role: 'Accountant', status: 'Active', mfa: 'Pending', lastLogin: '2026-07-02 11:00', joinedAt: '2026-01-10', department: 'Accounting' },
  { id: 105, name: 'Eva Kagame', email: 'eva.kagame@accplan.com', phone: '+250789100105', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-04 07:50', joinedAt: '2025-04-05', department: 'Finance' },
  { id: 106, name: 'Frank Nsengimana', email: 'frank.nsengimana@accplan.com', phone: '+250789100106', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-03 16:30', joinedAt: '2025-09-12', department: 'Operations' },
  { id: 107, name: 'Grace Iradukunda', email: 'grace.iradukunda@accplan.com', phone: '+250789100107', role: 'Accountant', status: 'Active', mfa: 'Pending', lastLogin: '2026-07-01 10:20', joinedAt: '2026-02-18', department: 'Accounting' },
  { id: 108, name: 'Henry Mugisha', email: 'henry.mugisha@accplan.com', phone: '+250789100108', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-04 10:05', joinedAt: '2025-05-22', department: 'Finance' },
  { id: 109, name: 'Irene Uwase', email: 'irene.uwase@accplan.com', phone: '+250789100109', role: 'Accountant', status: 'Inactive', mfa: 'Enabled', lastLogin: '2026-06-28 13:15', joinedAt: '2025-07-08', department: 'Accounting' },
  { id: 110, name: 'Jean Pierre Singirankabo', email: 'jp.singirankabo@accplan.com', phone: '+250789100110', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-04 06:40', joinedAt: '2025-02-14', department: 'Finance' },
  { id: 111, name: 'Kevin Munyaneza', email: 'kevin.munyaneza@accplan.com', phone: '+250789100111', role: 'Accountant', status: 'Active', mfa: 'Pending', lastLogin: '2026-07-02 09:55', joinedAt: '2026-03-01', department: 'Operations' },
  { id: 112, name: 'Lillian Muhawenimana', email: 'lillian.muhawenimana@accplan.com', phone: '+250789100112', role: 'Accountant', status: 'Active', mfa: 'Enabled', lastLogin: '2026-07-04 08:00', joinedAt: '2025-10-30', department: 'Finance' },
];

export const MOCK_USERS: UserDto[] = [
  { id: 1, email: 'admin@accplan.com', first_name: 'System', last_name: 'Admin', system_role: 'ADMIN', phone: '+250700000001', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 2, email: 'eric.tuyishime@accplan.com', first_name: 'Eric', last_name: 'Tuyishime', system_role: 'OWNER', phone: '+250700000002', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 3, email: 'jean.claude@accplan.com', first_name: 'Jean Claude', last_name: 'Ishimwe', system_role: 'MANAGER', phone: '+250700000003', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 4, email: 'user@accplan.com', first_name: 'Normal', last_name: 'User', system_role: 'NORMAL', phone: '+250700000004', is_active: true, created_at: '2025-01-01T00:00:00Z' },
  { id: 5, email: 'diane@accplan.com', first_name: 'Diane', last_name: 'Mukamana', system_role: 'OWNER', phone: '+250700000005', is_active: true, created_at: '2025-02-01T00:00:00Z' },
];

export const MOCK_PASSWORD = 'User@12345';

function financials(monthlyRevenue: number, monthlyExpenses: number, cashBalance: number, overdueInvoices: number, netProfit: number, equity?: number) {
  return {
    monthlyRevenue,
    monthlyExpenses,
    cashBalance,
    overdueInvoices,
    netProfit,
    equity: equity ?? cashBalance,
    revenueTrend: [
      { label: 'Jan', value: Math.round(monthlyRevenue * 0.7) },
      { label: 'Feb', value: Math.round(monthlyRevenue * 0.8) },
      { label: 'Mar', value: Math.round(monthlyRevenue * 0.85) },
      { label: 'Apr', value: Math.round(monthlyRevenue * 0.9) },
      { label: 'May', value: Math.round(monthlyRevenue * 0.95) },
      { label: 'Jun', value: monthlyRevenue },
    ],
    expenseBreakdown: [
      { label: 'Salaries', value: Math.round(monthlyExpenses * 0.4) },
      { label: 'Utilities', value: Math.round(monthlyExpenses * 0.1) },
      { label: 'Rent', value: Math.round(monthlyExpenses * 0.15) },
      { label: 'Marketing', value: Math.round(monthlyExpenses * 0.1) },
      { label: 'COGS', value: Math.round(monthlyExpenses * 0.15) },
      { label: 'Other', value: Math.round(monthlyExpenses * 0.1) },
    ],
  };
}

export const MOCK_BUSINESSES: (BusinessDto & { financials: any })[] = [
  { id: 1, name: 'Kigali Tech Solutions', owner_id: 2, ownerId: 2, currency: 'RWF', industry: 'Technology', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'premium', business_name: 'Kigali Tech Solutions', businessName: 'Kigali Tech Solutions', legal_name: 'Kigali Tech Solutions Ltd', trade_name: 'KTS', tradeName: 'KTS', vat_number: ' VAT12345', registration_no: 'REG001', billing_cycle: 'monthly', next_billing_date: '2026-08-01', created_at: '2025-01-15T00:00:00Z', financials: financials(25000, 15000, 80000, 2, 10000, 120000) },
  { id: 2, name: 'Rwanda Fresh Foods', owner_id: 2, ownerId: 2, currency: 'RWF', industry: 'Food & Beverage', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'standard', business_name: 'Rwanda Fresh Foods', businessName: 'Rwanda Fresh Foods', legal_name: 'Rwanda Fresh Foods Ltd', trade_name: 'RFF', tradeName: 'RFF', vat_number: 'VAT67890', registration_no: 'REG002', billing_cycle: 'monthly', next_billing_date: '2026-08-15', created_at: '2025-03-01T00:00:00Z', financials: financials(18000, 12000, 45000, 1, 6000, 60000) },
  { id: 3, name: 'Mountain View Construction', owner_id: 2, ownerId: 2, currency: 'RWF', industry: 'Construction', city: 'Musanze', country: 'Rwanda', status: 'active', subscription: 'enterprise', business_name: 'Mountain View Construction', businessName: 'Mountain View Construction', legal_name: 'Mountain View Construction Ltd', trade_name: 'MVC', tradeName: 'MVC', registration_no: 'REG003', billing_cycle: 'quarterly', next_billing_date: '2026-10-01', created_at: '2025-04-10T00:00:00Z', financials: financials(35000, 22000, 95000, 0, 13000, 150000) },
  { id: 4, name: 'Lake Kivu Logistics', owner_id: 5, ownerId: 5, currency: 'RWF', industry: 'Logistics', city: 'Gisenyi', country: 'Rwanda', status: 'active', subscription: 'standard', business_name: 'Lake Kivu Logistics', businessName: 'Lake Kivu Logistics', legal_name: 'Lake Kivu Logistics Ltd', trade_name: 'LKL', tradeName: 'LKL', registration_no: 'REG004', billing_cycle: 'monthly', next_billing_date: '2026-08-20', created_at: '2025-05-01T00:00:00Z', financials: financials(22000, 16000, 55000, 3, 6000, 75000) },
  { id: 5, name: 'Kigali Mart Retail', owner_id: 2, ownerId: 2, currency: 'RWF', industry: 'Retail', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'standard', business_name: 'Kigali Mart Retail', businessName: 'Kigali Mart Retail', legal_name: 'Kigali Mart Retail Ltd', trade_name: 'KMR', registration_no: 'REG005', billing_cycle: 'monthly', next_billing_date: '2026-09-01', created_at: '2025-06-01T00:00:00Z', financials: financials(12000, 9000, 28000, 5, 3000, 35000) },
  { id: 6, name: 'Nyamirambo Services', owner_id: 5, ownerId: 5, currency: 'RWF', industry: 'Services', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'basic', business_name: 'Nyamirambo Services', businessName: 'Nyamirambo Services', registration_no: 'REG006', billing_cycle: 'monthly', next_billing_date: '2026-08-10', created_at: '2025-07-01T00:00:00Z', financials: financials(8000, 6000, 15000, 0, 2000, 20000) },
];

export const MOCK_PRODUCTS: ProductDto[] = [
  { id: 1, business_id: 1, name: 'Laptop Dell XPS 15', sku: 'DELL-XPS-15', unit_cost: 1200, unit_price: 1599, stock_quantity: 15, stockQuantity: 15, category: 'Electronics', supplier: 'Dell Rwanda', reorder_level: 5, status: 'In Stock', last_purchase_date: '2026-06-10', last_sale_date: '2026-06-28', created_at: '2025-06-01T00:00:00Z' },
  { id: 2, business_id: 1, name: 'HP LaserJet Printer', sku: 'HP-LJ-200', unit_cost: 250, unit_price: 399, stock_quantity: 8, stockQuantity: 8, category: 'Printers', supplier: 'HP East Africa', reorder_level: 3, status: 'In Stock', last_purchase_date: '2026-06-15', last_sale_date: '2026-06-25', created_at: '2025-06-10T00:00:00Z' },
  { id: 3, business_id: 1, name: 'Server Rack 42U', sku: 'SRV-42U', unit_cost: 3500, unit_price: 4999, stock_quantity: 2, stockQuantity: 2, category: 'Infrastructure', supplier: 'TechConnect Ltd', reorder_level: 1, status: 'Low Stock', last_purchase_date: '2026-05-20', created_at: '2025-07-01T00:00:00Z' },
  { id: 4, business_id: 1, name: 'Cisco Switch 2960', sku: 'CSCO-2960', unit_cost: 800, unit_price: 1299, stock_quantity: 0, stockQuantity: 0, category: 'Networking', supplier: 'Cisco Systems', reorder_level: 2, status: 'Out of Stock', last_purchase_date: '2026-04-10', last_sale_date: '2026-06-20', created_at: '2025-07-15T00:00:00Z' },
  { id: 5, business_id: 1, name: 'USB-C Hub 7-in-1', sku: 'USB-C-7IN1', unit_cost: 25, unit_price: 49, stock_quantity: 50, stockQuantity: 50, category: 'Accessories', supplier: 'Accessories World', reorder_level: 20, status: 'In Stock', last_purchase_date: '2026-06-20', last_sale_date: '2026-06-30', created_at: '2025-08-01T00:00:00Z' },
  { id: 6, business_id: 2, name: 'Maize Flour 25kg', sku: 'MAIZE-25KG', unit_cost: 15, unit_price: 25, stock_quantity: 200, stockQuantity: 200, category: 'Grains', supplier: 'Farmers Coop', reorder_level: 50, status: 'In Stock', last_purchase_date: '2026-06-28', last_sale_date: '2026-06-30', created_at: '2025-09-01T00:00:00Z' },
  { id: 7, business_id: 2, name: 'Rice Premium 10kg', sku: 'RICE-10KG', unit_cost: 12, unit_price: 20, stock_quantity: 150, stockQuantity: 150, category: 'Grains', supplier: 'Rice Millers Ltd', reorder_level: 30, status: 'In Stock', last_purchase_date: '2026-06-25', last_sale_date: '2026-06-29', created_at: '2025-09-15T00:00:00Z' },
  { id: 8, business_id: 2, name: 'Cooking Oil 5L', sku: 'OIL-5L', unit_cost: 8, unit_price: 14, stock_quantity: 80, stockQuantity: 80, category: 'Oils', supplier: 'Edible Oils Ltd', reorder_level: 20, status: 'In Stock', last_purchase_date: '2026-06-22', last_sale_date: '2026-06-30', created_at: '2025-10-01T00:00:00Z' },
  { id: 9, business_id: 3, name: 'Cement 50kg Bag', sku: 'CEM-50KG', unit_cost: 6, unit_price: 10, stock_quantity: 500, stockQuantity: 500, category: 'Building Materials', supplier: 'Cementco Ltd', reorder_level: 100, status: 'In Stock', last_purchase_date: '2026-06-20', last_sale_date: '2026-06-30', created_at: '2025-11-01T00:00:00Z' },
  { id: 10, business_id: 3, name: 'Steel Rebar 12mm', sku: 'REBAR-12MM', unit_cost: 15, unit_price: 22, stock_quantity: 300, stockQuantity: 300, category: 'Steel', supplier: 'Steel Rwanda', reorder_level: 50, status: 'In Stock', last_purchase_date: '2026-06-18', last_sale_date: '2026-06-28', created_at: '2025-11-15T00:00:00Z' },
  { id: 11, business_id: 5, name: 'Assorted Chips 50g', sku: 'CHIPS-50G', unit_cost: 0.5, unit_price: 1, stock_quantity: 1000, stockQuantity: 1000, category: 'Snacks', supplier: 'SnackCo', reorder_level: 200, status: 'In Stock', last_purchase_date: '2026-06-29', last_sale_date: '2026-06-30', created_at: '2026-01-01T00:00:00Z' },
  { id: 12, business_id: 5, name: 'Mineral Water 1.5L', sku: 'WATER-1.5L', unit_cost: 0.3, unit_price: 0.7, stock_quantity: 500, stockQuantity: 500, category: 'Beverages', supplier: 'Aqua Rwanda', reorder_level: 100, status: 'In Stock', last_purchase_date: '2026-06-28', last_sale_date: '2026-06-30', created_at: '2026-01-15T00:00:00Z' },
];

export const MOCK_SALES: SaleDto[] = [
  { id: 1, business_id: 1, reference: 'SALE-001', customer_id: 1, sale_date: '2026-06-28', total: 4797, paid: 4797, status: 'paid', payment_method: 'Bank Transfer', due_date: '2026-07-28', last_payment_date: '2026-06-28', customer: { id: 1, name: 'Rwanda Development Board' }, items: [{ id: 1, sale_id: 1, product_id: 1, qty: 2, unit_price: 1599, total: 3198 }, { id: 2, sale_id: 1, product_id: 2, qty: 4, unit_price: 399, total: 1596 }] },
  { id: 2, business_id: 1, reference: 'SALE-002', customer_id: 2, sale_date: '2026-06-25', total: 1299, paid: 1000, status: 'partial', payment_method: 'Credit Card', due_date: '2026-07-25', last_payment_date: '2026-06-25', customer: { id: 2, name: 'MTN Rwanda' }, items: [{ id: 3, sale_id: 2, product_id: 4, qty: 1, unit_price: 1299, total: 1299 }] },
  { id: 3, business_id: 1, reference: 'SALE-003', customer_id: 3, sale_date: '2026-06-20', total: 245, paid: 0, status: 'pending', payment_method: 'Cash', due_date: '2026-07-20', last_payment_date: '', customer: { id: 3, name: 'Individual Client' }, items: [{ id: 4, sale_id: 3, product_id: 5, qty: 5, unit_price: 49, total: 245 }] },
  { id: 4, business_id: 2, reference: 'SALE-004', customer_id: 4, sale_date: '2026-06-30', total: 3750, paid: 3750, status: 'paid', payment_method: 'Bank Transfer', due_date: '2026-07-30', last_payment_date: '2026-06-30', customer: { id: 4, name: 'Kigali Supermarket' }, items: [{ id: 5, sale_id: 4, product_id: 6, qty: 150, unit_price: 25, total: 3750 }] },
  { id: 5, business_id: 2, reference: 'SALE-005', customer_id: 5, sale_date: '2026-06-29', total: 1000, paid: 1000, status: 'paid', payment_method: 'Mobile Money', due_date: '2026-07-29', last_payment_date: '2026-06-29', customer: { id: 5, name: 'Restaurant Chain' }, items: [{ id: 6, sale_id: 5, product_id: 7, qty: 50, unit_price: 20, total: 1000 }] },
  { id: 6, business_id: 3, reference: 'SALE-006', customer_id: 6, sale_date: '2026-06-30', total: 5000, paid: 2500, status: 'partial', payment_method: 'Wire Transfer', due_date: '2026-07-30', last_payment_date: '2026-06-30', customer: { id: 6, name: 'Kigali City Council' }, items: [{ id: 7, sale_id: 6, product_id: 9, qty: 500, unit_price: 10, total: 5000 }] },
  { id: 7, business_id: 3, reference: 'SALE-007', customer_id: 7, sale_date: '2026-06-28', total: 6600, paid: 6600, status: 'paid', payment_method: 'Bank Transfer', due_date: '2026-07-28', last_payment_date: '2026-06-28', customer: { id: 7, name: 'Construction Company A' }, items: [{ id: 8, sale_id: 7, product_id: 10, qty: 300, unit_price: 22, total: 6600 }] },
];

export const MOCK_PURCHASES: PurchaseDto[] = [
  { id: 1, business_id: 1, reference: 'PO-001', supplier_id: 1, purchase_date: '2026-06-10', total: 6000, paid: 6000, status: 'received', payment_method: 'Bank Transfer', due_date: '2026-07-10', last_payment_date: '2026-06-10', supplier: { id: 1, name: 'Dell Rwanda' }, items: [{ id: 1, purchase_id: 1, product_id: 1, qty: 5, unit_cost: 1200, total: 6000 }] },
  { id: 2, business_id: 1, reference: 'PO-002', supplier_id: 2, purchase_date: '2026-06-15', total: 1000, paid: 500, status: 'partial', payment_method: 'Credit Card', due_date: '2026-07-15', last_payment_date: '2026-06-15', supplier: { id: 2, name: 'HP East Africa' }, items: [{ id: 2, purchase_id: 2, product_id: 2, qty: 4, unit_cost: 250, total: 1000 }] },
  { id: 3, business_id: 2, reference: 'PO-003', supplier_id: 3, purchase_date: '2026-06-28', total: 2250, paid: 2250, status: 'received', payment_method: 'Bank Transfer', due_date: '2026-07-28', last_payment_date: '2026-06-28', supplier: { id: 3, name: 'Farmers Coop' }, items: [{ id: 3, purchase_id: 3, product_id: 6, qty: 150, unit_cost: 15, total: 2250 }] },
  { id: 4, business_id: 2, reference: 'PO-004', supplier_id: 4, purchase_date: '2026-06-25', total: 960, paid: 960, status: 'received', payment_method: 'Bank Transfer', due_date: '2026-07-25', last_payment_date: '2026-06-25', supplier: { id: 4, name: 'Rice Millers Ltd' }, items: [{ id: 4, purchase_id: 4, product_id: 7, qty: 80, unit_cost: 12, total: 960 }] },
  { id: 5, business_id: 3, reference: 'PO-005', supplier_id: 5, purchase_date: '2026-06-20', total: 3000, paid: 3000, status: 'received', payment_method: 'Wire Transfer', due_date: '2026-07-20', last_payment_date: '2026-06-20', supplier: { id: 5, name: 'Cementco Ltd' }, items: [{ id: 5, purchase_id: 5, product_id: 9, qty: 500, unit_cost: 6, total: 3000 }] },
];

export const MOCK_CATEGORIES: CategoryDto[] = [
  { id: 1, business_id: 1, name: 'Electronics', description: 'Electronic devices and components' },
  { id: 2, business_id: 1, name: 'Printers', description: 'Printing devices' },
  { id: 3, business_id: 1, name: 'Infrastructure', description: 'IT infrastructure' },
  { id: 4, business_id: 1, name: 'Networking', description: 'Network equipment' },
  { id: 5, business_id: 1, name: 'Accessories', description: 'Computer accessories' },
  { id: 6, business_id: 2, name: 'Grains', description: 'Grain products' },
  { id: 7, business_id: 2, name: 'Oils', description: 'Cooking oils' },
  { id: 8, business_id: 3, name: 'Building Materials', description: 'Construction materials' },
  { id: 9, business_id: 3, name: 'Steel', description: 'Steel products' },
  { id: 10, business_id: 5, name: 'Snacks', description: 'Packaged snacks' },
  { id: 11, business_id: 5, name: 'Beverages', description: 'Drinks and beverages' },
];

export const MOCK_CONTACTS: ContactDto[] = [
  { id: 1, business_id: 1, name: 'Rwanda Development Board', email: 'info@rdb.rw', phone: '+250788000001', contact_type: 'customer' },
  { id: 2, business_id: 1, name: 'MTN Rwanda', email: 'billing@mtn.rw', phone: '+250788000002', contact_type: 'customer' },
  { id: 3, business_id: 1, name: 'Dell Rwanda', email: 'sales@dell.rw', phone: '+250788000003', contact_type: 'supplier' },
  { id: 4, business_id: 1, name: 'HP East Africa', email: 'orders@hp.com', phone: '+250788000004', contact_type: 'supplier' },
  { id: 5, business_id: 2, name: 'Kigali Supermarket', email: 'purchasing@kigalimart.rw', phone: '+250788000005', contact_type: 'customer' },
  { id: 6, business_id: 2, name: 'Farmers Coop', email: 'info@farmerscoop.rw', phone: '+250788000006', contact_type: 'supplier' },
  { id: 7, business_id: 3, name: 'Kigali City Council', email: 'procurement@kigalicity.gov.rw', phone: '+250788000007', contact_type: 'customer' },
  { id: 8, business_id: 3, name: 'Cementco Ltd', email: 'sales@cementco.rw', phone: '+250788000008', contact_type: 'supplier' },
];

export const MOCK_WAREHOUSES: WarehouseDto[] = [
  { id: 1, business_id: 1, name: 'Main Warehouse - Kicukiro', location: 'Kicukiro, Kigali' },
  { id: 2, business_id: 1, name: 'Downtown Store', location: 'CBD, Kigali' },
  { id: 3, business_id: 2, name: 'Gikondo Storage', location: 'Gikondo, Kigali' },
  { id: 4, business_id: 3, name: 'Musanze Yard', location: 'Musanze' },
];

export const MOCK_ACCOUNTS: AccountDto[] = [
  { id: 1, business_id: 1, name: 'Cash - Bank of Kigali', code: '1001', type: 'asset', balance: 150000 },
  { id: 2, business_id: 1, name: 'Accounts Receivable', code: '1101', type: 'asset', balance: 25000 },
  { id: 3, business_id: 1, name: 'Inventory', code: '1201', type: 'asset', balance: 45000 },
  { id: 4, business_id: 1, name: 'Accounts Payable', code: '2101', type: 'liability', balance: 12000 },
  { id: 5, business_id: 1, name: 'Sales Revenue', code: '4101', type: 'revenue', balance: 250000 },
  { id: 6, business_id: 1, name: 'Cost of Goods Sold', code: '5101', type: 'expense', balance: 150000 },
  { id: 7, business_id: 1, name: 'Salaries Expense', code: '6101', type: 'expense', balance: 60000 },
  { id: 8, business_id: 1, name: 'Rent Expense', code: '6102', type: 'expense', balance: 10000 },
];

export const MOCK_JOURNAL_ENTRIES: JournalEntryDto[] = [
  { id: 1, business_id: 1, reference: 'JE-001', date: '2026-06-30', total_debit: 4797, total_credit: 4797, lines: [
    { id: 1, journal_entry_id: 1, account_id: 1, amount: 4797, type: 'debit', description: 'Cash from Sale SALE-001' },
    { id: 2, journal_entry_id: 1, account_id: 5, amount: 4797, type: 'credit', description: 'Revenue from Sale SALE-001' },
  ]},
  { id: 2, business_id: 1, reference: 'JE-002', date: '2026-06-25', total_debit: 6000, total_credit: 6000, lines: [
    { id: 3, journal_entry_id: 2, account_id: 3, amount: 6000, type: 'debit', description: 'Inventory from PO-001' },
    { id: 4, journal_entry_id: 2, account_id: 4, amount: 6000, type: 'credit', description: 'Payable for PO-001' },
  ]},
];

export const MOCK_FISCAL_YEARS: FiscalYearDto[] = [
  { id: 1, business_id: 1, start_date: '2026-01-01', end_date: '2026-12-31', is_open: true },
  { id: 2, business_id: 2, start_date: '2026-01-01', end_date: '2026-12-31', is_open: true },
  { id: 3, business_id: 3, start_date: '2026-01-01', end_date: '2026-12-31', is_open: true },
];

export const MOCK_NOTIFICATIONS: NotificationDto[] = [
  { id: 1, title: 'New sale recorded', body: 'Sale SALE-001 for $4,797 has been recorded.', level: 'info', read: false, created_at: '2026-06-28T14:30:00Z' },
  { id: 2, title: 'Low stock alert', body: 'Server Rack 42U is low on stock (2 remaining).', level: 'warning', read: false, created_at: '2026-06-28T10:00:00Z' },
  { id: 3, title: 'Payment received', body: 'Payment of $4,797 received for Invoice INV-001.', level: 'info', read: true, created_at: '2026-06-27T09:00:00Z' },
  { id: 4, title: 'Purchase order received', body: 'PO-001 from Dell Rwanda has been fully received.', level: 'info', read: true, created_at: '2026-06-10T16:00:00Z' },
  { id: 5, title: 'New owner application', body: 'A new owner application requires review.', level: 'info', read: false, created_at: '2026-06-30T08:00:00Z' },
];

export const MOCK_RECEIVABLES: ReceivableDto[] = [
  { id: 1, business_id: 1, customer_id: 2, amount: 299, due_date: '2026-07-25', status: 'open' },
  { id: 2, business_id: 1, customer_id: 3, amount: 245, due_date: '2026-07-20', status: 'open' },
  { id: 3, business_id: 3, customer_id: 6, amount: 2500, due_date: '2026-07-30', status: 'open' },
];

export const MOCK_PAYABLES: PayableDto[] = [
  { id: 1, business_id: 1, supplier_id: 2, amount: 500, due_date: '2026-07-15', status: 'open' },
  { id: 2, business_id: 1, supplier_id: 4, amount: 1200, due_date: '2026-07-20', status: 'open' },
];

export const MOCK_STOCK_MOVEMENTS: StockMovementDto[] = [
  { id: 1, business_id: 1, product_id: 1, qty: 5, from_warehouse_id: 1, to_warehouse_id: 2, reason: 'Transfer to downtown store', created_at: '2026-06-25T10:00:00Z' },
  { id: 2, business_id: 1, product_id: 5, qty: 20, reason: 'Stock adjustment - found in inventory', created_at: '2026-06-20T14:00:00Z' },
];

export const MOCK_BUSINESS_USERS: BusinessUserDto[] = [
  { id: 1, business_id: 1, user_id: 2, role: 'OWNER' },
  { id: 2, business_id: 1, user_id: 3, role: 'MANAGER' },
  { id: 3, business_id: 2, user_id: 2, role: 'OWNER' },
  { id: 4, business_id: 3, user_id: 2, role: 'OWNER' },
  { id: 5, business_id: 4, user_id: 5, role: 'OWNER' },
  { id: 6, business_id: 5, user_id: 2, role: 'OWNER' },
  { id: 7, business_id: 6, user_id: 5, role: 'OWNER' },
];

export const MOCK_OWNER_APPLICATIONS: OwnerApplicationDto[] = [
  { id: 1, business_id: 6, user_id: 4, status: 'pending', created_at: '2026-06-28T10:00:00Z', business: { id: 6, name: 'Nyamirambo Services', industry: 'Services', city: 'Kigali', country: 'Rwanda', monthly_revenue: 50000, monthly_expenses: 35000, cash_balance: 15000, net_profit: 15000 }, user: { id: 4, first_name: 'Normal', last_name: 'User', email: 'user@accplan.com' } },
  { id: 2, business_id: 4, user_id: 4, status: 'approved', created_at: '2026-06-25T14:00:00Z', business: { id: 4, name: 'Lake Kivu Logistics', industry: 'Logistics', city: 'Gisenyi', country: 'Rwanda' }, user: { id: 4, first_name: 'Normal', last_name: 'User', email: 'user@accplan.com' } },
];

export function getMockPortfolioDashboard(): PortfolioDashboardDto {
  return {
    stat_cards: [
      { title: 'Total Income', value: 485000, change: 12.5, note: 'All owned businesses' },
      { title: 'Total Expenses', value: 312000, change: -3.2, note: 'All owned businesses' },
      { title: 'Account Balance', value: 173000, note: 'Combined cash balance' },
      { title: 'Pending Invoices', value: 3744, note: 'Open or overdue invoices' },
    ],
    total_income: 485000,
    total_income_month: 42500,
    total_income_change_pct: 12.5,
    total_expenses: 312000,
    total_expenses_month: 28000,
    total_expenses_change_pct: -3.2,
    account_balance: 173000,
    pending_invoices: 3744,
    recent_transactions: [
      { type: 'Sale', sign: '+', amount: 4797, date: '2026-06-28', description: 'Sale SALE-001 - Kigali Tech Solutions' },
      { type: 'Sale', sign: '+', amount: 1000, date: '2026-06-29', description: 'Sale SALE-005 - Rwanda Fresh Foods' },
      { type: 'Expense', sign: '-', amount: 2250, date: '2026-06-28', description: 'Purchase PO-003 - Rwanda Fresh Foods' },
      { type: 'Expense', sign: '-', amount: 3000, date: '2026-06-20', description: 'Purchase PO-005 - Mountain View Construction' },
      { type: 'Sale', sign: '+', amount: 6600, date: '2026-06-28', description: 'Sale SALE-007 - Mountain View Construction' },
      { type: 'Sale', sign: '+', amount: 3750, date: '2026-06-30', description: 'Sale SALE-004 - Rwanda Fresh Foods' },
    ],
    gross_income: 173000,
    net_profit: 86500,
    revenue_trend: [
      { label: 'Jan', value: 35000 },
      { label: 'Feb', value: 38000 },
      { label: 'Mar', value: 42000 },
      { label: 'Apr', value: 39000 },
      { label: 'May', value: 45000 },
      { label: 'Jun', value: 48500 },
    ],
    cashflow_trend: [
      { label: 'Jan', value: 12000 },
      { label: 'Feb', value: 15000 },
      { label: 'Mar', value: 18000 },
      { label: 'Apr', value: 16000 },
      { label: 'May', value: 22000 },
      { label: 'Jun', value: 25000 },
    ],
    expense_breakdown: [
      { label: 'Salaries', amount: 120000, percent: 38.5 },
      { label: 'Utilities', amount: 25000, percent: 8.0 },
      { label: 'Rent', amount: 45000, percent: 14.4 },
      { label: 'Marketing', amount: 18000, percent: 5.8 },
      { label: 'COGS', amount: 84000, percent: 26.9 },
      { label: 'Other', amount: 20000, percent: 6.4 },
    ],
  };
}

export function getMockAdminDashboard(): PortfolioDashboardDto {
  return {
    stat_cards: [
      { title: 'Total Users', value: 156, change: 8, note: 'Active platform users' },
      { title: 'Total Businesses', value: 48, change: 3, note: 'Registered businesses' },
      { title: 'Platform Revenue', value: 28500, change: 15.2, note: 'Monthly subscription revenue' },
      { title: 'Pending Applications', value: 5, note: 'Owner applications awaiting review' },
      { title: 'System Uptime', value: 99.97, change: 0.02, note: 'Last 30 days' },
    ],
    total_income: 28500,
    total_income_month: 28500,
    total_income_change_pct: 15.2,
    total_expenses: 12000,
    total_expenses_month: 12000,
    total_expenses_change_pct: 2.1,
    account_balance: 150000,
    pending_invoices: 5,
    recent_transactions: [
      { type: 'Subscription', sign: '+', amount: 28500, date: '2026-06-30', description: 'Monthly subscription fees' },
      { type: 'Infrastructure', sign: '-', amount: 4500, date: '2026-06-28', description: 'Cloud hosting costs' },
      { type: 'Subscription', sign: '+', amount: 27900, date: '2026-05-30', description: 'Monthly subscription fees' },
    ],
    gross_income: 28500,
    net_profit: 16500,
    revenue_trend: [
      { label: 'Jan', value: 22000 },
      { label: 'Feb', value: 23500 },
      { label: 'Mar', value: 25000 },
      { label: 'Apr', value: 26000 },
      { label: 'May', value: 27900 },
      { label: 'Jun', value: 28500 },
    ],
    cashflow_trend: [
      { label: 'Jan', value: 15000 },
      { label: 'Feb', value: 16000 },
      { label: 'Mar', value: 17500 },
      { label: 'Apr', value: 18500 },
      { label: 'May', value: 19500 },
      { label: 'Jun', value: 20500 },
    ],
    expense_breakdown: [
      { label: 'Infrastructure', amount: 4500, percent: 37.5 },
      { label: 'Salaries', amount: 5000, percent: 41.7 },
      { label: 'Marketing', amount: 1500, percent: 12.5 },
      { label: 'Other', amount: 1000, percent: 8.3 },
    ],
  };
}

let nextId = 100;
export function generateId(): number {
  return ++nextId;
}
