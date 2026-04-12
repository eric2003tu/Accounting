import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarClock,
  CircleDollarSign,
  CreditCard,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import SimpleChart from '@/app/components/dashboard/SimpleChart';

type FinancialSnapshot = {
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

type BusinessOwnerDetail = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Owner';
  userStatus: 'Active' | 'Invited' | 'Suspended';
  mfa: 'Enabled' | 'Pending' | 'Disabled';
  lastLogin: string;
  joinedAt: string;
  business: {
    legalName: string;
    tradeName: string;
    taxId: string;
    registrationNo: string;
    industry: string;
    country: string;
    city: string;
    timezone: string;
    subscription: string;
    billingCycle: string;
    nextBillingDate: string;
  };
  financials: FinancialSnapshot;
};

const owners: BusinessOwnerDetail[] = [
  {
    id: 5,
    name: 'Eric Tuyishime',
    email: 'eric@acme.com',
    phone: '+250 788 332 741',
    role: 'Owner',
    userStatus: 'Active',
    mfa: 'Enabled',
    lastLogin: '2026-04-10 08:20',
    joinedAt: '2025-02-10',
    business: {
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
    },
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
    id: 1,
    name: 'Aline Niyonsaba',
    email: 'aline@acme.com',
    phone: '+250 722 190 344',
    role: 'Owner',
    userStatus: 'Active',
    mfa: 'Enabled',
    lastLogin: '2026-04-10 08:10',
    joinedAt: '2024-11-04',
    business: {
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
    },
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
];

function money(value: number) {
  return `$${value.toLocaleString()}`;
}

function ratio(numerator: number, denominator: number) {
  if (!denominator) {
    return '0.0%';
  }

  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default async function AdminBusinessOwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ownerId = Number(id);
  const owner = owners.find((item) => item.id === ownerId);

  if (!owner) {
    notFound();
  }

  const profitMargin = ratio(owner.financials.netProfit, owner.financials.monthlyRevenue);
  const currentRatio = ratio(owner.financials.assets, owner.financials.liabilities);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] lg:p-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Business Owner Profile</h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Unified view of the owner account, business profile, and current financial position.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Admin snapshot
            </div>
            <p className="mt-1 text-emerald-800">
              Status: {owner.userStatus} · MFA: {owner.mfa} · Last login: {owner.lastLogin}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Owner details</h2>
                <p className="text-sm text-slate-500">Identity and account-level controls.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow label="Full name" value={owner.name} />
              <InfoRow label="Role" value={owner.role} />
              <InfoRow label="Email" value={owner.email} />
              <InfoRow label="Phone" value={owner.phone} />
              <InfoRow label="User status" value={owner.userStatus} />
              <InfoRow label="Joined" value={owner.joinedAt} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Business details</h2>
                <p className="text-sm text-slate-500">Registration, subscription, and operational footprint.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow label="Legal name" value={owner.business.legalName} />
              <InfoRow label="Trade name" value={owner.business.tradeName} />
              <InfoRow label="Tax ID" value={owner.business.taxId} />
              <InfoRow label="Registration no." value={owner.business.registrationNo} />
              <InfoRow label="Industry" value={owner.business.industry} />
              <InfoRow label="Country" value={owner.business.country} />
              <InfoRow label="City" value={owner.business.city} />
              <InfoRow label="Timezone" value={owner.business.timezone} />
              <InfoRow label="Plan" value={owner.business.subscription} />
              <InfoRow label="Billing cycle" value={owner.business.billingCycle} />
              <InfoRow label="Next billing" value={owner.business.nextBillingDate} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h3 className="text-base font-semibold text-slate-900">Contact quick actions</h3>
            <div className="mt-4 space-y-3">
              <a
                href={`mailto:${owner.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" />
                Email owner
              </a>
              <a
                href={`tel:${owner.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                Call owner
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h3 className="text-base font-semibold text-slate-900">Finance health summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Cash balance</dt>
                <dd className="font-semibold text-slate-900">{money(owner.financials.cashBalance)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Receivables</dt>
                <dd className="font-semibold text-slate-900">{money(owner.financials.receivables)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Payables</dt>
                <dd className="font-semibold text-slate-900">{money(owner.financials.payables)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Current ratio</dt>
                <dd className="font-semibold text-slate-900">{currentRatio}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Profit margin</dt>
                <dd className="font-semibold text-slate-900">{profitMargin}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Overdue invoices</dt>
                <dd className="font-semibold text-amber-700">{owner.financials.overdueInvoices}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-100/70 blur-2xl" />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Monthly Revenue</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">{money(owner.financials.monthlyRevenue)}</p>
              <p className="mt-2 text-sm text-slate-600">Current month gross revenue</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-3 text-green-700 shadow-sm">
              <CircleDollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-100/70 blur-2xl" />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Monthly Expenses</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">{money(owner.financials.monthlyExpenses)}</p>
              <p className="mt-2 text-sm text-slate-600">Current month operating costs</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-3 text-green-700 shadow-sm">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-100/70 blur-2xl" />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Net Profit</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">{money(owner.financials.netProfit)}</p>
              <p className="mt-2 text-sm text-slate-600">Margin {profitMargin}</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-3 text-green-700 shadow-sm">
              <BadgeCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-100/70 blur-2xl" />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Balance Position</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">{money(owner.financials.equity)}</p>
              <p className="mt-2 text-sm text-slate-600">Assets {money(owner.financials.assets)} · Liabilities {money(owner.financials.liabilities)}</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-3 text-green-700 shadow-sm">
              <Scale className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SimpleChart
          title="Revenue Trend"
          description="Last 6 months performance"
          data={owner.financials.revenueTrend}
          type="line"
        />
        <SimpleChart
          title="Expense Allocation"
          description="Monthly spend by major category"
          data={owner.financials.expenseBreakdown}
          type="pie"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-slate-900">
          <CalendarClock className="h-5 w-5 text-green-700" />
          <h2 className="text-lg font-semibold">Business finance statement snapshot</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Assets</h3>
            <p className="mt-2 text-2xl font-bold text-slate-900">{money(owner.financials.assets)}</p>
            <p className="mt-1 text-sm text-slate-500">Cash + receivables + operating assets</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Liabilities</h3>
            <p className="mt-2 text-2xl font-bold text-slate-900">{money(owner.financials.liabilities)}</p>
            <p className="mt-1 text-sm text-slate-500">Payables + debt obligations</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Equity</h3>
            <p className="mt-2 text-2xl font-bold text-slate-900">{money(owner.financials.equity)}</p>
            <p className="mt-1 text-sm text-slate-500">Net position after liabilities</p>
          </div>
        </div>
      </section>
    </div>
  );
}
