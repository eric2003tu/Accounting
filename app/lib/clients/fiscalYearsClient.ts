import type { FiscalYearDto } from '../types';
import { MOCK_FISCAL_YEARS, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const fiscalYearsClient = {
  getAll: async (businessId?: string): Promise<FiscalYearDto[]> => {
    await delay();
    if (!businessId) return MOCK_FISCAL_YEARS;
    return MOCK_FISCAL_YEARS.filter((f) => String(f.business_id) === businessId);
  },
  create: async (payload: Record<string, any>): Promise<FiscalYearDto> => {
    await delay();
    return { id: generateId(), ...payload } as FiscalYearDto;
  },
};

export default fiscalYearsClient;
