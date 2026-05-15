import type { ReportDto } from '../types';
import { apiFetch } from './appClient';

export const reportsClient = {
  getAll: (businessId?: string): Promise<ReportDto[]> => apiFetch(`/reports${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<ReportDto> => apiFetch(`/reports/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<ReportDto> => apiFetch('/reports', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  generateDaily: (payload: Record<string, any>): Promise<any> => apiFetch('/reports/generate-daily', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default reportsClient;