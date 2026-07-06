import type { ReportDto } from '../types';
import { apiFetch } from './appClient';

export const reportsClient = {
  getAll: async (businessId?: string): Promise<ReportDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<ReportDto[]>(`/api/reports${params}`);
  },
  getById: async (id: string): Promise<ReportDto> => {
    return apiFetch<ReportDto>(`/api/reports/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<ReportDto> => {
    return apiFetch<ReportDto>('/api/reports', { method: 'POST', body: JSON.stringify(payload) });
  },
  generateDaily: async (payload: Record<string, any>): Promise<any> => {
    return apiFetch<any>('/api/reports/generate-daily', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default reportsClient;
