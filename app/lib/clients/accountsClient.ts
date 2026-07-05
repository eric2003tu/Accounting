import type { AccountDto } from '../types';
import { MOCK_ACCOUNTS, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const accountsClient = {
  getAll: async (businessId?: string): Promise<AccountDto[]> => {
    await delay();
    if (!businessId) return MOCK_ACCOUNTS;
    return MOCK_ACCOUNTS.filter((a) => String(a.business_id) === businessId);
  },
  getById: async (id: string): Promise<AccountDto> => {
    await delay();
    const account = MOCK_ACCOUNTS.find((a) => String(a.id) === id);
    if (!account) throw Object.assign(new Error('Account not found'), { status: 404 });
    return account;
  },
  create: async (payload: Record<string, any>): Promise<AccountDto> => {
    await delay();
    return { id: generateId(), ...payload } as AccountDto;
  },
};

export default accountsClient;
