import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }
  return new PrismaClient();
}

const prisma = createPrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('User@12345', 10);

  // Users
  const users = await Promise.all([
    prisma.user.create({ data: { id: 1, email: 'admin@accplan.com', passwordHash, firstName: 'System', lastName: 'Admin', systemRole: 'ADMIN', phone: '+250700000001', isActive: true, createdAt: new Date('2025-01-01T00:00:00Z') } }),
    prisma.user.create({ data: { id: 2, email: 'eric.tuyishime@accplan.com', passwordHash, firstName: 'Eric', lastName: 'Tuyishime', systemRole: 'OWNER', phone: '+250700000002', isActive: true, createdAt: new Date('2025-01-01T00:00:00Z') } }),
    prisma.user.create({ data: { id: 3, email: 'jean.claude@accplan.com', passwordHash, firstName: 'Jean Claude', lastName: 'Ishimwe', systemRole: 'MANAGER', phone: '+250700000003', isActive: true, createdAt: new Date('2025-01-01T00:00:00Z') } }),
    prisma.user.create({ data: { id: 4, email: 'user@accplan.com', passwordHash, firstName: 'Normal', lastName: 'User', systemRole: 'NORMAL', phone: '+250700000004', isActive: true, createdAt: new Date('2025-01-01T00:00:00Z') } }),
    prisma.user.create({ data: { id: 5, email: 'diane@accplan.com', passwordHash, firstName: 'Diane', lastName: 'Mukamana', systemRole: 'OWNER', phone: '+250700000005', isActive: true, createdAt: new Date('2025-02-01T00:00:00Z') } }),
  ]);
  console.log(`Seeded ${users.length} users`);

  // Businesses
  const businesses = await Promise.all([
    prisma.business.create({ data: { id: 1, name: 'Kigali Tech Solutions', legalName: 'Kigali Tech Solutions Ltd', tradeName: 'KTS', vatNumber: 'VAT12345', registrationNo: 'REG001', currency: 'RWF', industry: 'Technology', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'premium', billingCycle: 'monthly', nextBillingDate: new Date('2026-08-01'), createdAt: new Date('2025-01-15T00:00:00Z') } }),
    prisma.business.create({ data: { id: 2, name: 'Rwanda Fresh Foods', legalName: 'Rwanda Fresh Foods Ltd', tradeName: 'RFF', vatNumber: 'VAT67890', registrationNo: 'REG002', currency: 'RWF', industry: 'Food & Beverage', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'standard', billingCycle: 'monthly', nextBillingDate: new Date('2026-08-15'), createdAt: new Date('2025-03-01T00:00:00Z') } }),
    prisma.business.create({ data: { id: 3, name: 'Mountain View Construction', legalName: 'Mountain View Construction Ltd', tradeName: 'MVC', registrationNo: 'REG003', currency: 'RWF', industry: 'Construction', city: 'Musanze', country: 'Rwanda', status: 'active', subscription: 'enterprise', billingCycle: 'quarterly', nextBillingDate: new Date('2026-10-01'), createdAt: new Date('2025-04-10T00:00:00Z') } }),
    prisma.business.create({ data: { id: 4, name: 'Lake Kivu Logistics', legalName: 'Lake Kivu Logistics Ltd', tradeName: 'LKL', registrationNo: 'REG004', currency: 'RWF', industry: 'Logistics', city: 'Gisenyi', country: 'Rwanda', status: 'active', subscription: 'standard', billingCycle: 'monthly', nextBillingDate: new Date('2026-08-20'), createdAt: new Date('2025-05-01T00:00:00Z') } }),
    prisma.business.create({ data: { id: 5, name: 'Kigali Mart Retail', legalName: 'Kigali Mart Retail Ltd', tradeName: 'KMR', registrationNo: 'REG005', currency: 'RWF', industry: 'Retail', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'standard', billingCycle: 'monthly', nextBillingDate: new Date('2026-09-01'), createdAt: new Date('2025-06-01T00:00:00Z') } }),
    prisma.business.create({ data: { id: 6, name: 'Nyamirambo Services', registrationNo: 'REG006', currency: 'RWF', industry: 'Services', city: 'Kigali', country: 'Rwanda', status: 'active', subscription: 'basic', billingCycle: 'monthly', nextBillingDate: new Date('2026-08-10'), createdAt: new Date('2025-07-01T00:00:00Z') } }),
  ]);
  console.log(`Seeded ${businesses.length} businesses`);

  // BusinessUsers
  const busUsers = await Promise.all([
    prisma.businessUser.create({ data: { id: 1, businessId: 1, userId: 2, role: 'OWNER' } }),
    prisma.businessUser.create({ data: { id: 2, businessId: 1, userId: 3, role: 'MANAGER' } }),
    prisma.businessUser.create({ data: { id: 3, businessId: 2, userId: 2, role: 'OWNER' } }),
    prisma.businessUser.create({ data: { id: 4, businessId: 3, userId: 2, role: 'OWNER' } }),
    prisma.businessUser.create({ data: { id: 5, businessId: 4, userId: 5, role: 'OWNER' } }),
    prisma.businessUser.create({ data: { id: 6, businessId: 5, userId: 2, role: 'OWNER' } }),
    prisma.businessUser.create({ data: { id: 7, businessId: 6, userId: 5, role: 'OWNER' } }),
  ]);
  console.log(`Seeded ${busUsers.length} business users`);

  // Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { id: 1, businessId: 1, name: 'Electronics', description: 'Electronic devices and components' } }),
    prisma.category.create({ data: { id: 2, businessId: 1, name: 'Printers', description: 'Printing devices' } }),
    prisma.category.create({ data: { id: 3, businessId: 1, name: 'Infrastructure', description: 'IT infrastructure' } }),
    prisma.category.create({ data: { id: 4, businessId: 1, name: 'Networking', description: 'Network equipment' } }),
    prisma.category.create({ data: { id: 5, businessId: 1, name: 'Accessories', description: 'Computer accessories' } }),
    prisma.category.create({ data: { id: 6, businessId: 2, name: 'Grains', description: 'Grain products' } }),
    prisma.category.create({ data: { id: 7, businessId: 2, name: 'Oils', description: 'Cooking oils' } }),
    prisma.category.create({ data: { id: 8, businessId: 3, name: 'Building Materials', description: 'Construction materials' } }),
    prisma.category.create({ data: { id: 9, businessId: 3, name: 'Steel', description: 'Steel products' } }),
    prisma.category.create({ data: { id: 10, businessId: 5, name: 'Snacks', description: 'Packaged snacks' } }),
    prisma.category.create({ data: { id: 11, businessId: 5, name: 'Beverages', description: 'Drinks and beverages' } }),
  ]);
  console.log(`Seeded ${categories.length} categories`);

  // Products
  const products = await Promise.all([
    prisma.product.create({ data: { id: 1, businessId: 1, categoryId: 1, name: 'Laptop Dell XPS 15', sku: 'DELL-XPS-15', unitCost: 1200, unitPrice: 1599, stockQuantity: 15, reorderLevel: 5, status: 'In Stock', createdAt: new Date('2025-06-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 2, businessId: 1, categoryId: 2, name: 'HP LaserJet Printer', sku: 'HP-LJ-200', unitCost: 250, unitPrice: 399, stockQuantity: 8, reorderLevel: 3, status: 'In Stock', createdAt: new Date('2025-06-10T00:00:00Z') } }),
    prisma.product.create({ data: { id: 3, businessId: 1, categoryId: 3, name: 'Server Rack 42U', sku: 'SRV-42U', unitCost: 3500, unitPrice: 4999, stockQuantity: 2, reorderLevel: 1, status: 'Low Stock', createdAt: new Date('2025-07-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 4, businessId: 1, categoryId: 4, name: 'Cisco Switch 2960', sku: 'CSCO-2960', unitCost: 800, unitPrice: 1299, stockQuantity: 0, reorderLevel: 2, status: 'Out of Stock', createdAt: new Date('2025-07-15T00:00:00Z') } }),
    prisma.product.create({ data: { id: 5, businessId: 1, categoryId: 5, name: 'USB-C Hub 7-in-1', sku: 'USB-C-7IN1', unitCost: 25, unitPrice: 49, stockQuantity: 50, reorderLevel: 20, status: 'In Stock', createdAt: new Date('2025-08-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 6, businessId: 2, categoryId: 6, name: 'Maize Flour 25kg', sku: 'MAIZE-25KG', unitCost: 15, unitPrice: 25, stockQuantity: 200, reorderLevel: 50, status: 'In Stock', createdAt: new Date('2025-09-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 7, businessId: 2, categoryId: 6, name: 'Rice Premium 10kg', sku: 'RICE-10KG', unitCost: 12, unitPrice: 20, stockQuantity: 150, reorderLevel: 30, status: 'In Stock', createdAt: new Date('2025-09-15T00:00:00Z') } }),
    prisma.product.create({ data: { id: 8, businessId: 2, categoryId: 7, name: 'Cooking Oil 5L', sku: 'OIL-5L', unitCost: 8, unitPrice: 14, stockQuantity: 80, reorderLevel: 20, status: 'In Stock', createdAt: new Date('2025-10-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 9, businessId: 3, categoryId: 8, name: 'Cement 50kg Bag', sku: 'CEM-50KG', unitCost: 6, unitPrice: 10, stockQuantity: 500, reorderLevel: 100, status: 'In Stock', createdAt: new Date('2025-11-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 10, businessId: 3, categoryId: 9, name: 'Steel Rebar 12mm', sku: 'REBAR-12MM', unitCost: 15, unitPrice: 22, stockQuantity: 300, reorderLevel: 50, status: 'In Stock', createdAt: new Date('2025-11-15T00:00:00Z') } }),
    prisma.product.create({ data: { id: 11, businessId: 5, categoryId: 10, name: 'Assorted Chips 50g', sku: 'CHIPS-50G', unitCost: 0.5, unitPrice: 1, stockQuantity: 1000, reorderLevel: 200, status: 'In Stock', createdAt: new Date('2026-01-01T00:00:00Z') } }),
    prisma.product.create({ data: { id: 12, businessId: 5, categoryId: 11, name: 'Mineral Water 1.5L', sku: 'WATER-1.5L', unitCost: 0.3, unitPrice: 0.7, stockQuantity: 500, reorderLevel: 100, status: 'In Stock', createdAt: new Date('2026-01-15T00:00:00Z') } }),
  ]);
  console.log(`Seeded ${products.length} products`);

  // Contacts
  const contacts = await Promise.all([
    prisma.contact.create({ data: { id: 1, businessId: 1, name: 'Rwanda Development Board', email: 'info@rdb.rw', phone: '+250788000001', contactType: 'customer' } }),
    prisma.contact.create({ data: { id: 2, businessId: 1, name: 'MTN Rwanda', email: 'billing@mtn.rw', phone: '+250788000002', contactType: 'customer' } }),
    prisma.contact.create({ data: { id: 3, businessId: 1, name: 'Dell Rwanda', email: 'sales@dell.rw', phone: '+250788000003', contactType: 'supplier' } }),
    prisma.contact.create({ data: { id: 4, businessId: 1, name: 'HP East Africa', email: 'orders@hp.com', phone: '+250788000004', contactType: 'supplier' } }),
    prisma.contact.create({ data: { id: 5, businessId: 2, name: 'Kigali Supermarket', email: 'purchasing@kigalimart.rw', phone: '+250788000005', contactType: 'customer' } }),
    prisma.contact.create({ data: { id: 6, businessId: 2, name: 'Farmers Coop', email: 'info@farmerscoop.rw', phone: '+250788000006', contactType: 'supplier' } }),
    prisma.contact.create({ data: { id: 7, businessId: 3, name: 'Kigali City Council', email: 'procurement@kigalicity.gov.rw', phone: '+250788000007', contactType: 'customer' } }),
    prisma.contact.create({ data: { id: 8, businessId: 3, name: 'Cementco Ltd', email: 'sales@cementco.rw', phone: '+250788000008', contactType: 'supplier' } }),
  ]);
  console.log(`Seeded ${contacts.length} contacts`);

  // Warehouses
  const warehouses = await Promise.all([
    prisma.warehouse.create({ data: { id: 1, businessId: 1, name: 'Main Warehouse - Kicukiro', location: 'Kicukiro, Kigali' } }),
    prisma.warehouse.create({ data: { id: 2, businessId: 1, name: 'Downtown Store', location: 'CBD, Kigali' } }),
    prisma.warehouse.create({ data: { id: 3, businessId: 2, name: 'Gikondo Storage', location: 'Gikondo, Kigali' } }),
    prisma.warehouse.create({ data: { id: 4, businessId: 3, name: 'Musanze Yard', location: 'Musanze' } }),
  ]);
  console.log(`Seeded ${warehouses.length} warehouses`);

  // Accounts
  const accounts = await Promise.all([
    prisma.account.create({ data: { id: 1, businessId: 1, name: 'Cash - Bank of Kigali', code: '1001', type: 'asset', balance: 150000 } }),
    prisma.account.create({ data: { id: 2, businessId: 1, name: 'Accounts Receivable', code: '1101', type: 'asset', balance: 25000 } }),
    prisma.account.create({ data: { id: 3, businessId: 1, name: 'Inventory', code: '1201', type: 'asset', balance: 45000 } }),
    prisma.account.create({ data: { id: 4, businessId: 1, name: 'Accounts Payable', code: '2101', type: 'liability', balance: 12000 } }),
    prisma.account.create({ data: { id: 5, businessId: 1, name: 'Sales Revenue', code: '4101', type: 'revenue', balance: 250000 } }),
    prisma.account.create({ data: { id: 6, businessId: 1, name: 'Cost of Goods Sold', code: '5101', type: 'expense', balance: 150000 } }),
    prisma.account.create({ data: { id: 7, businessId: 1, name: 'Salaries Expense', code: '6101', type: 'expense', balance: 60000 } }),
    prisma.account.create({ data: { id: 8, businessId: 1, name: 'Rent Expense', code: '6102', type: 'expense', balance: 10000 } }),
  ]);
  console.log(`Seeded ${accounts.length} accounts`);

  // FiscalYears
  const fiscalYears = await Promise.all([
    prisma.fiscalYear.create({ data: { id: 1, businessId: 1, startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), isOpen: true } }),
    prisma.fiscalYear.create({ data: { id: 2, businessId: 2, startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), isOpen: true } }),
    prisma.fiscalYear.create({ data: { id: 3, businessId: 3, startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), isOpen: true } }),
  ]);
  console.log(`Seeded ${fiscalYears.length} fiscal years`);

  // JournalEntries + Lines
  const je1 = await prisma.journalEntry.create({ data: { id: 1, businessId: 1, reference: 'JE-001', date: new Date('2026-06-30'), createdAt: new Date('2026-06-30T00:00:00Z') } });
  const je2 = await prisma.journalEntry.create({ data: { id: 2, businessId: 1, reference: 'JE-002', date: new Date('2026-06-25'), createdAt: new Date('2026-06-25T00:00:00Z') } });
  const jeLines = await Promise.all([
    prisma.journalLine.create({ data: { id: 1, journalEntryId: 1, accountId: 1, amount: 4797, type: 'debit', description: 'Cash from Sale SALE-001' } }),
    prisma.journalLine.create({ data: { id: 2, journalEntryId: 1, accountId: 5, amount: 4797, type: 'credit', description: 'Revenue from Sale SALE-001' } }),
    prisma.journalLine.create({ data: { id: 3, journalEntryId: 2, accountId: 3, amount: 6000, type: 'debit', description: 'Inventory from PO-001' } }),
    prisma.journalLine.create({ data: { id: 4, journalEntryId: 2, accountId: 4, amount: 6000, type: 'credit', description: 'Payable for PO-001' } }),
  ]);
  console.log(`Seeded 2 journal entries with ${jeLines.length} lines`);

  // Sales + Items
  await prisma.sale.create({ data: { id: 1, businessId: 1, reference: 'SALE-001', customerId: 1, saleDate: new Date('2026-06-28'), total: 4797, paid: 4797, status: 'paid', paymentMethod: 'Bank Transfer', dueDate: new Date('2026-07-28'), createdAt: new Date('2026-06-28T00:00:00Z') } });
  await prisma.sale.create({ data: { id: 2, businessId: 1, reference: 'SALE-002', customerId: 2, saleDate: new Date('2026-06-25'), total: 1299, paid: 1000, status: 'partial', paymentMethod: 'Credit Card', dueDate: new Date('2026-07-25'), createdAt: new Date('2026-06-25T00:00:00Z') } });
  await prisma.sale.create({ data: { id: 3, businessId: 1, reference: 'SALE-003', saleDate: new Date('2026-06-20'), total: 245, paid: 0, status: 'pending', paymentMethod: 'Cash', dueDate: new Date('2026-07-20'), createdAt: new Date('2026-06-20T00:00:00Z') } });
  await prisma.sale.create({ data: { id: 4, businessId: 2, reference: 'SALE-004', customerId: 5, saleDate: new Date('2026-06-30'), total: 3750, paid: 3750, status: 'paid', paymentMethod: 'Bank Transfer', dueDate: new Date('2026-07-30'), createdAt: new Date('2026-06-30T00:00:00Z') } });
  await prisma.sale.create({ data: { id: 5, businessId: 2, reference: 'SALE-005', customerId: 5, saleDate: new Date('2026-06-29'), total: 1000, paid: 1000, status: 'paid', paymentMethod: 'Mobile Money', dueDate: new Date('2026-07-29'), createdAt: new Date('2026-06-29T00:00:00Z') } });
  await prisma.sale.create({ data: { id: 6, businessId: 3, reference: 'SALE-006', customerId: 7, saleDate: new Date('2026-06-30'), total: 5000, paid: 2500, status: 'partial', paymentMethod: 'Wire Transfer', dueDate: new Date('2026-07-30'), createdAt: new Date('2026-06-30T00:00:00Z') } });
  await prisma.sale.create({ data: { id: 7, businessId: 3, reference: 'SALE-007', customerId: 7, saleDate: new Date('2026-06-28'), total: 6600, paid: 6600, status: 'paid', paymentMethod: 'Bank Transfer', dueDate: new Date('2026-07-28'), createdAt: new Date('2026-06-28T00:00:00Z') } });

  const saleItems = await Promise.all([
    prisma.saleItem.create({ data: { id: 1, saleId: 1, productId: 1, qty: 2, unitPrice: 1599, total: 3198 } }),
    prisma.saleItem.create({ data: { id: 2, saleId: 1, productId: 2, qty: 4, unitPrice: 399, total: 1596 } }),
    prisma.saleItem.create({ data: { id: 3, saleId: 2, productId: 4, qty: 1, unitPrice: 1299, total: 1299 } }),
    prisma.saleItem.create({ data: { id: 4, saleId: 3, productId: 5, qty: 5, unitPrice: 49, total: 245 } }),
    prisma.saleItem.create({ data: { id: 5, saleId: 4, productId: 6, qty: 150, unitPrice: 25, total: 3750 } }),
    prisma.saleItem.create({ data: { id: 6, saleId: 5, productId: 7, qty: 50, unitPrice: 20, total: 1000 } }),
    prisma.saleItem.create({ data: { id: 7, saleId: 6, productId: 9, qty: 500, unitPrice: 10, total: 5000 } }),
    prisma.saleItem.create({ data: { id: 8, saleId: 7, productId: 10, qty: 300, unitPrice: 22, total: 6600 } }),
  ]);
  console.log(`Seeded 7 sales with ${saleItems.length} items`);

  // Purchases + Items
  await prisma.purchase.create({ data: { id: 1, businessId: 1, reference: 'PO-001', supplierId: 3, purchaseDate: new Date('2026-06-10'), total: 6000, paid: 6000, status: 'received', paymentMethod: 'Bank Transfer', dueDate: new Date('2026-07-10'), createdAt: new Date('2026-06-10T00:00:00Z') } });
  await prisma.purchase.create({ data: { id: 2, businessId: 1, reference: 'PO-002', supplierId: 4, purchaseDate: new Date('2026-06-15'), total: 1000, paid: 500, status: 'partial', paymentMethod: 'Credit Card', dueDate: new Date('2026-07-15'), createdAt: new Date('2026-06-15T00:00:00Z') } });
  await prisma.purchase.create({ data: { id: 3, businessId: 2, reference: 'PO-003', supplierId: 6, purchaseDate: new Date('2026-06-28'), total: 2250, paid: 2250, status: 'received', paymentMethod: 'Bank Transfer', dueDate: new Date('2026-07-28'), createdAt: new Date('2026-06-28T00:00:00Z') } });
  await prisma.purchase.create({ data: { id: 4, businessId: 2, reference: 'PO-004', purchaseDate: new Date('2026-06-25'), total: 960, paid: 960, status: 'received', paymentMethod: 'Bank Transfer', dueDate: new Date('2026-07-25'), createdAt: new Date('2026-06-25T00:00:00Z') } });
  await prisma.purchase.create({ data: { id: 5, businessId: 3, reference: 'PO-005', supplierId: 8, purchaseDate: new Date('2026-06-20'), total: 3000, paid: 3000, status: 'received', paymentMethod: 'Wire Transfer', dueDate: new Date('2026-07-20'), createdAt: new Date('2026-06-20T00:00:00Z') } });

  const purchaseItems = await Promise.all([
    prisma.purchaseItem.create({ data: { id: 1, purchaseId: 1, productId: 1, qty: 5, unitCost: 1200, total: 6000 } }),
    prisma.purchaseItem.create({ data: { id: 2, purchaseId: 2, productId: 2, qty: 4, unitCost: 250, total: 1000 } }),
    prisma.purchaseItem.create({ data: { id: 3, purchaseId: 3, productId: 6, qty: 150, unitCost: 15, total: 2250 } }),
    prisma.purchaseItem.create({ data: { id: 4, purchaseId: 4, productId: 7, qty: 80, unitCost: 12, total: 960 } }),
    prisma.purchaseItem.create({ data: { id: 5, purchaseId: 5, productId: 9, qty: 500, unitCost: 6, total: 3000 } }),
  ]);
  console.log(`Seeded 5 purchases with ${purchaseItems.length} items`);

  // Notifications
  const notifications = await Promise.all([
    prisma.notification.create({ data: { id: 1, userId: 2, title: 'New sale recorded', body: 'Sale SALE-001 for $4,797 has been recorded.', level: 'info', read: false, createdAt: new Date('2026-06-28T14:30:00Z') } }),
    prisma.notification.create({ data: { id: 2, userId: 2, title: 'Low stock alert', body: 'Server Rack 42U is low on stock (2 remaining).', level: 'warning', read: false, createdAt: new Date('2026-06-28T10:00:00Z') } }),
    prisma.notification.create({ data: { id: 3, userId: 2, title: 'Payment received', body: 'Payment of $4,797 received for Invoice INV-001.', level: 'info', read: true, createdAt: new Date('2026-06-27T09:00:00Z') } }),
    prisma.notification.create({ data: { id: 4, userId: 2, title: 'Purchase order received', body: 'PO-001 from Dell Rwanda has been fully received.', level: 'info', read: true, createdAt: new Date('2026-06-10T16:00:00Z') } }),
    prisma.notification.create({ data: { id: 5, userId: 4, title: 'New owner application', body: 'A new owner application requires review.', level: 'info', read: false, createdAt: new Date('2026-06-30T08:00:00Z') } }),
  ]);
  console.log(`Seeded ${notifications.length} notifications`);

  // Receivables
  const receivables = await Promise.all([
    prisma.receivable.create({ data: { id: 1, businessId: 1, customerId: 2, amount: 299, dueDate: new Date('2026-07-25'), status: 'open' } }),
    prisma.receivable.create({ data: { id: 2, businessId: 1, amount: 245, dueDate: new Date('2026-07-20'), status: 'open' } }),
    prisma.receivable.create({ data: { id: 3, businessId: 3, customerId: 7, amount: 2500, dueDate: new Date('2026-07-30'), status: 'open' } }),
  ]);
  console.log(`Seeded ${receivables.length} receivables`);

  // Payables
  const payables = await Promise.all([
    prisma.payable.create({ data: { id: 1, businessId: 1, supplierId: 4, amount: 500, dueDate: new Date('2026-07-15'), status: 'open' } }),
    prisma.payable.create({ data: { id: 2, businessId: 1, amount: 1200, dueDate: new Date('2026-07-20'), status: 'open' } }),
  ]);
  console.log(`Seeded ${payables.length} payables`);

  // StockMovements
  const stockMovements = await Promise.all([
    prisma.stockMovement.create({ data: { id: 1, businessId: 1, productId: 1, qty: 5, fromWarehouseId: 1, toWarehouseId: 2, reason: 'Transfer to downtown store', createdAt: new Date('2026-06-25T10:00:00Z') } }),
    prisma.stockMovement.create({ data: { id: 2, businessId: 1, productId: 5, qty: 20, reason: 'Stock adjustment - found in inventory', createdAt: new Date('2026-06-20T14:00:00Z') } }),
  ]);
  console.log(`Seeded ${stockMovements.length} stock movements`);

  // OwnerApplications
  const ownerApps = await Promise.all([
    prisma.ownerApplication.create({ data: { id: 1, userId: 4, businessId: 6, businessName: 'Nyamirambo Services', status: 'pending', createdAt: new Date('2026-06-28T10:00:00Z') } }),
    prisma.ownerApplication.create({ data: { id: 2, userId: 4, businessId: 4, businessName: 'Lake Kivu Logistics', status: 'approved', createdAt: new Date('2026-06-25T14:00:00Z') } }),
  ]);
  console.log(`Seeded ${ownerApps.length} owner applications`);

  console.log('\nSeed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
