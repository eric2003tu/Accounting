import type { FiscalYearDto } from '../types';
import { apiFetch } from './appClient';

export const fiscalYearsClient = {
  getAll: async (businessId?: string): Promise<FiscalYearDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<FiscalYearDto[]>(`/api/fiscal-years${params}`);
  },
  create: async (payload: Record<string, any>): Promise<FiscalYearDto> => {
    return apiFetch<FiscalYearDto>('/api/fiscal-years', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default fiscalYearsClient;
