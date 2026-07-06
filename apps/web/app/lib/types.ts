// Centralized DTOs for API responses. Fields are permissive to match backend shapes.

export interface ProductDto {
  id: string | number;
  business_id: string | number;
  name: string;
  sku?: string | null;
  barcode?: string | null;
  unit_cost?: number | string | null;
  unit_price?: number | string | null;
  reorder_level?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  category_id?: string | number | null;
  // Extended optional fields returned by the products API
  category?: string | null;
  brand?: string | null;
  supplier?: string | null;
  currency?: string | null;
  tax_rate?: number | string | null;
  taxRate?: number | string | null;
  discount_rate?: number | string | null;
  discountRate?: number | string | null;
  stock_quantity?: number | string | null;
  stockQuantity?: number | string | null;
  safety_stock?: number | string | null;
  safetyStock?: number | string | null;
  valuation_method?: string | null;
  valuationMethod?: string | null;
  warehouse?: string | null;
  cogs_to_date?: number | string | null;
  cogsToDate?: number | string | null;
  revenue_to_date?: number | string | null;
  revenueToDate?: number | string | null;
  last_purchase_date?: string | null;
  lastPurchaseDate?: string | null;
  last_sale_date?: string | null;
  lastSaleDate?: string | null;
  status?: string | null;
}

export interface SaleItemDto {
  id: string | number;
  sale_id: string | number;
  product_id: string | number;
  qty: number;
  unit_price?: number | string | null;
  total?: number | string | null;
}

export interface SaleDto {
  id: string | number;
  business_id: string | number;
  reference?: string | null;
  customer_id?: string | number | null;
  sale_date?: string | null;
  total?: number | string | null;
  paid?: number | string | null;
  status?: string | null;
  payment_method?: string | null;
  due_date?: string | null;
  last_payment_date?: string | null;
  items?: SaleItemDto[] | null;
  customer?: any;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PurchaseItemDto {
  id: string | number;
  purchase_id: string | number;
  product_id?: string | number | null;
  qty: number;
  unit_cost?: number | string | null;
  total?: number | string | null;
}

export interface PurchaseDto {
  id: string | number;
  business_id: string | number;
  reference?: string | null;
  supplier_id?: string | number | null;
  purchase_date?: string | null;
  total?: number | string | null;
  paid?: number | string | null;
  status?: string | null;
  payment_method?: string | null;
  due_date?: string | null;
  last_payment_date?: string | null;
  items?: PurchaseItemDto[] | null;
  supplier?: any;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface UserDto {
  id: string | number;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  system_role?: string | null;
  systemRole?: string | null;
  phone?: string | null;
  avatar?: string | null;
  roles?: string[] | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface BusinessDto {
  id: string | number;
  name: string;
  legal_name?: string | null;
  vat_number?: string | null;
  currency?: string | null;
  timezone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  // Additional fields often returned by the backend
  owner_id?: string | number | null;
  ownerId?: string | number | null;
  business_name?: string | null;
  businessName?: string | null;
  trade_name?: string | null;
  tradeName?: string | null;
  registration_no?: string | null;
  registrationNo?: string | null;
  subscription?: string | null;
  billing_cycle?: string | null;
  next_billing_date?: string | null;
  nextBillingDate?: string | null;
  industry?: string | null;
  status?: string | null;
  financials?: Record<string, any> | null;
}

export interface CategoryDto {
  id: string | number;
  business_id?: string | number | null;
  name: string;
  description?: string | null;
}

export interface ContactDto {
  id: string | number;
  business_id?: string | number | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  contact_type?: 'customer' | 'supplier' | 'other' | null;
}

export interface WarehouseDto {
  id: string | number;
  business_id?: string | number | null;
  name: string;
  location?: string | null;
}

export interface AccountDto {
  id: string | number;
  business_id?: string | number | null;
  name: string;
  code?: string | null;
  type?: string | null;
  balance?: number | string | null;
}

export interface JournalLineDto {
  id: string | number;
  journal_entry_id: string | number;
  account_id: string | number;
  amount: number | string;
  type: 'debit' | 'credit' | string;
  description?: string | null;
}

export interface JournalEntryDto {
  id: string | number;
  business_id?: string | number | null;
  reference?: string | null;
  date?: string | null;
  lines?: JournalLineDto[] | null;
  total_debit?: number | string | null;
  total_credit?: number | string | null;
  created_at?: string | null;
}

export interface FiscalYearDto {
  id: string | number;
  business_id?: string | number | null;
  start_date: string;
  end_date: string;
  is_open?: boolean | null;
}

export interface ReportDto {
  id: string | number;
  business_id?: string | number | null;
  name: string;
  type?: string | null;
  params?: Record<string, any> | null;
  result?: any;
  created_at?: string | null;
}

export interface NotificationDto {
  id: string | number;
  business_id?: string | number | null;
  title?: string | null;
  body?: string | null;
  level?: 'info' | 'warning' | 'error' | null;
  read?: boolean | null;
  created_at?: string | null;
}

export interface ReceivableDto {
  id: string | number;
  business_id?: string | number | null;
  customer_id?: string | number | null;
  amount?: number | string | null;
  due_date?: string | null;
  status?: string | null;
}

export interface PayableDto {
  id: string | number;
  business_id?: string | number | null;
  supplier_id?: string | number | null;
  amount?: number | string | null;
  due_date?: string | null;
  status?: string | null;
}

export interface StockMovementDto {
  id: string | number;
  business_id?: string | number | null;
  product_id?: string | number | null;
  qty?: number | string | null;
  from_warehouse_id?: string | number | null;
  to_warehouse_id?: string | number | null;
  reason?: string | null;
  created_at?: string | null;
}

export type BusinessUserRole = 'OWNER' | 'MANAGER' | 'ACCOUNTANT' | 'STAFF' | string;

export interface BusinessUserDto {
  id: string | number;
  business_id: string | number;
  user_id: string | number;
  role: BusinessUserRole;
}

export interface AuthTokenDto {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  user?: UserDto | null;
}

export type GenericListResponse<T> = {
  data: T[];
  total?: number;
};

