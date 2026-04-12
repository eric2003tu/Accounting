'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getNotificationsByAudience,
  notifications as seedNotifications,
  type NotificationAudience,
  type NotificationItem,
} from './notificationsData';

const STORAGE_KEY = 'accounting-notification-read-ids';
const UPDATE_EVENT = 'accounting:notifications-updated';

const DEFAULT_READ_IDS = seedNotifications
  .filter((notification) => notification.status === 'Read')
  .map((notification) => notification.id);

function normalizeIds(ids: number[]) {
  return Array.from(
    new Set(ids.filter((id) => Number.isInteger(id)))
  );
}

function readIdsFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return normalizeIds(parsed.map((value) => Number(value)));
  } catch {
    return [];
  }
}

function withDefaultReadIds(ids: number[]) {
  return normalizeIds([...DEFAULT_READ_IDS, ...ids]);
}

function persistReadIds(ids: number[]) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalized = normalizeIds(ids);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function useNotifications(audience: NotificationAudience) {
  const [readIds, setReadIds] = useState<number[]>(DEFAULT_READ_IDS);

  useEffect(() => {
    setReadIds(withDefaultReadIds(readIdsFromStorage()));
  }, []);

  useEffect(() => {
    function handleUpdate() {
      setReadIds(withDefaultReadIds(readIdsFromStorage()));
    }

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(UPDATE_EVENT, handleUpdate);
  }, []);

  const notifications = useMemo(() => {
    return getNotificationsByAudience(audience).map((notification) => ({
      ...notification,
      status: (readIds.includes(notification.id) ? 'Read' : 'Unread') as NotificationItem['status'],
    }));
  }, [audience, readIds]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.status === 'Unread').length,
    [notifications]
  );

  const markAsRead = useCallback((id: number) => {
    setReadIds((previousIds) => {
      if (previousIds.includes(id)) {
        return previousIds;
      }

      const nextIds = normalizeIds([...previousIds, id]);
      persistReadIds(nextIds);
      return nextIds;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    const idsForAudience = getNotificationsByAudience(audience).map((notification) => notification.id);

    setReadIds((previousIds) => {
      const nextIds = normalizeIds([...previousIds, ...idsForAudience]);
      persistReadIds(nextIds);
      return nextIds;
    });
  }, [audience]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}