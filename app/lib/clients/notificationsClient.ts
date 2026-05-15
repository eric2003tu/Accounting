import type { NotificationDto } from '../types';
import { apiFetch } from './appClient';

export const notificationsClient = {
  getAll: (businessId?: string): Promise<NotificationDto[]> => apiFetch(`/notifications${businessId ? `?businessId=${businessId}` : ''}`, { method: 'GET', withAuth: true }),
  create: (payload: Record<string, any>): Promise<NotificationDto> => apiFetch('/notifications', { method: 'POST', body: JSON.stringify(payload), withAuth: true }),
};

export default notificationsClient;