import type { JournalLineDto } from '../types';
import { generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const journalLinesClient = {
  getAll: async (journalId?: string): Promise<JournalLineDto[]> => {
    await delay();
    return [];
  },
  create: async (payload: Record<string, any>): Promise<JournalLineDto> => {
    await delay();
    return { id: generateId(), ...payload } as JournalLineDto;
  },
};

export default journalLinesClient;
