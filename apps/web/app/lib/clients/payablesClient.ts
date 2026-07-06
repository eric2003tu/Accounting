import type { PayableDto } from '../types';
import { apiFetch } from './appClient';

export const payablesClient = {
  getAll: async (businessId?: string): Promise<PayableDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<PayableDto[]>(`/api/payables${params}`);
  },
};

export default payablesClient;
