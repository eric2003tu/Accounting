import type { BusinessUserDto } from '../types';
import { apiFetch } from './appClient';

export type BusinessUserAssignmentPayload = {
  business_id: string;
  user_id: string;
  role: string;
};

export const businessUsersClient = {
  getAll: (params = ''): Promise<BusinessUserDto[]> => apiFetch(`/business-users${params ? `?${params}` : ''}`, { method: 'GET', withAuth: true }),
  assign: (payload: BusinessUserAssignmentPayload): Promise<BusinessUserDto> =>
    apiFetch('/business-users', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
  create: (payload: BusinessUserAssignmentPayload): Promise<BusinessUserDto> =>
    apiFetch('/business-users', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default businessUsersClient;