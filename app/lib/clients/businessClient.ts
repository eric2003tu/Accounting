import type { BusinessDto } from '../types';
import { MOCK_BUSINESSES, MOCK_OWNER_APPLICATIONS, getMockPortfolioDashboard, getMockAdminDashboard, generateId } from '@/app/lib/mockData';

export type DashboardTrendPoint = { label: string; value: number };
export type DashboardStatCard = { title: string; value: number; change?: string | number; note?: string };
export type DashboardTransaction = { type: string; sign: '+' | '-'; amount: number; date: string; description: string };
export type DashboardExpenseBreakdownRow = { label: string; amount: number; percent?: number };
export type OwnerApplicationBusinessDto = { id: string | number; name?: string | null; legal_name?: string | null; legalName?: string | null; trade_name?: string | null; tradeName?: string | null; contact_email?: string | null; phone?: string | null; address?: string | null; city?: string | null; country?: string | null; industry?: string | null; status?: string | null; monthly_revenue?: number | string | null; monthly_expenses?: number | string | null; cash_balance?: number | string | null; net_profit?: number | string | null; created_at?: string | null };
export type OwnerApplicationUserDto = { id: string | number; first_name?: string | null; last_name?: string | null; email?: string | null; created_at?: string | null };
export type OwnerApplicationDto = { id: string | number; business_id: string | number; user_id: string | number; status: string; created_at?: string | null; business?: OwnerApplicationBusinessDto | null; user?: OwnerApplicationUserDto | null };
export type OwnerApplicationListResponse = { count: number; status: string; data: OwnerApplicationDto[] };
export type CreateBusinessPayload = { name: string; contact_email?: string; phone?: string; address?: string; fiscal_year_start?: string; starting_money?: number; loans?: Array<Record<string, unknown>>; loans_offered?: Array<Record<string, unknown>> };
export type PortfolioDashboardDto = { stat_cards: DashboardStatCard[]; total_income: number; total_income_month?: number; total_income_change_pct?: number; total_expenses: number; total_expenses_month?: number; total_expenses_change_pct?: number; account_balance: number; pending_invoices: number; recent_transactions: DashboardTransaction[]; gross_income: number; net_profit: number; revenue_trend: DashboardTrendPoint[]; cashflow_trend: DashboardTrendPoint[]; expense_breakdown: DashboardExpenseBreakdownRow[] };

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ownedBusinessIds(): (string | number)[] {
  return [1, 2, 3, 5];
}

function managedBusinessIds(): (string | number)[] {
  return [1];
}

export const businessClient = {
  getAll: async (params = ''): Promise<BusinessDto[]> => {
    await delay();
    return MOCK_BUSINESSES;
  },
  getOwned: async (): Promise<BusinessDto[]> => {
    await delay();
    return MOCK_BUSINESSES.filter((b) => ownedBusinessIds().includes(b.id));
  },
  getManaged: async (): Promise<BusinessDto[]> => {
    await delay();
    return MOCK_BUSINESSES.filter((b) => managedBusinessIds().includes(b.id));
  },
  getOwnedDashboard: async (): Promise<PortfolioDashboardDto> => {
    await delay();
    return getMockPortfolioDashboard();
  },
  getManagedDashboard: async (): Promise<PortfolioDashboardDto> => {
    await delay();
    return getMockPortfolioDashboard();
  },
  getAdminDashboard: async (): Promise<PortfolioDashboardDto> => {
    await delay();
    return getMockAdminDashboard();
  },
  getOwnerApplications: async (skip = 0, take = 50): Promise<OwnerApplicationListResponse> => {
    await delay();
    const data = MOCK_OWNER_APPLICATIONS.slice(skip, skip + take);
    return { count: MOCK_OWNER_APPLICATIONS.length, status: 'success', data };
  },
  approveOwnerApplication: async (applicationId: string | number): Promise<{ success: boolean }> => {
    await delay();
    return { success: true };
  },
  rejectOwnerApplication: async (applicationId: string | number): Promise<{ success: boolean }> => {
    await delay();
    return { success: true };
  },
  applyOwner: async (businessId: string | number, userId?: string | number): Promise<unknown> => {
    await delay();
    return { success: true };
  },
  approveOwner: async (businessId: string | number, userId: string | number): Promise<unknown> => {
    await delay();
    return { success: true };
  },
  getById: async (id: string): Promise<BusinessDto> => {
    await delay();
    const business = MOCK_BUSINESSES.find((b) => String(b.id) === id);
    if (!business) throw Object.assign(new Error('Business not found'), { status: 404 });
    return business;
  },
  create: async (payload: CreateBusinessPayload): Promise<BusinessDto> => {
    await delay();
    const newBusiness: BusinessDto = {
      id: generateId(),
      name: payload.name,
      business_name: payload.name,
      owner_id: 2,
      ownerId: 2,
      currency: 'RWF',
      status: 'active',
      created_at: new Date().toISOString(),
    };
    return newBusiness;
  },
  delete: async (id: string): Promise<void> => {
    await delay();
  },
};

export default businessClient;
