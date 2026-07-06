import type { ContactDto } from '../types';
import { apiFetch } from './appClient';

export const contactsClient = {
  getAll: async (businessId?: string): Promise<ContactDto[]> => {
    const params = businessId ? `?business_id=${encodeURIComponent(businessId)}` : '';
    return apiFetch<ContactDto[]>(`/api/contacts${params}`);
  },
  getById: async (id: string): Promise<ContactDto> => {
    return apiFetch<ContactDto>(`/api/contacts/${encodeURIComponent(id)}`);
  },
  create: async (payload: Record<string, any>): Promise<ContactDto> => {
    return apiFetch<ContactDto>('/api/contacts', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default contactsClient;
