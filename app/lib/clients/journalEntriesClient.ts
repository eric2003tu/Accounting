import type { JournalEntryDto } from '../types';
import { MOCK_JOURNAL_ENTRIES, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const journalEntriesClient = {
  getAll: async (businessId?: string): Promise<JournalEntryDto[]> => {
    await delay();
    if (!businessId) return MOCK_JOURNAL_ENTRIES;
    return MOCK_JOURNAL_ENTRIES.filter((j) => String(j.business_id) === businessId);
  },
  getById: async (id: string): Promise<JournalEntryDto> => {
    await delay();
    const entry = MOCK_JOURNAL_ENTRIES.find((j) => String(j.id) === id);
    if (!entry) throw Object.assign(new Error('Journal entry not found'), { status: 404 });
    return entry;
  },
  create: async (payload: Record<string, any>): Promise<JournalEntryDto> => {
    await delay();
    return { id: generateId(), ...payload, created_at: new Date().toISOString() } as JournalEntryDto;
  },
};

export default journalEntriesClient;
