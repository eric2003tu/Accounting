import type { JournalEntryDto } from '../types';
import { apiFetch } from './appClient';

export const journalEntriesClient = {
  getAll: async (businessId?: string): Promise<JournalEntryDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<JournalEntryDto[]>(`/api/journal-entries${params}`);
  },
  getById: async (id: string): Promise<JournalEntryDto> => {
    return apiFetch<JournalEntryDto>(`/api/journal-entries/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<JournalEntryDto> => {
    return apiFetch<JournalEntryDto>('/api/journal-entries', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default journalEntriesClient;
