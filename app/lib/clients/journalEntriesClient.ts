import type { JournalEntryDto } from '../types';
import { apiFetch } from './appClient';

export const journalEntriesClient = {
  getAll: (businessId?: string): Promise<JournalEntryDto[]> => apiFetch(`/journal-entries${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<JournalEntryDto> => apiFetch(`/journal-entries/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<JournalEntryDto> => apiFetch('/journal-entries', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default journalEntriesClient;