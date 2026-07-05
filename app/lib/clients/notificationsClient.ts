import type { NotificationDto } from '../types';
import { MOCK_NOTIFICATIONS, generateId } from '@/app/lib/mockData';

function delay(ms = 100) { return new Promise((resolve) => setTimeout(resolve, ms)); }

export const notificationsClient = {
  getAll: async (businessId?: string): Promise<NotificationDto[]> => {
    await delay();
    return MOCK_NOTIFICATIONS;
  },
  create: async (payload: Record<string, any>): Promise<NotificationDto> => {
    await delay();
    return { id: generateId(), ...payload } as NotificationDto;
  },
};

export default notificationsClient;
