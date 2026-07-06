import type { NotificationDto } from '../types';
import { apiFetch } from './appClient';

export const notificationsClient = {
  getAll: async (): Promise<NotificationDto[]> => {
    return apiFetch<NotificationDto[]>('/api/notifications');
  },
  create: async (payload: Record<string, any>): Promise<NotificationDto> => {
    return apiFetch<NotificationDto>('/api/notifications', { method: 'POST', body: JSON.stringify(payload) });
  },
};

export default notificationsClient;
