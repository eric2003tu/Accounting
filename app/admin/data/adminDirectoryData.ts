export type AdminUserRole = 'Owner' | 'Admin' | 'Accountant' | 'Viewer' | 'Support';
export type AdminUserStatus = 'Active' | 'Invited' | 'Suspended';
export type AdminMfaStatus = 'Enabled' | 'Pending' | 'Disabled';

export type BusinessFinancials = {
  monthlyRevenue: number;
  monthlyExpenses: number;
  netProfit: number;
  cashBalance: number;
  receivables: number;
  payables: number;
  assets: number;
  liabilities: number;
  equity: number;
  overdueInvoices: number;
  revenueTrend: Array<{ label: string; value: number }>;
  expenseBreakdown: Array<{ label: string; value: number }>;
};

export type AdminBusiness = {
  id: number;
  businessName: string;
  legalName: string;
  tradeName: string;
  taxId: string;
  registrationNo: string;
  industry: string;
  country: string;
  city: string;
  timezone: string;
  subscription: 'Starter' | 'Growth' | 'Professional' | 'Enterprise';
  billingCycle: 'Monthly' | 'Quarterly' | 'Yearly';
  nextBillingDate: string;
  status: 'Active' | 'Under Review' | 'Suspended';
  ownerId: number;
  financials: BusinessFinancials;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  mfa: AdminMfaStatus;
  lastLogin: string;
  joinedAt: string;
  department: string;
};

export const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: 'Aline Niyonsaba',
    email: 'aline@acme.com',
    phone: '+250 722 190 344',
    role: 'Admin',
    status: 'Active',
    mfa: 'Enabled',
    lastLogin: '2026-04-10 08:10',
    joinedAt: '2024-11-04',
    department: 'Operations',
  },
  {
    id: 2,
    name: 'Samuel Uwizeye',
    email: 'samuel@acme.com',
    phone: '+250 783 441 920',
    role: 'Accountant',
    status: 'Active',
    mfa: 'Enabled',
    lastLogin: '2026-04-10 07:55',
    joinedAt: '2025-01-16',
    department: 'Finance',
  },
  {
    id: 3,
    name: 'Diane Mutesi',
    email: 'diane@acme.com',
    phone: '+250 789 005 618',
    role: 'Viewer',
    status: 'Invited',
    mfa: 'Pending',
    lastLogin: '-',
    joinedAt: '2026-04-09',
    department: 'Executive Office',
  },
  {
    id: 4,
    name: 'Jean Claude',
    email: 'jean@acme.com',
    phone: '+250 782 564 229',
    role: 'Support',
    status: 'Suspended',
    mfa: 'Disabled',
    lastLogin: '2026-04-06 11:45',
    joinedAt: '2025-03-11',
    department: 'Customer Support',
  },
  {
    id: 5,
    name: 'Eric Tuyishime',
    email: 'eric@acme.com',
    phone: '+250 788 332 741',
    role: 'Owner',
    status: 'Active',
    mfa: 'Enabled',
    lastLogin: '2026-04-10 08:20',
    joinedAt: '2025-02-10',
    department: 'Founder Office',
  },
];

export const adminBusinesses: AdminBusiness[] = [
  {
    id: 1,
    businessName: 'Acme Holdings',
    legalName: 'Acme Holdings Ltd',
    tradeName: 'Acme',
    taxId: 'TIN-94502781',
    registrationNo: 'RDB-2025-445901',
    industry: 'Technology Services',
    country: 'Rwanda',
    city: 'Kigali',
    timezone: 'Africa/Kigali',
    subscription: 'Professional',
    billingCycle: 'Monthly',
    nextBillingDate: '2026-05-01',
    status: 'Active',
    ownerId: 5,
    financials: {
      monthlyRevenue: 168400,
      monthlyExpenses: 113700,
      netProfit: 54700,
      cashBalance: 204300,
      receivables: 58800,
      payables: 31600,
      assets: 641500,
      liabilities: 212000,
      equity: 429500,
      overdueInvoices: 4,
      revenueTrend: [
        { label: 'Nov', value: 129000 },
        { label: 'Dec', value: 136800 },
        { label: 'Jan', value: 141200 },
        { label: 'Feb', value: 153500 },
        { label: 'Mar', value: 160900 },
        { label: 'Apr', value: 168400 },
      ],
      expenseBreakdown: [
        { label: 'Payroll', value: 44000 },
        { label: 'Infrastructure', value: 23800 },
        { label: 'Operations', value: 18200 },
        { label: 'Marketing', value: 15400 },
        { label: 'Admin', value: 12300 },
      ],
    },
  },
  {
    id: 2,
    businessName: 'Nexa Retail Group',
    legalName: 'Nexa Retail Group Ltd',
    tradeName: 'Nexa Retail',
    taxId: 'TIN-21460097',
    registrationNo: 'RDB-2024-120883',
    industry: 'Retail',
    country: 'Rwanda',
    city: 'Kigali',
    timezone: 'Africa/Kigali',
    subscription: 'Growth',
    billingCycle: 'Monthly',
    nextBillingDate: '2026-05-03',
    status: 'Active',
    ownerId: 1,
    financials: {
      monthlyRevenue: 93200,
      monthlyExpenses: 71800,
      netProfit: 21400,
      cashBalance: 121600,
      receivables: 26500,
      payables: 14200,
      assets: 386200,
      liabilities: 154400,
      equity: 231800,
      overdueInvoices: 2,
      revenueTrend: [
        { label: 'Nov', value: 74500 },
        { label: 'Dec', value: 80100 },
        { label: 'Jan', value: 82500 },
        { label: 'Feb', value: 86700 },
        { label: 'Mar', value: 90100 },
        { label: 'Apr', value: 93200 },
      ],
      expenseBreakdown: [
        { label: 'Inventory', value: 27800 },
        { label: 'Payroll', value: 17600 },
        { label: 'Rent', value: 12400 },
        { label: 'Logistics', value: 8200 },
        { label: 'Admin', value: 5800 },
      ],
    },
  },
  {
    id: 3,
    businessName: 'Kivu Logistics',
    legalName: 'Kivu Logistics Co',
    tradeName: 'Kivu Logistics',
    taxId: 'TIN-55286013',
    registrationNo: 'RDB-2025-882290',
    industry: 'Logistics',
    country: 'Rwanda',
    city: 'Rubavu',
    timezone: 'Africa/Kigali',
    subscription: 'Enterprise',
    billingCycle: 'Monthly',
    nextBillingDate: '2026-05-06',
    status: 'Under Review',
    ownerId: 5,
    financials: {
      monthlyRevenue: 126500,
      monthlyExpenses: 108900,
      netProfit: 17600,
      cashBalance: 84700,
      receivables: 46800,
      payables: 39500,
      assets: 493400,
      liabilities: 272900,
      equity: 220500,
      overdueInvoices: 6,
      revenueTrend: [
        { label: 'Nov', value: 98100 },
        { label: 'Dec', value: 105300 },
        { label: 'Jan', value: 109600 },
        { label: 'Feb', value: 117400 },
        { label: 'Mar', value: 121900 },
        { label: 'Apr', value: 126500 },
      ],
      expenseBreakdown: [
        { label: 'Fleet', value: 40200 },
        { label: 'Payroll', value: 28700 },
        { label: 'Fuel', value: 20100 },
        { label: 'Maintenance', value: 11200 },
        { label: 'Admin', value: 8700 },
      ],
    },
  },
  {
    id: 4,
    businessName: 'BlueStone Manufacturing',
    legalName: 'BlueStone Manufacturing Ltd',
    tradeName: 'BlueStone',
    taxId: 'TIN-73730120',
    registrationNo: 'KRS-2023-019227',
    industry: 'Manufacturing',
    country: 'Kenya',
    city: 'Nairobi',
    timezone: 'Africa/Nairobi',
    subscription: 'Enterprise',
    billingCycle: 'Monthly',
    nextBillingDate: '2026-05-08',
    status: 'Active',
    ownerId: 2,
    financials: {
      monthlyRevenue: 209800,
      monthlyExpenses: 164200,
      netProfit: 45600,
      cashBalance: 174900,
      receivables: 73400,
      payables: 58900,
      assets: 890500,
      liabilities: 401700,
      equity: 488800,
      overdueInvoices: 3,
      revenueTrend: [
        { label: 'Nov', value: 172100 },
        { label: 'Dec', value: 180400 },
        { label: 'Jan', value: 187200 },
        { label: 'Feb', value: 194300 },
        { label: 'Mar', value: 201600 },
        { label: 'Apr', value: 209800 },
      ],
      expenseBreakdown: [
        { label: 'Raw Materials', value: 69200 },
        { label: 'Payroll', value: 38400 },
        { label: 'Utilities', value: 24600 },
        { label: 'Logistics', value: 19800 },
        { label: 'Admin', value: 12200 },
      ],
    },
  },
  {
    id: 5,
    businessName: 'Peak Foods',
    legalName: 'Peak Foods Distributors',
    tradeName: 'Peak Foods',
    taxId: 'TIN-91237001',
    registrationNo: 'UGR-2022-778219',
    industry: 'Food Distribution',
    country: 'Uganda',
    city: 'Kampala',
    timezone: 'Africa/Kampala',
    subscription: 'Starter',
    billingCycle: 'Monthly',
    nextBillingDate: '2026-04-27',
    status: 'Suspended',
    ownerId: 3,
    financials: {
      monthlyRevenue: 41200,
      monthlyExpenses: 49800,
      netProfit: -8600,
      cashBalance: 21400,
      receivables: 15200,
      payables: 29100,
      assets: 139500,
      liabilities: 162200,
      equity: -22700,
      overdueInvoices: 9,
      revenueTrend: [
        { label: 'Nov', value: 59800 },
        { label: 'Dec', value: 57300 },
        { label: 'Jan', value: 53700 },
        { label: 'Feb', value: 49800 },
        { label: 'Mar', value: 45500 },
        { label: 'Apr', value: 41200 },
      ],
      expenseBreakdown: [
        { label: 'Inventory', value: 18400 },
        { label: 'Payroll', value: 13100 },
        { label: 'Transport', value: 9200 },
        { label: 'Warehouse', value: 6100 },
        { label: 'Admin', value: 3000 },
      ],
    },
  },
  {
    id: 6,
    businessName: 'Nova Health Services',
    legalName: 'Nova Health Services Ltd',
    tradeName: 'Nova Health',
    taxId: 'TIN-88932107',
    registrationNo: 'TZR-2024-500118',
    industry: 'Healthcare',
    country: 'Tanzania',
    city: 'Dar es Salaam',
    timezone: 'Africa/Dar_es_Salaam',
    subscription: 'Growth',
    billingCycle: 'Monthly',
    nextBillingDate: '2026-05-04',
    status: 'Active',
    ownerId: 4,
    financials: {
      monthlyRevenue: 102300,
      monthlyExpenses: 75200,
      netProfit: 27100,
      cashBalance: 96400,
      receivables: 28900,
      payables: 19700,
      assets: 341100,
      liabilities: 138600,
      equity: 202500,
      overdueInvoices: 1,
      revenueTrend: [
        { label: 'Nov', value: 86400 },
        { label: 'Dec', value: 89200 },
        { label: 'Jan', value: 93600 },
        { label: 'Feb', value: 95800 },
        { label: 'Mar', value: 99200 },
        { label: 'Apr', value: 102300 },
      ],
      expenseBreakdown: [
        { label: 'Clinical Ops', value: 29700 },
        { label: 'Payroll', value: 25300 },
        { label: 'Equipment', value: 9900 },
        { label: 'Facilities', value: 6700 },
        { label: 'Admin', value: 3600 },
      ],
    },
  },
];

export function getAdminUserById(id: number) {
  return adminUsers.find((user) => user.id === id);
}

export function getAdminBusinessById(id: number) {
  return adminBusinesses.find((business) => business.id === id);
}

export function getBusinessesByOwnerId(ownerId: number) {
  return adminBusinesses.filter((business) => business.ownerId === ownerId);
}
