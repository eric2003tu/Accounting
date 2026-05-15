import type { ContactDto } from '../types';
import { apiFetch } from './appClient';

export const contactsClient = {
  getAll: (businessId?: string): Promise<ContactDto[]> => apiFetch(`/contacts${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  getById: (id: string): Promise<ContactDto> => apiFetch(`/contacts/${id}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<ContactDto> => apiFetch('/contacts', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default contactsClient;