import type { PayableDto } from '../types';
import { apiFetch } from './appClient';

export const payablesClient = {
  getAll: (businessId?: string): Promise<PayableDto[]> => apiFetch(`/payables${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
};

export default payablesClient;