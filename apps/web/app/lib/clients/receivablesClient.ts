import type { ReceivableDto } from '../types';
import { apiFetch } from './appClient';

export const receivablesClient = {
  getAll: async (businessId?: string): Promise<ReceivableDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<ReceivableDto[]>(`/api/receivables${params}`);
  },
};

export default receivablesClient;
