import type { ReceivableDto } from '../types';
import { MOCK_RECEIVABLES } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const receivablesClient = {
  getAll: async (businessId?: string): Promise<ReceivableDto[]> => {
    await delay();
    if (!businessId) return MOCK_RECEIVABLES;
    return MOCK_RECEIVABLES.filter((r) => String(r.business_id) === businessId);
  },
};

export default receivablesClient;
