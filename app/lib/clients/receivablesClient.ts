import type { ReceivableDto } from '../types';
import { apiFetch } from './appClient';

export const receivablesClient = {
  getAll: (businessId?: string): Promise<ReceivableDto[]> => apiFetch(`/receivables${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
};

export default receivablesClient;