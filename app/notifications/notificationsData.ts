export type NotificationAudience = 'admin' | 'dashboard';
export type NotificationSeverity = 'info' | 'success' | 'warning' | 'critical';

export type NotificationItem = {
  id: number;
  audience: NotificationAudience;
  title: string;
  message: string;
  businessName: string;
  ownerName: string;
  severity: NotificationSeverity;
  category: 'Financial Statement' | 'Billing' | 'Security' | 'System';
  status: 'Unread' | 'Read';
  createdAt: string;
  actionLabel: string;
  link: string;
};

export const notifications: NotificationItem[] = [
  {
    id: 1,
    audience: 'dashboard',
    title: 'Daily financial statement ready',
    message: 'The latest balance sheet, income statement, and cash summary for Acme Holdings Ltd are ready for review.',
    businessName: 'Acme Holdings Ltd',
    ownerName: 'Eric Tuyishime',
    severity: 'success',
    category: 'Financial Statement',
    status: 'Unread',
    createdAt: '2026-04-12 06:00',
    actionLabel: 'View business',
    link: '/admin/businesses/1',
  },
  {
    id: 2,
    audience: 'dashboard',
    title: 'Daily financial statement ready',
    message: 'Nexa Retail Group Ltd daily financial statement has been generated and is ready for action.',
    businessName: 'Nexa Retail Group Ltd',
    ownerName: 'Aline Niyonsaba',
    severity: 'success',
    category: 'Financial Statement',
    status: 'Unread',
    createdAt: '2026-04-12 06:00',
    actionLabel: 'Review report',
    link: '/admin/businesses/2',
  },
  {
    id: 3,
    audience: 'dashboard',
    title: 'Payment overdue reminder',
    message: 'Peak Foods Distributors has overdue invoices that require immediate attention.',
    businessName: 'Peak Foods Distributors',
    ownerName: 'Diane Mutesi',
    severity: 'warning',
    category: 'Billing',
    status: 'Unread',
    createdAt: '2026-04-12 07:10',
    actionLabel: 'Open business',
    link: '/admin/businesses/5',
  },
  {
    id: 4,
    audience: 'dashboard',
    title: 'Monthly close completed',
    message: 'Nova Health Services completed its auto-generated monthly financial close successfully.',
    businessName: 'Nova Health Services',
    ownerName: 'Jean Claude',
    severity: 'success',
    category: 'Financial Statement',
    status: 'Read',
    createdAt: '2026-04-11 18:30',
    actionLabel: 'View summary',
    link: '/admin/businesses/6',
  },
  {
    id: 5,
    audience: 'admin',
    title: 'System-wide statements generated',
    message: 'All scheduled daily financial statements completed successfully across the active business portfolio.',
    businessName: 'Portfolio-wide',
    ownerName: 'Admin',
    severity: 'success',
    category: 'System',
    status: 'Unread',
    createdAt: '2026-04-12 06:05',
    actionLabel: 'Review portfolio',
    link: '/admin/businesses',
  },
  {
    id: 6,
    audience: 'admin',
    title: 'High-risk business detected',
    message: 'Peak Foods Distributors reported negative net profit and elevated overdue invoices.',
    businessName: 'Peak Foods Distributors',
    ownerName: 'Diane Mutesi',
    severity: 'critical',
    category: 'Financial Statement',
    status: 'Unread',
    createdAt: '2026-04-12 07:12',
    actionLabel: 'Open business',
    link: '/admin/businesses/5',
  },
  {
    id: 7,
    audience: 'admin',
    title: 'Billing cycle reminder',
    message: 'Nova Health Services is approaching the next billing date and requires reconciliation review.',
    businessName: 'Nova Health Services',
    ownerName: 'Jean Claude',
    severity: 'warning',
    category: 'Billing',
    status: 'Read',
    createdAt: '2026-04-11 20:10',
    actionLabel: 'View billing',
    link: '/admin/businesses/6',
  },
  {
    id: 8,
    audience: 'admin',
    title: 'Security check passed',
    message: 'Scheduled MFA health checks completed without exceptions.',
    businessName: 'System-wide',
    ownerName: 'Admin',
    severity: 'info',
    category: 'Security',
    status: 'Read',
    createdAt: '2026-04-11 22:00',
    actionLabel: 'Inspect logs',
    link: '/admin/audit-logs',
  },
];

export function getNotificationsByAudience(audience: NotificationAudience) {
  return notifications.filter((notification) => notification.audience === audience);
}
