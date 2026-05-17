import type { BusinessDto } from '../types';
import { apiFetch } from './appClient';

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
  getAll: (params = ''): Promise<BusinessDto[]> => apiFetch(`/business${params ? `?${params}` : ''}`, { method: 'GET', withAuth: true }),
  getOwned: (): Promise<BusinessDto[]> => fetchBusinessArray('/business/owned/my-business'),
  getManaged: (): Promise<BusinessDto[]> => fetchBusinessArray('/business/managed/my-business'),
  getById: (id: string): Promise<BusinessDto> => apiFetch(`/business/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<BusinessDto> => apiFetch('/business', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  delete: (id: string): Promise<void> => apiFetch(`/business/${id}`, { method: 'DELETE', withAuth: true }),
};

export default businessClient;