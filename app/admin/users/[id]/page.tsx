import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import SimpleChart from '@/app/components/dashboard/SimpleChart';
import {
  getAdminUserById,
  getBusinessesByOwnerId,
} from '@/app/admin/data/adminDirectoryData';

function money(value: number) {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString()}`;
}

function ratio(numerator: number, denominator: number) {
  if (!denominator) {
    return '0.0%';
  }

  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function UserInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 last:border-b-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900 sm:text-right">{value}</span>
    </div>
  );
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  const user = getAdminUserById(userId);

  if (!user) {
    notFound();
  }

  const ownedBusinesses = getBusinessesByOwnerId(user.id);

  const totalRevenue = ownedBusinesses.reduce(
    (sum, business) => sum + business.financials.monthlyRevenue,
    0
  );
  const totalNetProfit = ownedBusinesses.reduce(
    (sum, business) => sum + business.financials.netProfit,
    0
  );
  const atRiskBusinesses = ownedBusinesses.filter(
    (business) =>
      business.status !== 'Active' ||
      business.financials.netProfit < 0 ||
      business.financials.overdueInvoices >= 5
  ).length;
  const blendedMargin = ratio(totalNetProfit, totalRevenue);

  const revenueByBusiness = ownedBusinesses.map((business) => ({
    label: business.businessName,
    value: business.financials.monthlyRevenue,
  }));

  const equityByBusiness = ownedBusinesses.map((business) => ({
    label: business.businessName,
    value: Math.max(0, business.financials.equity),
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
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
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">User Profile</h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Account details, security posture, and all businesses owned by this user.
              </p>
            </div>
          </div>

          <div className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 lg:w-auto lg:max-w-md">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Access snapshot
            </div>
            <p className="mt-1 break-words text-emerald-800">
              Role: {user.role} · Status: {user.status} · MFA: {user.mfa}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <div className="space-y-4 sm:space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-700">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">User details</h2>
                <p className="text-sm text-slate-500">Identity, access, and audit fields.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
              <UserInfoRow label="Full name" value={user.name} />
              <UserInfoRow label="Role" value={user.role} />
              <UserInfoRow label="Email" value={user.email} />
              <UserInfoRow label="Phone" value={user.phone} />
              <UserInfoRow label="Department" value={user.department} />
              <UserInfoRow label="Status" value={user.status} />
              <UserInfoRow label="MFA" value={user.mfa} />
              <UserInfoRow label="Last login" value={user.lastLogin} />
              <UserInfoRow label="Joined" value={user.joinedAt} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Businesses owned</h2>
                <p className="text-sm text-slate-500">All organizations where this user is listed as owner.</p>
              </div>
            </div>

            {ownedBusinesses.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                This user does not currently own any registered business.
              </div>
            ) : (
              <div className="space-y-3">
                {ownedBusinesses.map((business) => (
                  <div
                    key={business.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Link
                          href={`/admin/businesses/${business.id}`}
                          className="text-base font-semibold text-slate-900 transition-colors hover:text-green-700"
                        >
                          {business.businessName}
                        </Link>
                        <p className="mt-1 text-sm text-slate-600">
                          {business.country} · {business.industry} · {business.subscription}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${
                          business.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : business.status === 'Under Review'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {business.status}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-slate-500">Revenue</p>
                        <p className="font-semibold text-slate-900">{money(business.financials.monthlyRevenue)}</p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-slate-500">Net Profit</p>
                        <p className={`font-semibold ${business.financials.netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                          {money(business.financials.netProfit)}
                        </p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-slate-500">Equity</p>
                        <p className={`font-semibold ${business.financials.equity >= 0 ? 'text-slate-900' : 'text-red-700'}`}>
                          {money(business.financials.equity)}
                        </p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-slate-500">Overdue</p>
                        <p className={`font-semibold ${business.financials.overdueInvoices >= 5 ? 'text-red-700' : 'text-slate-900'}`}>
                          {business.financials.overdueInvoices}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4 sm:space-y-6 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <h3 className="text-base font-semibold text-slate-900">Quick actions</h3>
            <div className="mt-4 space-y-3">
              <a
                href={`mailto:${user.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" />
                Email user
              </a>
              <a
                href={`tel:${user.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                Call user
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <h3 className="text-base font-semibold text-slate-900">Ownership summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Businesses owned</dt>
                <dd className="font-semibold text-slate-900">{ownedBusinesses.length}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Combined revenue</dt>
                <dd className="font-semibold text-slate-900">{money(totalRevenue)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Combined net profit</dt>
                <dd className={`font-semibold ${totalNetProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                  {money(totalNetProfit)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Blended margin</dt>
                <dd className="font-semibold text-slate-900">{blendedMargin}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">At-risk businesses</dt>
                <dd className={`font-semibold ${atRiskBusinesses > 0 ? 'text-amber-700' : 'text-slate-900'}`}>
                  {atRiskBusinesses}
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </section>

      {ownedBusinesses.length > 0 && (
        <>
          <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
            <SimpleChart
              title="Revenue by Business"
              description="Current month revenue distribution"
              data={revenueByBusiness}
              type="bar"
            />
            <SimpleChart
              title="Equity Distribution"
              description="Positive equity by owned business"
              data={equityByBusiness}
              type="pie"
            />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
            <div className="mb-4 flex items-center gap-2 text-slate-900">
              <CalendarClock className="h-5 w-5 text-green-700" />
              <h2 className="text-lg font-semibold">Owner portfolio notes</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Risk concentration</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">{atRiskBusinesses}</p>
                <p className="mt-1 text-sm text-slate-500">Businesses requiring financial or compliance attention.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Largest monthly revenue</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {money(Math.max(...ownedBusinesses.map((business) => business.financials.monthlyRevenue)))}
                </p>
                <p className="mt-1 text-sm text-slate-500">Top performing business under this user.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Largest overdue burden</h3>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {Math.max(...ownedBusinesses.map((business) => business.financials.overdueInvoices))}
                </p>
                <p className="mt-1 text-sm text-slate-500">Peak overdue invoice count across owned businesses.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {ownedBusinesses.length === 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">No owned businesses found</h2>
          <p className="mt-1 text-sm text-slate-600">
            This user can still access the system according to role permissions but has no ownership-linked businesses yet.
          </p>
        </section>
      )}
    </div>
  );
}
