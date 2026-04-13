'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  BookText,
  CalendarClock,
  Download,
  FileText,
  Printer,
  Scale,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import ReportSummaryStats from './ReportSummaryStats';
import { type ReportDefinition } from '@/app/dashboard/reports/reportData';

type MonetaryLine = {
  label: string;
  amount: string;
  note?: string;
};

type BalanceSheetTemplate = {
  currentAssets: MonetaryLine[];
  fixedAssets: MonetaryLine[];
  currentLiabilities: MonetaryLine[];
  longTermLiabilities: MonetaryLine[];
  capital: MonetaryLine[];
  totals: {
    currentAssets: string;
    fixedAssets: string;
    totalAssets: string;
    currentLiabilities: string;
    longTermLiabilities: string;
    totalLiabilities: string;
    capital: string;
    retainedEarnings: string;
    totalEquity: string;
    liabilitiesAndEquity: string;
    balanceCheck: string;
  };
};

type IncomeStatementTemplate = {
  revenue: MonetaryLine[];
  costOfSales: MonetaryLine[];
  operatingExpenses: MonetaryLine[];
  totals: {
    revenue: string;
    costOfSales: string;
    grossProfit: string;
    operatingExpenses: string;
    netProfit: string;
  };
};

type JournalLine = {
  account: string;
  debit?: string;
  credit?: string;
};

type JournalEntry = {
  date: string;
  reference: string;
  narration: string;
  lines: JournalLine[];
};

type JournalTemplate = {
  entries: JournalEntry[];
  totals: {
    debit: string;
    credit: string;
    balance: string;
  };
};

type CashBookLine = {
  date: string;
  reference: string;
  particulars: string;
  amount: string;
  balance: string;
};

type CashBookTemplate = {
  openingBalance: string;
  receipts: CashBookLine[];
  payments: CashBookLine[];
  totals: {
    receipts: string;
    payments: string;
    closing: string;
  };
};

type TrialBalanceLine = {
  account: string;
  debit?: string;
  credit?: string;
  note?: string;
};

type TrialBalanceTemplate = {
  accounts: TrialBalanceLine[];
  totals: {
    debit: string;
    credit: string;
    difference: string;
  };
};

type ReportTemplate =
  | { kind: 'Balance Sheet'; data: BalanceSheetTemplate }
  | { kind: 'Income Statement'; data: IncomeStatementTemplate }
  | { kind: 'Journal'; data: JournalTemplate }
  | { kind: 'Cash Book'; data: CashBookTemplate }
  | { kind: 'Trial Balance'; data: TrialBalanceTemplate };

type ReportDetailViewProps = {
  report: ReportDefinition;
  businessName: string;
};

type CsvTable = {
  fileName: string;
  headers: string[];
  rows: string[][];
};

const iconMap: Record<string, LucideIcon> = {
  'Balance Sheet': Scale,
  'Income Statement': BadgeCheck,
  Journal: BookText,
  'Cash Book': Wallet,
  'Trial Balance': CalendarClock,
};

const reportTemplates: Record<number, ReportTemplate> = {
  1: {
    kind: 'Balance Sheet',
    data: {
      currentAssets: [
        { label: 'Cash and bank balances', amount: '$42,000' },
        { label: 'Accounts receivable', amount: '$31,500' },
        { label: 'Inventory', amount: '$18,000' },
      ],
      fixedAssets: [
        { label: 'Plant and equipment', amount: '$68,500' },
        { label: 'Furniture and fittings', amount: '$24,000' },
      ],
      currentLiabilities: [
        { label: 'Accounts payable', amount: '$17,500' },
        { label: 'Accrued expenses', amount: '$4,000' },
      ],
      longTermLiabilities: [{ label: 'Bank term loan', amount: '$51,000' }],
      capital: [
        { label: 'Owner capital', amount: '$120,000' },
        { label: 'Retained earnings', amount: '$-8,500' },
      ],
      totals: {
        currentAssets: '$91,500',
        fixedAssets: '$92,500',
        totalAssets: '$184,000',
        currentLiabilities: '$21,500',
        longTermLiabilities: '$51,000',
        totalLiabilities: '$72,500',
        capital: '$120,000',
        retainedEarnings: '$-8,500',
        totalEquity: '$111,500',
        liabilitiesAndEquity: '$184,000',
        balanceCheck: 'Balanced',
      },
    },
  },
  6: {
    kind: 'Balance Sheet',
    data: {
      currentAssets: [
        { label: 'Cash and bank balances', amount: '$52,000' },
        { label: 'Accounts receivable', amount: '$34,500' },
        { label: 'Inventory', amount: '$21,000' },
      ],
      fixedAssets: [
        { label: 'Plant and equipment', amount: '$77,500' },
        { label: 'Furniture and fittings', amount: '$25,000' },
      ],
      currentLiabilities: [
        { label: 'Accounts payable', amount: '$21,000' },
        { label: 'Accrued expenses', amount: '$5,250' },
      ],
      longTermLiabilities: [{ label: 'Bank term loan', amount: '$54,750' }],
      capital: [
        { label: 'Owner capital', amount: '$130,000' },
        { label: 'Retained earnings', amount: '$-1,000' },
      ],
      totals: {
        currentAssets: '$107,500',
        fixedAssets: '$102,500',
        totalAssets: '$210,000',
        currentLiabilities: '$26,250',
        longTermLiabilities: '$54,750',
        totalLiabilities: '$81,000',
        capital: '$130,000',
        retainedEarnings: '$-1,000',
        totalEquity: '$129,000',
        liabilitiesAndEquity: '$210,000',
        balanceCheck: 'Balanced',
      },
    },
  },
  2: {
    kind: 'Income Statement',
    data: {
      revenue: [
        { label: 'Sales revenue', amount: '$88,000' },
        { label: 'Service income', amount: '$40,450' },
      ],
      costOfSales: [
        { label: 'Cost of goods sold', amount: '$21,000' },
        { label: 'Direct labour', amount: '$11,500' },
      ],
      operatingExpenses: [
        { label: 'Salaries and wages', amount: '$18,000' },
        { label: 'Rent expense', amount: '$8,000' },
        { label: 'Utilities', amount: '$3,500' },
        { label: 'Marketing', amount: '$4,320' },
        { label: 'Administrative expenses', amount: '$6,000' },
      ],
      totals: {
        revenue: '$128,450',
        costOfSales: '$32,500',
        grossProfit: '$95,950',
        operatingExpenses: '$39,820',
        netProfit: '$56,130',
      },
    },
  },
  7: {
    kind: 'Income Statement',
    data: {
      revenue: [
        { label: 'Sales revenue', amount: '$101,000' },
        { label: 'Service income', amount: '$45,220' },
      ],
      costOfSales: [
        { label: 'Cost of goods sold', amount: '$24,000' },
        { label: 'Direct labour', amount: '$13,800' },
      ],
      operatingExpenses: [
        { label: 'Salaries and wages', amount: '$18,000' },
        { label: 'Rent expense', amount: '$8,000' },
        { label: 'Utilities', amount: '$4,000' },
        { label: 'Marketing', amount: '$5,680' },
        { label: 'Administrative expenses', amount: '$6,000' },
      ],
      totals: {
        revenue: '$146,220',
        costOfSales: '$37,800',
        grossProfit: '$108,420',
        operatingExpenses: '$42,420',
        netProfit: '$66,740',
      },
    },
  },
  3: {
    kind: 'Journal',
    data: {
      entries: [
        {
          date: '2024-04-09',
          reference: 'JN-001',
          narration: 'Sales invoice posted and revenue recognized',
          lines: [
            { account: 'Cash', debit: '$15,000' },
            { account: 'Sales Revenue', credit: '$15,000' },
          ],
        },
        {
          date: '2024-04-09',
          reference: 'JN-002',
          narration: 'Monthly office rent paid',
          lines: [
            { account: 'Rent Expense', debit: '$4,200' },
            { account: 'Cash', credit: '$4,200' },
          ],
        },
        {
          date: '2024-04-09',
          reference: 'JN-003',
          narration: 'Business loan received from bank',
          lines: [
            { account: 'Cash', debit: '$10,000' },
            { account: 'Bank Loan Payable', credit: '$10,000' },
          ],
        },
        {
          date: '2024-04-09',
          reference: 'JN-004',
          narration: 'Inventory purchased on account',
          lines: [
            { account: 'Inventory', debit: '$18,000' },
            { account: 'Accounts Payable', credit: '$18,000' },
          ],
        },
        {
          date: '2024-04-09',
          reference: 'JN-005',
          narration: 'Service revenue recognized',
          lines: [
            { account: 'Accounts Receivable', debit: '$21,200' },
            { account: 'Service Revenue', credit: '$21,200' },
          ],
        },
      ],
      totals: {
        debit: '$68,400',
        credit: '$68,400',
        balance: 'Balanced',
      },
    },
  },
  8: {
    kind: 'Journal',
    data: {
      entries: [
        {
          date: '2024-07-09',
          reference: 'JN-101',
          narration: 'Sales invoice posted and revenue recognized',
          lines: [
            { account: 'Cash', debit: '$22,000' },
            { account: 'Sales Revenue', credit: '$22,000' },
          ],
        },
        {
          date: '2024-07-09',
          reference: 'JN-102',
          narration: 'Monthly office rent paid',
          lines: [
            { account: 'Rent Expense', debit: '$4,500' },
            { account: 'Cash', credit: '$4,500' },
          ],
        },
        {
          date: '2024-07-09',
          reference: 'JN-103',
          narration: 'Scheduled loan repayment',
          lines: [
            { account: 'Bank Loan Payable', debit: '$6,000' },
            { account: 'Cash', credit: '$6,000' },
          ],
        },
        {
          date: '2024-07-09',
          reference: 'JN-104',
          narration: 'Additional service income recognized',
          lines: [
            { account: 'Accounts Receivable', debit: '$18,600' },
            { account: 'Service Revenue', credit: '$18,600' },
          ],
        },
        {
          date: '2024-07-09',
          reference: 'JN-105',
          narration: 'Loan proceeds received from lender',
          lines: [
            { account: 'Cash', debit: '$31,000' },
            { account: 'Bank Loan Payable', credit: '$31,000' },
          ],
        },
      ],
      totals: {
        debit: '$82,100',
        credit: '$82,100',
        balance: 'Balanced',
      },
    },
  },
  4: {
    kind: 'Cash Book',
    data: {
      openingBalance: '$18,750',
      receipts: [
        { date: '2024-04-08', reference: 'CB-001', particulars: 'Cash sales', amount: '$18,000', balance: '$36,750' },
        { date: '2024-04-08', reference: 'CB-003', particulars: 'Bank deposit reversal', amount: '$10,000', balance: '$46,750' },
        { date: '2024-04-08', reference: 'CB-004', particulars: 'Service income received', amount: '$14,800', balance: '$61,550' },
      ],
      payments: [
        { date: '2024-04-08', reference: 'CB-002', particulars: 'Supplier payment', amount: '$8,200', balance: '$28,550' },
        { date: '2024-04-08', reference: 'CB-005', particulars: 'Fuel and transport', amount: '$2,750', balance: '$25,800' },
        { date: '2024-04-08', reference: 'CB-006', particulars: 'Payroll settlement', amount: '$18,010', balance: '$7,790' },
      ],
      totals: {
        receipts: '$42,800',
        payments: '$28,960',
        closing: '$32,590',
      },
    },
  },
  9: {
    kind: 'Cash Book',
    data: {
      openingBalance: '$28,550',
      receipts: [
        { date: '2024-07-08', reference: 'CB-101', particulars: 'Cash sales', amount: '$20,000', balance: '$48,550' },
        { date: '2024-07-08', reference: 'CB-103', particulars: 'Service income received', amount: '$16,300', balance: '$64,850' },
        { date: '2024-07-08', reference: 'CB-104', particulars: 'Bank interest received', amount: '$18,000', balance: '$82,850' },
      ],
      payments: [
        { date: '2024-07-08', reference: 'CB-102', particulars: 'Supplier payment', amount: '$9,500', balance: '$39,050' },
        { date: '2024-07-08', reference: 'CB-105', particulars: 'Operating expenses', amount: '$5,250', balance: '$33,800' },
        { date: '2024-07-08', reference: 'CB-106', particulars: 'Payroll settlement', amount: '$20,010', balance: '$13,790' },
      ],
      totals: {
        receipts: '$54,300',
        payments: '$34,760',
        closing: '$48,090',
      },
    },
  },
  5: {
    kind: 'Trial Balance',
    data: {
      accounts: [
        { account: 'Cash', debit: '$42,000' },
        { account: 'Accounts receivable', debit: '$31,500' },
        { account: 'Inventory', debit: '$18,000' },
        { account: 'Equipment', debit: '$92,500' },
        { account: 'Prepaid expenses', debit: '$61,000' },
        { account: 'Accounts payable', credit: '$17,500' },
        { account: 'Bank loan', credit: '$55,000' },
        { account: 'Owner equity', credit: '$172,500' },
      ],
      totals: {
        debit: '$245,000',
        credit: '$245,000',
        difference: '$0',
      },
    },
  },
  10: {
    kind: 'Trial Balance',
    data: {
      accounts: [
        { account: 'Cash', debit: '$52,000' },
        { account: 'Accounts receivable', debit: '$34,500' },
        { account: 'Inventory', debit: '$21,000' },
        { account: 'Equipment', debit: '$102,500' },
        { account: 'Prepaid expenses', debit: '$68,000' },
        { account: 'Accounts payable', credit: '$21,000' },
        { account: 'Bank loan', credit: '$60,000' },
        { account: 'Owner equity', credit: '$197,000' },
      ],
      totals: {
        debit: '$278,000',
        credit: '$278,000',
        difference: '$0',
      },
    },
  },
};

function csvEscape(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function downloadCsv({ fileName, headers, rows }: CsvTable) {
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => csvEscape(value)).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

function DetailCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </section>
  );
}

function SectionTable({
  title,
  items,
  totalLabel,
  totalValue,
  emphasis = 'green',
}: {
  title: string;
  items: MonetaryLine[];
  totalLabel: string;
  totalValue: string;
  emphasis?: 'green' | 'slate';
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">Ledger-style statement block</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          {items.length} line(s)
        </span>
      </div>
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.label}>
              <td className="px-4 py-3 align-top text-slate-700">
                <div className="font-medium text-slate-900">{item.label}</div>
                {item.note && <div className="mt-1 text-xs text-slate-500">{item.note}</div>}
              </td>
              <td className="px-4 py-3 text-right font-mono text-slate-800 tabular-nums">{item.amount}</td>
            </tr>
          ))}
          <tr className={emphasis === 'green' ? 'bg-emerald-50/70' : 'bg-slate-50'}>
            <td className="px-4 py-3 text-sm font-semibold text-slate-900">{totalLabel}</td>
            <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">{totalValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BalanceSheetView({ data, businessName }: { data: BalanceSheetTemplate; businessName: string }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
      <p className="mb-3 text-sm font-semibold text-slate-700">Business: {businessName}</p>
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">Financial Statement</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Balance Sheet</h2>
            <p className="mt-1 text-sm text-slate-500">Assets, liabilities and equity presented in the classic statement layout.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Prepared for</p>
            <p className="text-sm font-semibold text-slate-900">Statement of Financial Position</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <DetailCard title="Assets" subtitle="Current and fixed assets presented separately.">
          <div className="space-y-4">
            <SectionTable title="Current Assets" items={data.currentAssets} totalLabel="Total Current Assets" totalValue={data.totals.currentAssets} />
            <SectionTable title="Fixed Assets" items={data.fixedAssets} totalLabel="Total Fixed Assets" totalValue={data.totals.fixedAssets} />
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
              Total Assets {data.totals.totalAssets}
            </div>
          </div>
        </DetailCard>

        <DetailCard title="Liabilities and Equity" subtitle="Short-term obligations, long-term debt and capital.">
          <div className="space-y-4">
            <SectionTable title="Current Liabilities" items={data.currentLiabilities} totalLabel="Total Current Liabilities" totalValue={data.totals.currentLiabilities} emphasis="slate" />
            <SectionTable title="Long-Term Liabilities" items={data.longTermLiabilities} totalLabel="Total Long-Term Liabilities" totalValue={data.totals.longTermLiabilities} emphasis="slate" />
            <SectionTable title="Capital and Retained Earnings" items={data.capital} totalLabel="Total Equity" totalValue={data.totals.totalEquity} />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
              Liabilities and Equity {data.totals.liabilitiesAndEquity}
            </div>
          </div>
        </DetailCard>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Owner Equity</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.capital}</p>
          <p className="mt-1 text-sm text-slate-500">Capital contributed by the owner.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Retained Earnings</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.retainedEarnings}</p>
          <p className="mt-1 text-sm text-slate-500">Accumulated profits after distributions.</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Balance Check</p>
          <p className="mt-2 text-lg font-bold text-emerald-900">{data.totals.balanceCheck}</p>
          <p className="mt-1 text-sm text-emerald-800">Assets equal liabilities plus equity.</p>
        </div>
      </div>
    </section>
  );
}

function IncomeStatementView({ data, businessName }: { data: IncomeStatementTemplate; businessName: string }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
      <p className="mb-3 text-sm font-semibold text-slate-700">Business: {businessName}</p>
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">Performance Report</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Income Statement</h2>
            <p className="mt-1 text-sm text-slate-500">Revenue, cost of sales and expenses with a clear profit bridge.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Prepared on accrual basis</p>
            <p className="text-sm font-semibold text-slate-900">Profit and Loss Statement</p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50">
              <td className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600" colSpan={2}>
                Revenue
              </td>
            </tr>
            {data.revenue.map((item) => (
              <tr key={item.label}>
                <td className="px-5 py-4 text-slate-900">
                  <div className="font-medium">{item.label}</div>
                  {item.note && <div className="mt-1 text-xs text-slate-500">{item.note}</div>}
                </td>
                <td className="px-5 py-4 text-right font-mono text-slate-800 tabular-nums">{item.amount}</td>
              </tr>
            ))}
            <tr className="bg-emerald-50/70">
              <td className="px-5 py-4 font-semibold text-slate-900">Total Revenue</td>
              <td className="px-5 py-4 text-right font-semibold text-slate-900">{data.totals.revenue}</td>
            </tr>

            <tr className="bg-slate-50">
              <td className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600" colSpan={2}>
                Cost of Sales
              </td>
            </tr>
            {data.costOfSales.map((item) => (
              <tr key={item.label}>
                <td className="px-5 py-4 text-slate-900">
                  <div className="font-medium">{item.label}</div>
                </td>
                <td className="px-5 py-4 text-right font-mono text-slate-800 tabular-nums">{item.amount}</td>
              </tr>
            ))}
            <tr className="bg-slate-100">
              <td className="px-5 py-4 font-semibold text-slate-900">Gross Profit</td>
              <td className="px-5 py-4 text-right font-semibold text-slate-900">{data.totals.grossProfit}</td>
            </tr>

            <tr className="bg-slate-50">
              <td className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600" colSpan={2}>
                Operating Expenses
              </td>
            </tr>
            {data.operatingExpenses.map((item) => (
              <tr key={item.label}>
                <td className="px-5 py-4 text-slate-900">
                  <div className="font-medium">{item.label}</div>
                </td>
                <td className="px-5 py-4 text-right font-mono text-slate-800 tabular-nums">{item.amount}</td>
              </tr>
            ))}
            <tr className="bg-slate-100">
              <td className="px-5 py-4 font-semibold text-slate-900">Total Operating Expenses</td>
              <td className="px-5 py-4 text-right font-semibold text-slate-900">{data.totals.operatingExpenses}</td>
            </tr>

            <tr className="bg-emerald-100">
              <td className="px-5 py-5 text-base font-bold text-slate-900">Net Profit</td>
              <td className="px-5 py-5 text-right text-base font-bold text-emerald-800">{data.totals.netProfit}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Revenue</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.revenue}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Gross Profit</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.grossProfit}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Net Profit</p>
          <p className="mt-2 text-lg font-bold text-emerald-900">{data.totals.netProfit}</p>
        </div>
      </div>
    </section>
  );
}

function JournalView({ data, businessName }: { data: JournalTemplate; businessName: string }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
      <p className="mb-3 text-sm font-semibold text-slate-700">Business: {businessName}</p>
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">Book of Original Entry</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Journal</h2>
            <p className="mt-1 text-sm text-slate-500">Chronological entries laid out like a proper accounting journal.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Double-entry control</p>
            <p className="text-sm font-semibold text-slate-900">Debits = Credits</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {data.entries.map((entry) => (
          <article key={entry.reference} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{entry.reference}</p>
                  <p className="text-xs text-slate-500">{entry.date}</p>
                </div>
                <p className="text-sm text-slate-700">{entry.narration}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[560px] text-sm sm:min-w-full">
                <thead className="bg-white text-xs uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Account</th>
                    <th className="px-5 py-3 text-right font-semibold">Debit</th>
                    <th className="px-5 py-3 text-right font-semibold">Credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entry.lines.map((line) => (
                    <tr key={`${entry.reference}-${line.account}`}>
                      <td className="px-5 py-3 font-medium text-slate-900">{line.account}</td>
                      <td className="px-5 py-3 text-right font-mono text-slate-800 tabular-nums">{line.debit || '-'}</td>
                      <td className="px-5 py-3 text-right font-mono text-slate-800 tabular-nums">{line.credit || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Debit Total</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.debit}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Credit Total</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.credit}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Control Status</p>
          <p className="mt-2 text-lg font-bold text-emerald-900">{data.totals.balance}</p>
        </div>
      </div>
    </section>
  );
}

function CashBookView({ data, businessName }: { data: CashBookTemplate; businessName: string }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
      <p className="mb-3 text-sm font-semibold text-slate-700">Business: {businessName}</p>
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">Cash Ledger</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Cash Book</h2>
            <p className="mt-1 text-sm text-slate-500">Receipts and payments are separated for a clean daily cash view.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Opening balance</p>
            <p className="text-sm font-semibold text-slate-900">{data.openingBalance}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="grid min-w-[680px] gap-6 xl:min-w-0 xl:grid-cols-2">
          <DetailCard title="Receipts" subtitle="Money coming into the business.">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[640px] text-sm sm:min-w-full">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Particulars</th>
                  <th className="px-4 py-3 text-left font-semibold">Folio</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {data.receipts.map((line) => (
                  <tr key={line.reference}>
                    <td className="px-4 py-3 text-slate-700">{line.date}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{line.particulars}</td>
                    <td className="px-4 py-3 text-slate-700">{line.reference}</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-800 tabular-nums">{line.amount}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-50/70">
                  <td className="px-4 py-3 font-semibold text-slate-900" colSpan={3}>Total Receipts</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{data.totals.receipts}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </DetailCard>

          <DetailCard title="Payments" subtitle="Money going out of the business.">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[640px] text-sm sm:min-w-full">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Particulars</th>
                  <th className="px-4 py-3 text-left font-semibold">Folio</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {data.payments.map((line) => (
                  <tr key={line.reference}>
                    <td className="px-4 py-3 text-slate-700">{line.date}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{line.particulars}</td>
                    <td className="px-4 py-3 text-slate-700">{line.reference}</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-800 tabular-nums">{line.amount}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900" colSpan={3}>Total Payments</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{data.totals.payments}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </DetailCard>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Opening Balance</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.openingBalance}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Closing Balance</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.closing}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Control Total</p>
          <p className="mt-2 text-lg font-bold text-emerald-900">Cash book balanced</p>
        </div>
      </div>
    </section>
  );
}

function TrialBalanceView({ data, businessName }: { data: TrialBalanceTemplate; businessName: string }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
      <p className="mb-3 text-sm font-semibold text-slate-700">Business: {businessName}</p>
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">Control Report</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Trial Balance</h2>
            <p className="mt-1 text-sm text-slate-500">Account balances listed in debit and credit columns for verification.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Difference</p>
            <p className="text-sm font-semibold text-slate-900">{data.totals.difference}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white">
        <table className="min-w-[560px] text-sm sm:min-w-full">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Account</th>
              <th className="px-5 py-3 text-right font-semibold">Debit</th>
              <th className="px-5 py-3 text-right font-semibold">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.accounts.map((line) => (
              <tr key={line.account}>
                <td className="px-5 py-4 text-slate-900">
                  <div className="font-medium">{line.account}</div>
                  {line.note && <div className="mt-1 text-xs text-slate-500">{line.note}</div>}
                </td>
                <td className="px-5 py-4 text-right font-mono text-slate-800 tabular-nums">{line.debit || '-'}</td>
                <td className="px-5 py-4 text-right font-mono text-slate-800 tabular-nums">{line.credit || '-'}</td>
              </tr>
            ))}
            <tr className="bg-emerald-50/70">
              <td className="px-5 py-4 font-semibold text-slate-900">Totals</td>
              <td className="px-5 py-4 text-right font-semibold text-slate-900">{data.totals.debit}</td>
              <td className="px-5 py-4 text-right font-semibold text-slate-900">{data.totals.credit}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Debit Total</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.debit}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Credit Total</p>
          <p className="mt-2 text-lg font-bold text-slate-900">{data.totals.credit}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Difference</p>
          <p className="mt-2 text-lg font-bold text-emerald-900">{data.totals.difference}</p>
        </div>
      </div>
    </section>
  );
}

function getTemplate(report: ReportDefinition): ReportTemplate {
  return reportTemplates[report.id];
}

function buildCsv(report: ReportDefinition): CsvTable {
  const template = getTemplate(report);

  switch (template.kind) {
    case 'Balance Sheet':
      return {
        fileName: `${report.slug}-balance-sheet.csv`,
        headers: ['Section', 'Line Item', 'Amount'],
        rows: [
          ...template.data.currentAssets.map((item) => ['Current Assets', item.label, item.amount]),
          ['Current Assets', 'Total Current Assets', template.data.totals.currentAssets],
          ...template.data.fixedAssets.map((item) => ['Fixed Assets', item.label, item.amount]),
          ['Fixed Assets', 'Total Fixed Assets', template.data.totals.fixedAssets],
          ['Assets', 'Total Assets', template.data.totals.totalAssets],
          ...template.data.currentLiabilities.map((item) => ['Current Liabilities', item.label, item.amount]),
          ['Current Liabilities', 'Total Current Liabilities', template.data.totals.currentLiabilities],
          ...template.data.longTermLiabilities.map((item) => ['Long-Term Liabilities', item.label, item.amount]),
          ['Long-Term Liabilities', 'Total Long-Term Liabilities', template.data.totals.longTermLiabilities],
          ...template.data.capital.map((item) => ['Capital and Retained Earnings', item.label, item.amount]),
          ['Capital and Retained Earnings', 'Total Equity', template.data.totals.totalEquity],
          ['Equity Check', 'Liabilities and Equity', template.data.totals.liabilitiesAndEquity],
        ],
      };
    case 'Income Statement':
      return {
        fileName: `${report.slug}-income-statement.csv`,
        headers: ['Section', 'Line Item', 'Amount'],
        rows: [
          ...template.data.revenue.map((item) => ['Revenue', item.label, item.amount]),
          ['Revenue', 'Total Revenue', template.data.totals.revenue],
          ...template.data.costOfSales.map((item) => ['Cost of Sales', item.label, item.amount]),
          ['Cost of Sales', 'Total Cost of Sales', template.data.totals.costOfSales],
          ['Performance', 'Gross Profit', template.data.totals.grossProfit],
          ...template.data.operatingExpenses.map((item) => ['Operating Expenses', item.label, item.amount]),
          ['Operating Expenses', 'Total Operating Expenses', template.data.totals.operatingExpenses],
          ['Performance', 'Net Profit', template.data.totals.netProfit],
        ],
      };
    case 'Journal':
      return {
        fileName: `${report.slug}-journal.csv`,
        headers: ['Date', 'Reference', 'Narration', 'Account', 'Debit', 'Credit'],
        rows: template.data.entries.flatMap((entry) =>
          entry.lines.map((line) => [entry.date, entry.reference, entry.narration, line.account, line.debit || '', line.credit || ''])
        ),
      };
    case 'Cash Book':
      return {
        fileName: `${report.slug}-cash-book.csv`,
        headers: ['Section', 'Date', 'Reference', 'Particulars', 'Amount', 'Balance'],
        rows: [
          ...template.data.receipts.map((line) => ['Receipts', line.date, line.reference, line.particulars, line.amount, line.balance]),
          ...template.data.payments.map((line) => ['Payments', line.date, line.reference, line.particulars, line.amount, line.balance]),
        ],
      };
    case 'Trial Balance':
      return {
        fileName: `${report.slug}-trial-balance.csv`,
        headers: ['Account', 'Debit', 'Credit'],
        rows: template.data.accounts.map((line) => [line.account, line.debit || '', line.credit || '']),
      };
  }
}

function TemplateRenderer({ report, businessName }: { report: ReportDefinition; businessName: string }) {
  const template = getTemplate(report);

  switch (template.kind) {
    case 'Balance Sheet':
      return <BalanceSheetView data={template.data} businessName={businessName} />;
    case 'Income Statement':
      return <IncomeStatementView data={template.data} businessName={businessName} />;
    case 'Journal':
      return <JournalView data={template.data} businessName={businessName} />;
    case 'Cash Book':
      return <CashBookView data={template.data} businessName={businessName} />;
    case 'Trial Balance':
      return <TrialBalanceView data={template.data} businessName={businessName} />;
  }
}

export default function ReportDetailView({ report, businessName }: ReportDetailViewProps) {
  const Icon = iconMap[report.type];
  const readyForDownload = report.status === 'Ready';

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    downloadCsv(buildCsv(report));
  };

  return (
    <div className="space-y-6 overflow-x-hidden" data-report-printable>
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] sm:p-6 lg:flex-row lg:items-end lg:justify-between no-print">
        <div className="space-y-3">
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Link>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-green-100 p-3 text-green-700">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{report.name}</h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">{report.summary}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${readyForDownload ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {report.status}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {report.period}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Generated {report.generatedAt}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 no-print">
        <ReportSummaryStats stats={report.summaryStats} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="min-w-0 space-y-6">
          <TemplateRenderer report={report} businessName={businessName} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start no-print">
          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2 text-emerald-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Export and Review</h2>
                <p className="text-sm text-slate-300">Create a clean print view or export a CSV copy.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <Printer className="h-4 w-4" />
                Print / Save as PDF
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Report Info</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span>Report type</span>
                <span className="font-semibold text-slate-900">{report.type}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span>Report ID</span>
                <span className="font-semibold text-slate-900">{report.id}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span>Route slug</span>
                <span className="font-semibold text-slate-900">/{report.slug}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}