import type { UserDto } from '../types';
import { MOCK_USERS } from '@/app/lib/mockData';

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const usersClient = {
  create: async (payload: Record<string, any>): Promise<UserDto> => {
    await delay();
    return { id: Date.now(), ...payload, is_active: true, created_at: new Date().toISOString() } as UserDto;
  },
  getAll: async (params = ''): Promise<UserDto[]> => {
    await delay();
    return MOCK_USERS;
  },
  getById: async (id: string): Promise<UserDto> => {
    await delay();
    const user = MOCK_USERS.find((u) => String(u.id) === id);
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    return user;
  },
  update: async (id: string, payload: Record<string, any>): Promise<UserDto> => {
    await delay();
    const user = MOCK_USERS.find((u) => String(u.id) === id);
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    return { ...user, ...payload, id: user.id };
  },
  delete: async (id: string): Promise<void> => {
    await delay();
  },
};

export default usersClient;
