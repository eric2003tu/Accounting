import type { BusinessDto } from '../types';
import { apiFetch } from './appClient';

export type DashboardTrendPoint = {
  label: string;
  value: number;
};

export type DashboardStatCard = {
  title: string;
  value: number;
  change?: string | number;
  note?: string;
};

export type DashboardTransaction = {
  type: string;
  sign: '+' | '-';
  amount: number;
  date: string;
  description: string;
};

export type DashboardExpenseBreakdownRow = {
  label: string;
  amount: number;
  percent?: number;
};

export type OwnerApplicationBusinessDto = {
  id: string | number;
  name?: string | null;
  legal_name?: string | null;
  legalName?: string | null;
  trade_name?: string | null;
  tradeName?: string | null;
  contact_email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  industry?: string | null;
  status?: string | null;
  monthly_revenue?: number | string | null;
  monthly_expenses?: number | string | null;
  cash_balance?: number | string | null;
  net_profit?: number | string | null;
  created_at?: string | null;
};

export type OwnerApplicationUserDto = {
  id: string | number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  created_at?: string | null;
};

export type OwnerApplicationDto = {
  id: string | number;
  business_id: string | number;
  user_id: string | number;
  status: string;
  created_at?: string | null;
  business?: OwnerApplicationBusinessDto | null;
  user?: OwnerApplicationUserDto | null;
};

export type OwnerApplicationListResponse = {
  count: number;
  status: string;
  data: OwnerApplicationDto[];
};

export type PortfolioDashboardDto = {
  stat_cards: DashboardStatCard[];
  total_income: number;
  total_income_month?: number;
  total_income_change_pct?: number;
  total_expenses: number;
  total_expenses_month?: number;
  total_expenses_change_pct?: number;
  account_balance: number;
  pending_invoices: number;
  recent_transactions: DashboardTransaction[];
  gross_income: number;
  net_profit: number;
  revenue_trend: DashboardTrendPoint[];
  cashflow_trend: DashboardTrendPoint[];
  expense_breakdown: DashboardExpenseBreakdownRow[];
};

type OwnedBusinessFinancials = {
  monthlyRevenue: number;
  monthlyExpenses: number;
  cashBalance: number;
  overdueInvoices: number;
  netProfit: number;
  revenueTrend: Array<{ label: string; value: number }>;
  cashFlowTrend?: Array<{ label: string; value: number }>;
  expenseBreakdown: Array<{ label: string; value: number }>;
};

type OwnedBusinessDto = BusinessDto & {
  businessName?: string;
  legalName?: string;
  financials?: OwnedBusinessFinancials;
  business_users?: Array<Record<string, any>>;
  accounts?: Array<Record<string, any>>;
  categories?: Array<Record<string, any>>;
  contacts?: Array<Record<string, any>>;
  fiscal_years?: Array<Record<string, any>>;
  journal_entries?: Array<Record<string, any>>;
  notifications?: Array<Record<string, any>>;
  products?: Array<Record<string, any>>;
  purchases?: Array<Record<string, any>>;
  sales?: Array<Record<string, any>>;
  stock_movements?: Array<Record<string, any>>;
  warehouses?: Array<Record<string, any>>;
  receivables?: Array<Record<string, any>>;
  payables?: Array<Record<string, any>>;
  reports?: Array<Record<string, any>>;
};

const defaultFinancials: OwnedBusinessFinancials = {
  monthlyRevenue: 0,
  monthlyExpenses: 0,
  cashBalance: 0,
  overdueInvoices: 0,
  netProfit: 0,
  revenueTrend: [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
  ],
  expenseBreakdown: [
    { label: 'Salaries', value: 0 },
    { label: 'Utilities', value: 0 },
    { label: 'Rent', value: 0 },
    { label: 'Marketing', value: 0 },
    { label: 'Other', value: 0 },
  ],
};

function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toText(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

function normalizeTrend(points: unknown): DashboardTrendPoint[] {
  if (!Array.isArray(points)) return [];
  return points.map((point: any) => ({
    label: toText(point?.label),
    value: toNumber(point?.value),
  }));
}

function normalizeStatCards(cards: unknown): DashboardStatCard[] {
  if (!Array.isArray(cards)) return [];
  return cards.map((card: any) => ({
    title: toText(card?.title),
    value: toNumber(card?.value),
    change: card?.change,
    note: toText(card?.note),
  }));
}

function normalizeTransactions(transactions: unknown): DashboardTransaction[] {
  if (!Array.isArray(transactions)) return [];
  return transactions.map((item: any) => ({
    type: toText(item?.type),
    sign: item?.sign === '-' ? '-' : '+',
    amount: toNumber(item?.amount),
    date: toText(item?.date),
    description: toText(item?.description),
  }));
}

function normalizeExpenseBreakdown(input: unknown): DashboardExpenseBreakdownRow[] {
  if (Array.isArray(input)) {
    return input.map((row: any) => ({
      label: toText(row?.label || row?.name || 'Other'),
      amount: toNumber(row?.amount ?? row?.value),
      percent: typeof row?.percent === 'number' ? row.percent : undefined,
    }));
  }

  if (!input || typeof input !== 'object') return [];

  return Object.entries(input as Record<string, any>).map(([label, row]) => ({
    label,
    amount: toNumber((row as any)?.amount ?? (row as any)?.value),
    percent: typeof (row as any)?.percent === 'number' ? (row as any).percent : undefined,
  }));
}

function normalizePortfolioDashboard(raw: Record<string, any> | null | undefined): PortfolioDashboardDto {
  return {
    stat_cards: normalizeStatCards(raw?.stat_cards),
    total_income: toNumber(raw?.total_income),
    total_income_month: toNumber(raw?.total_income_month),
    total_income_change_pct: toNumber(raw?.total_income_change_pct),
    total_expenses: toNumber(raw?.total_expenses),
    total_expenses_month: toNumber(raw?.total_expenses_month),
    total_expenses_change_pct: toNumber(raw?.total_expenses_change_pct),
    account_balance: toNumber(raw?.account_balance),
    pending_invoices: toNumber(raw?.pending_invoices),
    recent_transactions: normalizeTransactions(raw?.recent_transactions),
    gross_income: toNumber(raw?.gross_income),
    net_profit: toNumber(raw?.net_profit),
    revenue_trend: normalizeTrend(raw?.revenue_trend),
    cashflow_trend: normalizeTrend(raw?.cashflow_trend),
    expense_breakdown: normalizeExpenseBreakdown(raw?.expense_breakdown),
  };
}

function parseReportData(report: Record<string, any> | undefined): Record<string, any> | null {
  if (!report?.data) return null;
  if (typeof report.data === 'object') return report.data;
  if (typeof report.data !== 'string') return null;
  try {
    return JSON.parse(report.data);
  } catch {
    return null;
  }
}

function buildFinancials(raw: OwnedBusinessDto): OwnedBusinessFinancials {
  const incomeReport = raw.reports?.find((report) => report?.type === 'INCOME_STATEMENT');
  const balanceSheet = raw.reports?.find((report) => report?.type === 'BALANCE_SHEET');
  const incomeData = parseReportData(incomeReport);
  const balanceData = parseReportData(balanceSheet);

  const revenue = toNumber(incomeData?.totals?.revenue);
  const costOfSales = toNumber(incomeData?.totals?.costOfSales);
  const operatingExpenses = toNumber(incomeData?.totals?.operatingExpenses);
  const netProfit = toNumber(incomeData?.totals?.netProfit);
  const cashBalance = toNumber(balanceData?.totals?.currentAssets);

  return {
    ...defaultFinancials,
    monthlyRevenue: revenue,
    monthlyExpenses: costOfSales + operatingExpenses,
    cashBalance,
    overdueInvoices: toNumber(raw.receivables?.filter((item) => String(item?.status || '').toUpperCase() === 'OPEN').length),
    netProfit,
  };
}

function normalizeBusiness(raw: Record<string, any>): OwnedBusinessDto {
  const businessName = String(raw?.businessName || raw?.business_name || raw?.trade_name || raw?.tradeName || raw?.name || '');
  const legalName = String(raw?.legalName || raw?.legal_name || businessName);
  const normalized = {
    ...raw,
    id: raw?.id,
    name: raw?.name || businessName,
    businessName,
    legal_name: raw?.legal_name || legalName,
    legalName,
  } as OwnedBusinessDto;

  normalized.financials = raw?.financials || buildFinancials(normalized);
  return normalized;
}

async function fetchBusinessArray(path: string): Promise<OwnedBusinessDto[]> {
  try {
    const res = await apiFetch(path, { method: 'GET', withAuth: true });
    if (!res) return [];
    if (Array.isArray(res)) return res.map((item) => normalizeBusiness(item));
    return [normalizeBusiness(res)];
  } catch (error: any) {
    if (error?.status === 404) return [];
    throw error;
  }
}

export const businessClient = {
  getAll: async (params = ''): Promise<BusinessDto[]> => {
    const res = await apiFetch(`/business${params ? `?${params}` : ''}`, { method: 'GET', withAuth: true });
    if (!res) return [];
    if (Array.isArray(res)) return res as BusinessDto[];
    if (Array.isArray((res as Record<string, any>)?.data)) return (res as Record<string, any>).data as BusinessDto[];
    return [(res as Record<string, any>).data ?? res] as BusinessDto[];
  },
  getOwned: (): Promise<BusinessDto[]> => fetchBusinessArray('/business/owned/my-business'),
  getManaged: (): Promise<BusinessDto[]> => fetchBusinessArray('/business/managed/my-business'),
  getOwnedDashboard: async (): Promise<PortfolioDashboardDto> => {
    const res = await apiFetch('/business/owned/dashboard', { method: 'GET', withAuth: true });
    return normalizePortfolioDashboard(res);
  },
  getManagedDashboard: async (): Promise<PortfolioDashboardDto> => {
    try {
      const res = await apiFetch('/business/managed/dashboard', { method: 'GET', withAuth: true });
      return normalizePortfolioDashboard(res);
    } catch (error: any) {
      if (error?.status === 404) {
        const owned = await apiFetch('/business/owned/dashboard', { method: 'GET', withAuth: true });
        return normalizePortfolioDashboard(owned);
      }
      throw error;
    }
  },
  getAdminDashboard: async (): Promise<PortfolioDashboardDto> => {
    const res = await apiFetch('/business/admin/dashboard', { method: 'GET', withAuth: true });
    return normalizePortfolioDashboard(res);
  },
  getOwnerApplications: async (skip = 0, take = 50): Promise<OwnerApplicationListResponse> => {
    const params = new URLSearchParams();
    params.set('skip', String(skip));
    params.set('take', String(take));
    const res = await apiFetch(`/business/admin/owner-applications?${params.toString()}`, { method: 'GET', withAuth: true });
    return {
      count: toNumber((res as Record<string, any>)?.count ?? 0),
      status: toText((res as Record<string, any>)?.status ?? ''),
      data: Array.isArray((res as Record<string, any>)?.data) ? (res as Record<string, any>).data : [],
    };
  },
  approveOwnerApplication: (applicationId: string | number): Promise<{ success: boolean }> =>
    apiFetch(`/business/admin/owner-applications/${applicationId}/approve`, { method: 'PATCH', withAuth: true }),
  rejectOwnerApplication: (applicationId: string | number): Promise<{ success: boolean }> =>
    apiFetch(`/business/admin/owner-applications/${applicationId}/reject`, { method: 'PATCH', withAuth: true }),
  applyOwner: (businessId: string | number, userId?: string | number): Promise<unknown> =>
    apiFetch(`/business/${businessId}/apply-owner`, { method: 'POST', body: JSON.stringify({ userId }), withAuth: true }),
  approveOwner: (businessId: string | number, userId: string | number): Promise<unknown> => apiFetch(`/business/${businessId}/approve-owner`, { method: 'POST', body: JSON.stringify({ userId }), withAuth: true }),
  getById: (id: string): Promise<BusinessDto> => apiFetch(`/business/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<BusinessDto> => apiFetch('/business', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  delete: (id: string): Promise<void> => apiFetch(`/business/${id}`, { method: 'DELETE', withAuth: true }),
};

export default businessClient;