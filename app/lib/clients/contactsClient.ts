import type { ContactDto } from '../types';
import { MOCK_CONTACTS, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const contactsClient = {
  getAll: async (businessId?: string): Promise<ContactDto[]> => {
    await delay();
    if (!businessId) return MOCK_CONTACTS;
    return MOCK_CONTACTS.filter((c) => String(c.business_id) === businessId);
  },
  getById: async (id: string): Promise<ContactDto> => {
    await delay();
    const contact = MOCK_CONTACTS.find((c) => String(c.id) === id);
    if (!contact) throw Object.assign(new Error('Contact not found'), { status: 404 });
    return contact;
  },
  create: async (payload: Record<string, any>): Promise<ContactDto> => {
    await delay();
    return { id: generateId(), ...payload } as ContactDto;
  },
};

export default contactsClient;
