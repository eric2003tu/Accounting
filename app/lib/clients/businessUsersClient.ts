import type { BusinessUserDto } from '../types';
import { MOCK_BUSINESS_USERS } from '@/app/lib/mockData';

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    await delay();
    return MOCK_BUSINESS_USERS;
  },
  assign: async (payload: BusinessUserAssignmentPayload): Promise<BusinessUserDto> => {
    await delay();
    return { id: Date.now(), business_id: Number(payload.business_id), user_id: Number(payload.user_id), role: payload.role };
  },
};

export default businessUsersClient;
