import type { PayableDto } from '../types';
import { MOCK_PAYABLES } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const payablesClient = {
  getAll: async (businessId?: string): Promise<PayableDto[]> => {
    await delay();
    if (!businessId) return MOCK_PAYABLES;
    return MOCK_PAYABLES.filter((p) => String(p.business_id) === businessId);
  },
};

export default payablesClient;
