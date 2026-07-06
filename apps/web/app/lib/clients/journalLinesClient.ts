import type { JournalLineDto } from '../types';
import { apiFetch } from './appClient';

export const journalLinesClient = {
  getAll: async (journalId?: string): Promise<JournalLineDto[]> => {
    const params = journalId ? `?journal_entry_id=${encodeURIComponent(journalId)}` : '';
    return apiFetch<JournalLineDto[]>(`/api/journal-lines${params}`);
  },
  create: async (payload: Record<string, any>): Promise<JournalLineDto> => {
    return apiFetch<JournalLineDto>('/api/journal-lines', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default journalLinesClient;
