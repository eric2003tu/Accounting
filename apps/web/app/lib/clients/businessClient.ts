import type { BusinessDto } from '../types';
import { apiFetch, getCurrentUser } from './appClient';

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

export const businessClient = {
  getAll: async (params = ''): Promise<BusinessDto[]> => {
    const qs = params ? `?${params}` : '';
    return apiFetch<BusinessDto[]>(`/api/businesses${qs}`);
  },
  getOwned: async (): Promise<BusinessDto[]> => {
    const user = getCurrentUser();
    const userId = user?.id || '';
    return apiFetch<BusinessDto[]>(`/api/businesses?owned_by=${encodeURIComponent(userId)}`);
  },
  getManaged: async (): Promise<BusinessDto[]> => {
    const user = getCurrentUser();
    const userId = user?.id || '';
    return apiFetch<BusinessDto[]>(`/api/businesses?managed_by=${encodeURIComponent(userId)}`);
  },
  getOwnedDashboard: async (): Promise<PortfolioDashboardDto> => {
    return apiFetch<PortfolioDashboardDto>('/api/dashboard?type=owned');
  },
  getManagedDashboard: async (): Promise<PortfolioDashboardDto> => {
    return apiFetch<PortfolioDashboardDto>('/api/dashboard?type=managed');
  },
  getAdminDashboard: async (): Promise<PortfolioDashboardDto> => {
    return apiFetch<PortfolioDashboardDto>('/api/dashboard?type=admin');
  },
  getOwnerApplications: async (skip = 0, take = 50): Promise<OwnerApplicationListResponse> => {
    return apiFetch<OwnerApplicationListResponse>(`/api/owner-applications?skip=${skip}&take=${take}`);
  },
  approveOwnerApplication: async (applicationId: string | number): Promise<{ success: boolean }> => {
    return apiFetch<{ success: boolean }>(`/api/owner-applications/${encodeURIComponent(String(applicationId))}`, { method: 'PUT', body: JSON.stringify({ status: 'approved' }) });
  },
  rejectOwnerApplication: async (applicationId: string | number): Promise<{ success: boolean }> => {
    return apiFetch<{ success: boolean }>(`/api/owner-applications/${encodeURIComponent(String(applicationId))}`, { method: 'PUT', body: JSON.stringify({ status: 'rejected' }) });
  },
  applyOwner: async (businessId: string | number, userId?: string | number): Promise<unknown> => {
    return apiFetch<unknown>('/api/owner-applications', { method: 'POST', body: JSON.stringify({ business_id: businessId, user_id: userId }) });
  },
  approveOwner: async (businessId: string | number, userId: string | number): Promise<unknown> => {
    return apiFetch<unknown>('/api/business-users', { method: 'POST', body: JSON.stringify({ business_id: businessId, user_id: userId }) });
  },
  getById: async (id: string): Promise<BusinessDto> => {
    return apiFetch<BusinessDto>(`/api/businesses/${encodeURIComponent(id)}`);
  },
  create: async (payload: CreateBusinessPayload): Promise<BusinessDto> => {
    return apiFetch<BusinessDto>('/api/businesses', { method: 'POST', body: JSON.stringify(payload) });
  },
  delete: async (id: string): Promise<void> => {
    await apiFetch<void>(`/api/businesses/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};

export default businessClient;
