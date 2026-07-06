import type { BusinessUserDto } from '../types';
import { apiFetch } from './appClient';

export type BusinessUserAssignmentPayload = {
  business_id: string;
  user_id: string;
  role: BusinessUserDto['role'];
};

export type BusinessUsersListParams = {
  take?: number;
  skip?: number;
};

function toQueryString(params?: BusinessUsersListParams): string {
  if (!params) return '';
  const searchParams = new URLSearchParams();
  if (typeof params.take === 'number') searchParams.set('take', String(params.take));
  if (typeof params.skip === 'number') searchParams.set('skip', String(params.skip));
  return searchParams.toString();
}

export const businessUsersClient = {
  getAll: async (params: BusinessUsersListParams | string = ''): Promise<BusinessUserDto[]> => {
    const query = typeof params === 'string' ? params : toQueryString(params);
    const qs = query ? `?${query}` : '';
    return apiFetch<BusinessUserDto[]>(`/api/business-users${qs}`);
  },
  assign: async (payload: BusinessUserAssignmentPayload): Promise<BusinessUserDto> => {
    return apiFetch<BusinessUserDto>('/api/business-users', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default businessUsersClient;
