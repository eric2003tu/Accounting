'use client';

import React from 'react';
import {
  CalendarClock,
  CircleDollarSign,
  HandCoins,
  Landmark,
  Percent,
  ShieldAlert,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import StatCard from '@/app/components/manager/StatCard';
import DataTable from '@/app/components/manager/DataTable';
import SimpleChart from '@/app/components/manager/SimpleChart';
import { adminBusinesses } from '@/app/admin/data/adminDirectoryData';

const managerBusinessId = 1;
const managerBusiness = adminBusinesses.find((business) => business.id === managerBusinessId);
const today = new Date('2026-04-13');

type ViewMode = 'received' | 'offered';

type LoanAccount = {
  id: number;
  businessId: number;
  lender: string;
  facilityType: 'Term Loan' | 'Working Capital' | 'Asset Finance' | 'Overdraft';
  purpose: string;
  status: 'Active' | 'Under Review' | 'Closed';
  covenantStatus: 'Compliant' | 'Watchlist' | 'Breached';
  riskLevel: 'Low' | 'Medium' | 'High';
  originalPrincipal: number;
  outstandingPrincipal: number;
  interestRate: number;
  monthlyInstallment: number;
  startDate: string;
  maturityDate: string;
  nextPaymentDate: string;
  collateral: string;
};

type LoanPayment = {
  id: number;
  businessId: number;
  facilityRef: string;
  lender: string;
  dueDate: string;
  principalComponent: number;
  interestComponent: number;
  totalDue: number;
  paymentStatus: 'Upcoming' | 'Paid' | 'Overdue';
  paidAmount?: number;
  remainingAmount?: number;
  lastPaymentDate?: string;
  paymentMethod?: string;
  reference?: string;
  notes?: string;
};

type OfferedLoanAccount = {
  id: number;
  businessId: number;
  accountRef: string;
  customer: string;
  customerType: 'Retailer' | 'Distributor' | 'Corporate' | 'Individual';
  product: string;
  principalIssued: number;
  amountCollected: number;
  outstandingBalance: number;
  interestRate: number;
  tenorMonths: number;
  issuedDate: string;
  nextDueDate: string;
  status: 'Current' | 'Late' | 'Settled';
  riskLevel: 'Low' | 'Medium' | 'High';
};

type OfferedPayment = {
  id: number;
  businessId: number;
  accountRef: string;
  customer: string;
  dueDate: string;
  principalDue: number;
  interestDue: number;
  totalDue: number;
  collectionStatus: 'Upcoming' | 'Collected' | 'Overdue';
  paidAmount?: number;
  remainingAmount?: number;
  lastPaymentDate?: string;
  paymentMethod?: string;
  reference?: string;
  notes?: string;
};

const loanBookByBusiness: Record<number, LoanAccount[]> = {
  1: [
    { id: 1, businessId: 1, lender: 'BK Capital Bank', facilityType: 'Term Loan', purpose: 'Data center expansion', status: 'Active', covenantStatus: 'Compliant', riskLevel: 'Low', originalPrincipal: 220000, outstandingPrincipal: 164000, interestRate: 11.2, monthlyInstallment: 8200, startDate: '2025-06-01', maturityDate: '2028-05-31', nextPaymentDate: '2026-05-05', collateral: 'Servers and network equipment' },
    { id: 2, businessId: 1, lender: 'Afrex Trade Finance', facilityType: 'Working Capital', purpose: 'Payroll and operating liquidity', status: 'Active', covenantStatus: 'Watchlist', riskLevel: 'Medium', originalPrincipal: 95000, outstandingPrincipal: 72600, interestRate: 13.4, monthlyInstallment: 5400, startDate: '2025-10-15', maturityDate: '2027-10-14', nextPaymentDate: '2026-04-29', collateral: 'Accounts receivable assignment' },
    { id: 3, businessId: 1, lender: 'Kigali Leasing', facilityType: 'Asset Finance', purpose: 'Field operations vehicles', status: 'Active', covenantStatus: 'Compliant', riskLevel: 'Low', originalPrincipal: 68000, outstandingPrincipal: 38800, interestRate: 10.6, monthlyInstallment: 3100, startDate: '2024-12-01', maturityDate: '2027-11-30', nextPaymentDate: '2026-05-08', collateral: 'Fleet lien' },
    { id: 4, businessId: 1, lender: 'I&M Corporate', facilityType: 'Overdraft', purpose: 'Invoice timing bridge', status: 'Under Review', covenantStatus: 'Watchlist', riskLevel: 'Medium', originalPrincipal: 40000, outstandingPrincipal: 24600, interestRate: 14.8, monthlyInstallment: 2400, startDate: '2025-03-01', maturityDate: '2026-12-31', nextPaymentDate: '2026-04-20', collateral: 'General debenture' },
  ],
};

const paymentScheduleByBusiness: Record<number, LoanPayment[]> = {
  1: [
    { id: 1, businessId: 1, facilityRef: 'TL-ACM-01', lender: 'BK Capital Bank', dueDate: '2026-05-05', principalComponent: 4300, interestComponent: 1350, totalDue: 5650, paymentStatus: 'Paid', paidAmount: 5650, remainingAmount: 0 },
    { id: 2, businessId: 1, facilityRef: 'WC-ACM-02', lender: 'Afrex Trade Finance', dueDate: '2026-04-29', principalComponent: 3900, interestComponent: 1180, totalDue: 5080, paymentStatus: 'Upcoming', paidAmount: 2100, remainingAmount: 2980 },
    { id: 3, businessId: 1, facilityRef: 'AF-ACM-03', lender: 'Kigali Leasing', dueDate: '2026-05-08', principalComponent: 2450, interestComponent: 510, totalDue: 2960, paymentStatus: 'Upcoming', paidAmount: 0, remainingAmount: 2960 },
    { id: 4, businessId: 1, facilityRef: 'OD-ACM-04', lender: 'I&M Corporate', dueDate: '2026-04-20', principalComponent: 1400, interestComponent: 610, totalDue: 2010, paymentStatus: 'Overdue', paidAmount: 0, remainingAmount: 2010 },
  ],
};

const principalTrendByBusiness: Record<number, Array<{ label: string; value: number }>> = {
  1: [
    { label: 'Nov', value: 341000 },
    { label: 'Dec', value: 332000 },
    { label: 'Jan', value: 321500 },
    { label: 'Feb', value: 314100 },
    { label: 'Mar', value: 306700 },
    { label: 'Apr', value: 300000 },
  ],
};

const offeredLoanBookByBusiness: Record<number, OfferedLoanAccount[]> = {
  1: [
    { id: 1, businessId: 1, accountRef: 'CR-ACM-001', customer: 'Vertex Retail', customerType: 'Retailer', product: 'POS Equipment Bundle', principalIssued: 28000, amountCollected: 16300, outstandingBalance: 11700, interestRate: 12.5, tenorMonths: 10, issuedDate: '2025-11-05', nextDueDate: '2026-04-22', status: 'Current', riskLevel: 'Low' },
    { id: 2, businessId: 1, accountRef: 'CR-ACM-002', customer: 'Nova Stores', customerType: 'Distributor', product: 'Cloud ERP Annual Plan', principalIssued: 42000, amountCollected: 21400, outstandingBalance: 20600, interestRate: 14.2, tenorMonths: 12, issuedDate: '2025-10-14', nextDueDate: '2026-04-18', status: 'Late', riskLevel: 'High' },
    { id: 3, businessId: 1, accountRef: 'CR-ACM-003', customer: 'Kigali Care Lab', customerType: 'Corporate', product: 'Implementation Project', principalIssued: 36000, amountCollected: 29500, outstandingBalance: 6500, interestRate: 11.8, tenorMonths: 8, issuedDate: '2025-12-02', nextDueDate: '2026-04-30', status: 'Current', riskLevel: 'Medium' },
    { id: 4, businessId: 1, accountRef: 'CR-ACM-004', customer: 'Luma Traders', customerType: 'Individual', product: 'Inventory Scanner Package', principalIssued: 9000, amountCollected: 9000, outstandingBalance: 0, interestRate: 10.0, tenorMonths: 6, issuedDate: '2025-08-01', nextDueDate: '2026-04-10', status: 'Settled', riskLevel: 'Low' },
  ],
};

const offeredPaymentsByBusiness: Record<number, OfferedPayment[]> = {
  1: [
    { id: 1, businessId: 1, accountRef: 'CR-ACM-001', customer: 'Vertex Retail', dueDate: '2026-04-22', principalDue: 2200, interestDue: 320, totalDue: 2520, collectionStatus: 'Upcoming' },
    { id: 2, businessId: 1, accountRef: 'CR-ACM-002', customer: 'Nova Stores', dueDate: '2026-04-18', principalDue: 2800, interestDue: 490, totalDue: 3290, collectionStatus: 'Overdue' },
    { id: 3, businessId: 1, accountRef: 'CR-ACM-003', customer: 'Kigali Care Lab', dueDate: '2026-04-30', principalDue: 1800, interestDue: 210, totalDue: 2010, collectionStatus: 'Upcoming' },
    { id: 4, businessId: 1, accountRef: 'CR-ACM-004', customer: 'Luma Traders', dueDate: '2026-04-10', principalDue: 1500, interestDue: 80, totalDue: 1580, collectionStatus: 'Collected' },
  ],
};

function money(value: number) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function pct(value: number) {
  return `${value.toFixed(1)}%`;
}

function getRemainingDue(payment: { totalDue: number; remainingAmount?: number }) {
  return payment.remainingAmount ?? payment.totalDue;
}

function monthsToMaturity(date: string) {
  const maturity = new Date(date);
  return (maturity.getFullYear() - today.getFullYear()) * 12 + (maturity.getMonth() - today.getMonth());
}

function daysPastDue(date: string) {
  const due = new Date(date);
  const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}

function buildFacilityMix(loans: LoanAccount[]) {
  const totals = new Map<string, number>();
  loans.forEach((loan) => {
    totals.set(loan.facilityType, (totals.get(loan.facilityType) || 0) + loan.outstandingPrincipal);
  });
  return Array.from(totals.entries()).map(([label, value]) => ({ label, value }));
}

function buildMaturityBuckets(loans: LoanAccount[]) {
  const buckets = { '0-12 months': 0, '13-24 months': 0, '25+ months': 0 };
  loans.forEach((loan) => {
    const months = monthsToMaturity(loan.maturityDate);
    if (months <= 12) {
      buckets['0-12 months'] += loan.outstandingPrincipal;
    } else if (months <= 24) {
      buckets['13-24 months'] += loan.outstandingPrincipal;
    } else {
      buckets['25+ months'] += loan.outstandingPrincipal;
    }
  });

  return [
    { label: '0-12 months', value: buckets['0-12 months'] },
    { label: '13-24 months', value: buckets['13-24 months'] },
    { label: '25+ months', value: buckets['25+ months'] },
  ];
}

function buildOfferedProductMix(accounts: OfferedLoanAccount[]) {
  const totals = new Map<string, number>();
  accounts.forEach((account) => {
    totals.set(account.product, (totals.get(account.product) || 0) + account.outstandingBalance);
  });
  return Array.from(totals.entries()).map(([label, value]) => ({ label, value }));
}

function buildOfferedAgingBuckets(accounts: OfferedLoanAccount[]) {
  const buckets = { Current: 0, '1-30 days': 0, '31-60 days': 0, '60+ days': 0 };

  accounts.forEach((account) => {
    if (account.status === 'Settled') {
      return;
    }

    const overdueDays = daysPastDue(account.nextDueDate);
    if (account.status === 'Current' || overdueDays === 0) {
      buckets.Current += account.outstandingBalance;
    } else if (overdueDays <= 30) {
      buckets['1-30 days'] += account.outstandingBalance;
    } else if (overdueDays <= 60) {
      buckets['31-60 days'] += account.outstandingBalance;
    } else {
      buckets['60+ days'] += account.outstandingBalance;
    }
  });

  return [
    { label: 'Current', value: buckets.Current },
    { label: '1-30 days', value: buckets['1-30 days'] },
    { label: '31-60 days', value: buckets['31-60 days'] },
    { label: '60+ days', value: buckets['60+ days'] },
  ];
}

function buildOfferedCollectionTrend(payments: OfferedPayment[]) {
  return payments.map((payment) => ({ label: payment.dueDate.slice(5), value: payment.totalDue }));
}

export default function ManagerLoansPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('received');
  const [receivedPaymentsByBusiness, setReceivedPaymentsByBusiness] = React.useState(paymentScheduleByBusiness);
  const [offeredPaymentsByBusinessState, setOfferedPaymentsByBusinessState] = React.useState(offeredPaymentsByBusiness);
  const [editingKind, setEditingKind] = React.useState<ViewMode | null>(null);
  const [editingPaymentId, setEditingPaymentId] = React.useState<number | null>(null);
  const [paymentUpdateForm, setPaymentUpdateForm] = React.useState({
    amountPaid: '',
    status: '',
    paymentDate: '2026-04-13',
    paymentMethod: 'Bank Transfer',
    reference: '',
    notes: '',
  });

  if (!managerBusiness) {
    return <div className="text-slate-600">No business assigned.</div>;
  }

  const loans = loanBookByBusiness[managerBusiness.id] ?? [];
  const upcomingPayments = receivedPaymentsByBusiness[managerBusiness.id] ?? [];
  const principalTrend = principalTrendByBusiness[managerBusiness.id] ?? [];

  const offeredAccounts = offeredLoanBookByBusiness[managerBusiness.id] ?? [];
  const offeredPayments = offeredPaymentsByBusinessState[managerBusiness.id] ?? [];

  const receivedRows = loans.map((loan) => {
    const schedule = upcomingPayments.find(
      (payment) => payment.lender === loan.lender && payment.dueDate === loan.nextPaymentDate
    );

    const paidAmount = schedule?.paidAmount ?? 0;
    const remainingAmount = schedule?.remainingAmount ?? Math.max((schedule?.totalDue ?? loan.monthlyInstallment) - paidAmount, 0);
    const repaymentStatus = remainingAmount <= 0 ? 'Completed' : paidAmount > 0 ? 'Partially Paid' : 'Not Paid';

    return {
      ...loan,
      paymentId: schedule?.id ?? null,
      facilityRef: schedule?.facilityRef ?? '-',
      dueDate: schedule?.dueDate ?? loan.nextPaymentDate,
      principalComponent: schedule?.principalComponent ?? 0,
      interestComponent: schedule?.interestComponent ?? 0,
      totalDue: schedule?.totalDue ?? loan.monthlyInstallment,
      paidAmount,
      remainingAmount,
      paymentStatus: schedule?.paymentStatus ?? 'Upcoming',
      repaymentStatus,
    };
  });

  const offeredRows = offeredAccounts.map((account) => {
    const schedule = offeredPayments.find(
      (payment) => payment.accountRef === account.accountRef && payment.dueDate === account.nextDueDate
    );

    return {
      ...account,
      paymentId: schedule?.id ?? null,
      dueDate: schedule?.dueDate ?? account.nextDueDate,
      principalDue: schedule?.principalDue ?? 0,
      interestDue: schedule?.interestDue ?? 0,
      totalDue: schedule?.totalDue ?? 0,
      paidAmount: schedule?.paidAmount ?? 0,
      remainingAmount: schedule?.remainingAmount,
      collectionStatus: schedule?.collectionStatus ?? 'Upcoming',
    };
  });

  const totalOriginalPrincipal = loans.reduce((sum, loan) => sum + loan.originalPrincipal, 0);
  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstandingPrincipal, 0);
  const monthlyDebtService = loans.reduce((sum, loan) => sum + loan.monthlyInstallment, 0);
  const weightedInterestRate = totalOutstanding
    ? loans.reduce((sum, loan) => sum + loan.interestRate * loan.outstandingPrincipal, 0) / totalOutstanding
    : 0;
  const utilizationRate = totalOriginalPrincipal ? (totalOutstanding / totalOriginalPrincipal) * 100 : 0;
  const debtToEquity = managerBusiness.financials.equity
    ? managerBusiness.financials.liabilities / managerBusiness.financials.equity
    : 0;
  const debtServiceCoverage = monthlyDebtService
    ? managerBusiness.financials.netProfit / monthlyDebtService
    : 0;
  const nearTermMaturity = buildMaturityBuckets(loans)[0]?.value ?? 0;
  const overduePayments = upcomingPayments.filter((payment) => payment.paymentStatus === 'Overdue').length;

  const totalCreditIssued = offeredAccounts.reduce((sum, account) => sum + account.principalIssued, 0);
  const totalCollected = offeredAccounts.reduce((sum, account) => sum + account.amountCollected, 0);
  const totalOfferedOutstanding = offeredAccounts.reduce((sum, account) => sum + account.outstandingBalance, 0);
  const weightedOfferedRate = totalOfferedOutstanding
    ? offeredAccounts.reduce((sum, account) => sum + account.interestRate * account.outstandingBalance, 0) / totalOfferedOutstanding
    : 0;
  const activeCreditAccounts = offeredAccounts.filter((account) => account.status !== 'Settled').length;
  const overdueCreditAccounts = offeredAccounts.filter((account) => account.status === 'Late').length;
  const par30 = totalOfferedOutstanding
    ? (offeredAccounts
        .filter((account) => account.status === 'Late' && daysPastDue(account.nextDueDate) > 30)
        .reduce((sum, account) => sum + account.outstandingBalance, 0) / totalOfferedOutstanding) * 100
    : 0;
  const next30Collections = offeredPayments
    .filter((payment) => {
      const due = new Date(payment.dueDate);
      const diffDays = Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30;
    })
    .reduce((sum, payment) => sum + getRemainingDue(payment), 0);

  const editingReceivedPayment =
    editingKind === 'received' && editingPaymentId !== null
      ? upcomingPayments.find((payment) => payment.id === editingPaymentId) || null
      : null;

  const editingOfferedPayment =
    editingKind === 'offered' && editingPaymentId !== null
      ? offeredPayments.find((payment) => payment.id === editingPaymentId) || null
      : null;

  const currentEditingPayment = editingKind === 'received' ? editingReceivedPayment : editingOfferedPayment;

  const openPaymentModal = (kind: ViewMode, payment: LoanPayment | OfferedPayment) => {
    const defaultStatus = kind === 'received' ? (payment as LoanPayment).paymentStatus : (payment as OfferedPayment).collectionStatus;

    setEditingKind(kind);
    setEditingPaymentId(payment.id);
    setPaymentUpdateForm({
      amountPaid: String(getRemainingDue(payment)),
      status: defaultStatus,
      paymentDate: '2026-04-13',
      paymentMethod: 'Bank Transfer',
      reference: '',
      notes: '',
    });
  };

  const closePaymentModal = () => {
    setEditingKind(null);
    setEditingPaymentId(null);
    setPaymentUpdateForm({
      amountPaid: '',
      status: '',
      paymentDate: '2026-04-13',
      paymentMethod: 'Bank Transfer',
      reference: '',
      notes: '',
    });
  };

  const submitPaymentUpdate = () => {
    if (!currentEditingPayment || !editingKind) {
      return;
    }

    const amountInput = Number(paymentUpdateForm.amountPaid || 0);
    const safeAmount = Number.isFinite(amountInput) ? Math.max(amountInput, 0) : 0;

    if (editingKind === 'received') {
      setReceivedPaymentsByBusiness((current) => ({
        ...current,
        [managerBusiness.id]: (current[managerBusiness.id] || []).map((payment) => {
          if (payment.id !== currentEditingPayment.id) {
            return payment;
          }

          const existingPaid = payment.paidAmount || 0;
          const remainingBefore = getRemainingDue(payment);
          const paidNow = Math.min(safeAmount, remainingBefore);
          const updatedPaid = existingPaid + paidNow;
          const updatedRemaining = Math.max(payment.totalDue - updatedPaid, 0);

          return {
            ...payment,
            paidAmount: updatedPaid,
            remainingAmount: updatedRemaining,
            paymentStatus: paymentUpdateForm.status as LoanPayment['paymentStatus'],
            lastPaymentDate: paymentUpdateForm.paymentDate,
            paymentMethod: paymentUpdateForm.paymentMethod,
            reference: paymentUpdateForm.reference,
            notes: paymentUpdateForm.notes,
          };
        }),
      }));
    } else {
      setOfferedPaymentsByBusinessState((current) => ({
        ...current,
        [managerBusiness.id]: (current[managerBusiness.id] || []).map((payment) => {
          if (payment.id !== currentEditingPayment.id) {
            return payment;
          }

          const existingPaid = payment.paidAmount || 0;
          const remainingBefore = getRemainingDue(payment);
          const paidNow = Math.min(safeAmount, remainingBefore);
          const updatedPaid = existingPaid + paidNow;
          const updatedRemaining = Math.max(payment.totalDue - updatedPaid, 0);

          return {
            ...payment,
            paidAmount: updatedPaid,
            remainingAmount: updatedRemaining,
            collectionStatus: paymentUpdateForm.status as OfferedPayment['collectionStatus'],
            lastPaymentDate: paymentUpdateForm.paymentDate,
            paymentMethod: paymentUpdateForm.paymentMethod,
            reference: paymentUpdateForm.reference,
            notes: paymentUpdateForm.notes,
          };
        }),
      }));
    }

    closePaymentModal();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
              Single business scope
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Loans Center</h1>
            <p className="mt-1 text-sm text-slate-600">Switch between debt received and customer loans offered.</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Assigned business</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{managerBusiness.businessName}</p>
            <p className="text-xs text-slate-600">{managerBusiness.legalName}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setViewMode('received')}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              viewMode === 'received'
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-green-200 hover:bg-green-50/60'
            }`}
          >
            <Landmark className="h-4 w-4" />
            Loans Received
          </button>
          <button
            type="button"
            onClick={() => setViewMode('offered')}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              viewMode === 'offered'
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-green-200 hover:bg-green-50/60'
            }`}
          >
            <HandCoins className="h-4 w-4" />
            Loans Offered
          </button>
        </div>
      </section>

      {viewMode === 'received' ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Outstanding Debt" value={money(totalOutstanding)} description="Current principal exposure" icon={CircleDollarSign} />
            <StatCard title="Monthly Debt Service" value={money(monthlyDebtService)} description="Principal + interest due monthly" icon={CalendarClock} />
            <StatCard title="Weighted Interest" value={pct(weightedInterestRate)} description="Portfolio blended borrowing cost" icon={Percent} />
            <StatCard title="Debt Service Coverage" value={`${debtServiceCoverage.toFixed(2)}x`} description="Net profit / monthly debt service" icon={Wallet} trend={{ value: 6.2, isPositive: debtServiceCoverage >= 1.2 }} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Debt to Equity" value={`${debtToEquity.toFixed(2)}x`} description="Liabilities relative to equity" icon={TrendingUp} trend={{ value: 4.3, isPositive: debtToEquity <= 1.6 }} />
            <StatCard title="Facility Utilization" value={pct(utilizationRate)} description="Outstanding vs approved principal" icon={Landmark} />
            <StatCard title="Maturing in 12m" value={money(nearTermMaturity)} description="Refinancing pressure window" icon={CalendarClock} />
            <StatCard title="Overdue Installments" value={overduePayments} description="Immediate payment attention needed" icon={ShieldAlert} trend={{ value: overduePayments, isPositive: overduePayments === 0 }} />
          </div>

          {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SimpleChart title="Debt Mix by Facility" description="Outstanding principal by loan type" data={buildFacilityMix(loans)} type="pie" className="lg:col-span-1" />
            <SimpleChart title="Maturity Ladder" description="Outstanding principal by maturity bucket" data={buildMaturityBuckets(loans)} type="bar" className="lg:col-span-1" />
            <SimpleChart title="Principal Trend" description="Six-month outstanding principal movement" data={principalTrend} type="line" className="lg:col-span-1" />
          </div> */}

          <DataTable
            title={`Loans Received - ${managerBusiness.businessName}`}
            description="Consolidated facility terms and repayment schedule in one table"
            data={receivedRows}
            fileName={`manager-loan-book-${managerBusiness.id}`}
            columns={[
              { key: 'facilityRef', label: 'Facility Ref', render: (value) => <span className="font-mono text-xs">{value}</span> },
              { key: 'lender', label: 'Lender' },
              { key: 'facilityType', label: 'Facility', render: (value) => <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{value}</span> },
              { key: 'purpose', label: 'Purpose' },
              { key: 'outstandingPrincipal', label: 'Outstanding', align: 'right', render: (value) => <span className="font-semibold text-slate-900">{money(value)}</span> },
              { key: 'interestRate', label: 'Rate', align: 'right', render: (value) => `${value.toFixed(1)}%` },
              { key: 'monthlyInstallment', label: 'Monthly Due', align: 'right', render: (value) => <span className="font-medium text-slate-900">{money(value)}</span> },
              { key: 'dueDate', label: 'Due Date' },
              { key: 'principalComponent', label: 'Principal Due', align: 'right', render: (value) => money(value) },
              { key: 'interestComponent', label: 'Interest Due', align: 'right', render: (value) => money(value) },
              { key: 'totalDue', label: 'Total Due', align: 'right', render: (value) => <span className="font-semibold text-slate-900">{money(value)}</span> },
              { key: 'paidAmount', label: 'Paid', align: 'right', render: (value) => money(value || 0) },
              { key: 'remainingAmount', label: 'Remaining', align: 'right', render: (_, row) => <span className="font-semibold text-slate-900">{money(getRemainingDue(row))}</span> },
              {
                key: 'repaymentStatus',
                label: 'Repayment',
                render: (value) => (
                  <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${value === 'Completed' ? 'bg-emerald-100 text-emerald-700' : value === 'Partially Paid' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                    {value}
                  </span>
                ),
              },
              { key: 'maturityDate', label: 'Maturity' },
              {
                key: 'covenantStatus',
                label: 'Covenant',
                render: (value) => (
                  <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${value === 'Compliant' ? 'bg-green-100 text-green-700' : value === 'Watchlist' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {value}
                  </span>
                ),
              },
              {
                key: 'riskLevel',
                label: 'Risk',
                render: (value) => (
                  <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${value === 'Low' ? 'bg-emerald-100 text-emerald-700' : value === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {value}
                  </span>
                ),
              },
              {
                key: 'paymentId',
                label: 'Actions',
                render: (value, row) => (
                  (() => {
                    const isCompleted = row.repaymentStatus === 'Completed';
                    const isDisabled = !value || isCompleted;

                    return (
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => {
                          const payment = upcomingPayments.find((item) => item.id === row.paymentId);
                          if (payment) {
                            openPaymentModal('received', payment);
                          }
                        }}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isCompleted ? 'Completed' : 'Update Payment'}
                      </button>
                    );
                  })()
                ),
              },
            ]}
            filters={[
              { key: 'facilityType', label: 'Facility', options: [{ label: 'Term Loan', value: 'Term Loan' }, { label: 'Working Capital', value: 'Working Capital' }, { label: 'Asset Finance', value: 'Asset Finance' }, { label: 'Overdraft', value: 'Overdraft' }] },
              { key: 'covenantStatus', label: 'Covenant', options: [{ label: 'Compliant', value: 'Compliant' }, { label: 'Watchlist', value: 'Watchlist' }, { label: 'Breached', value: 'Breached' }] },
              { key: 'riskLevel', label: 'Risk', options: [{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }] },
              { key: 'repaymentStatus', label: 'Repayment', options: [{ label: 'Completed', value: 'Completed' }, { label: 'Partially Paid', value: 'Partially Paid' }, { label: 'Not Paid', value: 'Not Paid' }] },
            ]}
            searchPlaceholder="Search lender, facility, repayment status, or terms..."
            itemsPerPage={8}
          />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Credit Issued" value={money(totalCreditIssued)} description="Total product value sold on credit" icon={HandCoins} />
            <StatCard title="Outstanding from Customers" value={money(totalOfferedOutstanding)} description="Open receivable loan balance" icon={CircleDollarSign} />
            <StatCard title="Collected So Far" value={money(totalCollected)} description="Cash recovered from offered loans" icon={Wallet} />
            <StatCard title="Weighted Credit Rate" value={pct(weightedOfferedRate)} description="Blended return rate on active credit" icon={Percent} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Active Credit Accounts" value={activeCreditAccounts} description="Customer accounts currently running" icon={Users} />
            <StatCard title="Overdue Credit Accounts" value={overdueCreditAccounts} description="Accounts with delayed installments" icon={ShieldAlert} trend={{ value: overdueCreditAccounts, isPositive: overdueCreditAccounts === 0 }} />
            <StatCard title="PAR 30" value={pct(par30)} description="Portfolio at risk over 30 days" icon={TrendingUp} trend={{ value: 2.9, isPositive: par30 < 10 }} />
            <StatCard title="Next 30-Day Collections" value={money(next30Collections)} description="Expected collections in coming 30 days" icon={CalendarClock} />
          </div>

          {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SimpleChart title="Offered Credit by Product" description="Outstanding customer balances by product" data={buildOfferedProductMix(offeredAccounts)} type="pie" className="lg:col-span-1" />
            <SimpleChart title="Receivables Aging" description="Outstanding balances by delinquency bucket" data={buildOfferedAgingBuckets(offeredAccounts)} type="bar" className="lg:col-span-1" />
            <SimpleChart title="Collection Pipeline" description="Upcoming scheduled collection amounts" data={buildOfferedCollectionTrend(offeredPayments)} type="line" className="lg:col-span-1" />
          </div> */}

          <DataTable
            title={`Loans Offered - ${managerBusiness.businessName}`}
            description="Consolidated customer credit accounts and collection schedule in one table"
            data={offeredRows}
            fileName={`manager-offered-loans-${managerBusiness.id}`}
            columns={[
              { key: 'accountRef', label: 'Account Ref', render: (value) => <span className="font-mono text-xs">{value}</span> },
              { key: 'customer', label: 'Customer' },
              { key: 'customerType', label: 'Type', render: (value) => <span className="inline-block rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{value}</span> },
              { key: 'product', label: 'Product' },
              { key: 'principalIssued', label: 'Issued', align: 'right', render: (value) => money(value) },
              { key: 'amountCollected', label: 'Collected', align: 'right', render: (value) => <span className="font-medium text-emerald-700">{money(value)}</span> },
              { key: 'outstandingBalance', label: 'Outstanding', align: 'right', render: (value) => <span className="font-semibold text-slate-900">{money(value)}</span> },
              { key: 'interestRate', label: 'Rate', align: 'right', render: (value) => `${value.toFixed(1)}%` },
              { key: 'dueDate', label: 'Due Date' },
              { key: 'principalDue', label: 'Principal Due', align: 'right', render: (value) => money(value) },
              { key: 'interestDue', label: 'Interest Due', align: 'right', render: (value) => money(value) },
              { key: 'totalDue', label: 'Total Due', align: 'right', render: (value) => <span className="font-semibold text-slate-900">{money(value)}</span> },
              { key: 'paidAmount', label: 'Paid', align: 'right', render: (value) => money(value || 0) },
              { key: 'remainingAmount', label: 'Remaining', align: 'right', render: (_, row) => <span className="font-semibold text-slate-900">{money(getRemainingDue(row))}</span> },
              {
                key: 'collectionStatus',
                label: 'Collection',
                render: (value) => (
                  <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${value === 'Collected' ? 'bg-emerald-100 text-emerald-700' : value === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {value}
                  </span>
                ),
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${value === 'Current' ? 'bg-green-100 text-green-700' : value === 'Late' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                    {value}
                  </span>
                ),
              },
              {
                key: 'riskLevel',
                label: 'Risk',
                render: (value) => (
                  <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${value === 'Low' ? 'bg-emerald-100 text-emerald-700' : value === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {value}
                  </span>
                ),
              },
              {
                key: 'paymentId',
                label: 'Actions',
                render: (value, row) => (
                  <button
                    type="button"
                    disabled={!value}
                    onClick={() => {
                      const payment = offeredPayments.find((item) => item.id === row.paymentId);
                      if (payment) {
                        openPaymentModal('offered', payment);
                      }
                    }}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Update Payment
                  </button>
                ),
              },
            ]}
            filters={[
              { key: 'status', label: 'Status', options: [{ label: 'Current', value: 'Current' }, { label: 'Late', value: 'Late' }, { label: 'Settled', value: 'Settled' }] },
              { key: 'customerType', label: 'Customer Type', options: [{ label: 'Retailer', value: 'Retailer' }, { label: 'Distributor', value: 'Distributor' }, { label: 'Corporate', value: 'Corporate' }, { label: 'Individual', value: 'Individual' }] },
              { key: 'riskLevel', label: 'Risk', options: [{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }] },
              { key: 'collectionStatus', label: 'Collection Status', options: [{ label: 'Upcoming', value: 'Upcoming' }, { label: 'Collected', value: 'Collected' }, { label: 'Overdue', value: 'Overdue' }] },
            ]}
            searchPlaceholder="Search customer, account ref, status, or product..."
            itemsPerPage={8}
          />
        </>
      )}

      {currentEditingPayment && editingKind && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-[0_20px_48px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Update Loan Payment</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {editingKind === 'received' ? 'Debt service update' : 'Customer collection update'} · Ref{' '}
                  {'facilityRef' in currentEditingPayment ? currentEditingPayment.facilityRef : currentEditingPayment.accountRef}
                </p>
              </div>
              <button
                type="button"
                onClick={closePaymentModal}
                className="rounded-md px-2 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Total Due</p>
                <p className="mt-1 font-semibold text-slate-900">{money(currentEditingPayment.totalDue)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Remaining Before Update</p>
                <p className="mt-1 font-semibold text-slate-900">{money(getRemainingDue(currentEditingPayment))}</p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Amount Paid</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paymentUpdateForm.amountPaid}
                  onChange={(event) => setPaymentUpdateForm((prev) => ({ ...prev, amountPaid: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Updated Status</label>
                <select
                  value={paymentUpdateForm.status}
                  onChange={(event) => setPaymentUpdateForm((prev) => ({ ...prev, status: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                >
                  {(editingKind === 'received' ? ['Upcoming', 'Paid', 'Overdue'] : ['Upcoming', 'Collected', 'Overdue']).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Payment Date</label>
                <input
                  type="date"
                  value={paymentUpdateForm.paymentDate}
                  onChange={(event) => setPaymentUpdateForm((prev) => ({ ...prev, paymentDate: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Payment Method</label>
                <select
                  value={paymentUpdateForm.paymentMethod}
                  onChange={(event) => setPaymentUpdateForm((prev) => ({ ...prev, paymentMethod: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Reference</label>
                <input
                  type="text"
                  value={paymentUpdateForm.reference}
                  onChange={(event) => setPaymentUpdateForm((prev) => ({ ...prev, reference: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Txn or receipt reference"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Remaining After Update</label>
                <div className="mt-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                  {money(
                    Math.max(
                      getRemainingDue(currentEditingPayment) -
                        Math.min(Number(paymentUpdateForm.amountPaid || 0), getRemainingDue(currentEditingPayment)),
                      0
                    )
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Notes</label>
                <textarea
                  value={paymentUpdateForm.notes}
                  onChange={(event) => setPaymentUpdateForm((prev) => ({ ...prev, notes: event.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Record partial-payment details, reason for status change, or reconciliation note"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={closePaymentModal}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitPaymentUpdate}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Save Payment Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
