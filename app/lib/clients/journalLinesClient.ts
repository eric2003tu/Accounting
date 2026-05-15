import type { JournalLineDto } from '../types';
import { apiFetch } from './appClient';

export const journalLinesClient = {
  getAll: (journalId?: string): Promise<JournalLineDto[]> => apiFetch(`/journal-lines${journalId ? `?journalId=${journalId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<JournalLineDto> => apiFetch('/journal-lines', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default journalLinesClient;