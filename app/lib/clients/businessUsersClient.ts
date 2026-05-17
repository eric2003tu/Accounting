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
  getAll: (params: BusinessUsersListParams | string = ''): Promise<BusinessUserDto[]> => {
    const query = typeof params === 'string' ? params : toQueryString(params);
    return apiFetch(`/business-users${query ? `?${query}` : ''}`, { method: 'GET', withAuth: true, });
  },
  assign: (payload: BusinessUserAssignmentPayload): Promise<BusinessUserDto> =>
    apiFetch('/business-users', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default businessUsersClient;