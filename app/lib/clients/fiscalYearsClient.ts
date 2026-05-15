import type { FiscalYearDto } from '../types';
import { apiFetch } from './appClient';

export const fiscalYearsClient = {
  getAll: (businessId?: string): Promise<FiscalYearDto[]> => apiFetch(`/fiscal-years${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<FiscalYearDto> => apiFetch('/fiscal-years', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default fiscalYearsClient;