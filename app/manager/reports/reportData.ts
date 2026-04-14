export type ReportType = 'Balance Sheet' | 'Income Statement' | 'Journal' | 'Ledger' | 'Cash Book' | 'Trial Balance';

export type ReportSummaryStat = {
  label: string;
  value: string;
  description: string;
};

export type ReportSection = {
  title: string;
  description?: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type ReportRow = {
  date: string;
  reference: string;
  description: string;
  debit?: string;
  credit?: string;
  amount?: string;
  balance?: string;
};

export type ReportDefinition = {
  id: number;
  slug: string;
  name: string;
  type: ReportType;
  status: 'Ready' | 'Processing';
  period: string;
  generatedAt: string;
  summary: string;
  overview: string;
  summaryStats: ReportSummaryStat[];
  sections: ReportSection[];
  rows: ReportRow[];
};

export const reports: ReportDefinition[] = [
  {
    id: 1,
    slug: 'balance-sheet',
    name: 'Balance Sheet',
    type: 'Balance Sheet',
    status: 'Ready',
    period: 'Q1 2024',
    generatedAt: '2024-04-10',
    summary: 'Shows what the business owns, owes, and the owner\'s equity at a point in time.',
    overview: 'A snapshot of the company\'s financial position.',
    summaryStats: [
      { label: 'Assets', value: '$184,000', description: 'Cash, receivables, equipment' },
      { label: 'Liabilities', value: '$72,500', description: 'Loans and payables' },
      { label: 'Equity', value: '$111,500', description: 'Owner value in the business' },
    ],
    sections: [
      {
        title: 'Assets',
        description: 'What the business owns',
        items: [
          { label: 'Cash', value: '$42,000' },
          { label: 'Accounts Receivable', value: '$31,500' },
          { label: 'Inventory', value: '$18,000' },
          { label: 'Equipment', value: '$92,500' },
        ],
      },
      {
        title: 'Liabilities',
        description: 'What the business owes',
        items: [
          { label: 'Bank Loan', value: '$55,000' },
          { label: 'Supplier Payables', value: '$17,500' },
        ],
      },
      {
        title: 'Owner Equity',
        description: 'Residual value after liabilities',
        items: [
          { label: 'Capital', value: '$120,000' },
          { label: 'Retained Earnings', value: '$-8,500' },
        ],
      },
    ],
    rows: [
      { date: '2024-04-10', reference: 'BS-001', description: 'Cash balance', balance: '$42,000' },
      { date: '2024-04-10', reference: 'BS-002', description: 'Receivables', balance: '$31,500' },
      { date: '2024-04-10', reference: 'BS-003', description: 'Equipment value', balance: '$92,500' },
    ],
  },
  {
    id: 6,
    slug: 'balance-sheet-q2-2024',
    name: 'Balance Sheet',
    type: 'Balance Sheet',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-10',
    summary: 'Shows what the business owns, owes, and the owner\'s equity at a point in time.',
    overview: 'A snapshot of the company\'s financial position for Q2.',
    summaryStats: [
      { label: 'Assets', value: '$210,000', description: 'Cash, receivables, equipment' },
      { label: 'Liabilities', value: '$81,000', description: 'Loans and payables' },
      { label: 'Equity', value: '$129,000', description: 'Owner value in the business' },
    ],
    sections: [
      {
        title: 'Assets',
        description: 'What the business owns',
        items: [
          { label: 'Cash', value: '$52,000' },
          { label: 'Accounts Receivable', value: '$34,500' },
          { label: 'Inventory', value: '$21,000' },
          { label: 'Equipment', value: '$102,500' },
        ],
      },
      {
        title: 'Liabilities',
        description: 'What the business owes',
        items: [
          { label: 'Bank Loan', value: '$60,000' },
          { label: 'Supplier Payables', value: '$21,000' },
        ],
      },
      {
        title: 'Owner Equity',
        description: 'Residual value after liabilities',
        items: [
          { label: 'Capital', value: '$130,000' },
          { label: 'Retained Earnings', value: '$-1,000' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-10', reference: 'BS-101', description: 'Cash balance', balance: '$52,000' },
      { date: '2024-07-10', reference: 'BS-102', description: 'Receivables', balance: '$34,500' },
      { date: '2024-07-10', reference: 'BS-103', description: 'Equipment value', balance: '$102,500' },
    ],
  },
  {
    id: 2,
    slug: 'income-statement',
    name: 'Income Statement',
    type: 'Income Statement',
    status: 'Ready',
    period: 'Q1 2024',
    generatedAt: '2024-04-10',
    summary: 'Shows revenue, expenses, and profit for a period of time.',
    overview: 'A performance report for the business.',
    summaryStats: [
      { label: 'Revenue', value: '$128,450', description: 'Sales and service income' },
      { label: 'Expenses', value: '$72,320', description: 'All operating costs' },
      { label: 'Net Profit', value: '$56,130', description: 'What remains after expenses' },
    ],
    sections: [
      {
        title: 'Income',
        description: 'Money earned during the period',
        items: [
          { label: 'Sales Revenue', value: '$88,000' },
          { label: 'Service Income', value: '$40,450' },
        ],
      },
      {
        title: 'Expenses',
        description: 'Costs paid to run the business',
        items: [
          { label: 'Salaries', value: '$34,000' },
          { label: 'Rent', value: '$12,000' },
          { label: 'Utilities', value: '$4,500' },
          { label: 'Marketing', value: '$9,820' },
          { label: 'Other', value: '$12,000' },
        ],
      },
    ],
    rows: [
      { date: '2024-04-10', reference: 'IS-001', description: 'Sales revenue', credit: '$88,000' },
      { date: '2024-04-10', reference: 'IS-002', description: 'Service income', credit: '$40,450' },
      { date: '2024-04-10', reference: 'IS-003', description: 'Total expenses', debit: '$72,320' },
    ],
  },
  {
    id: 7,
    slug: 'income-statement-q2-2024',
    name: 'Income Statement',
    type: 'Income Statement',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-10',
    summary: 'Shows revenue, expenses, and profit for a period of time.',
    overview: 'A performance report for the business in Q2.',
    summaryStats: [
      { label: 'Revenue', value: '$146,220', description: 'Sales and service income' },
      { label: 'Expenses', value: '$79,480', description: 'All operating costs' },
      { label: 'Net Profit', value: '$66,740', description: 'What remains after expenses' },
    ],
    sections: [
      {
        title: 'Income',
        description: 'Money earned during the period',
        items: [
          { label: 'Sales Revenue', value: '$101,000' },
          { label: 'Service Income', value: '$45,220' },
        ],
      },
      {
        title: 'Expenses',
        description: 'Costs paid to run the business',
        items: [
          { label: 'Salaries', value: '$36,000' },
          { label: 'Rent', value: '$12,000' },
          { label: 'Utilities', value: '$5,000' },
          { label: 'Marketing', value: '$10,480' },
          { label: 'Other', value: '$16,000' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-10', reference: 'IS-101', description: 'Sales revenue', credit: '$101,000' },
      { date: '2024-07-10', reference: 'IS-102', description: 'Service income', credit: '$45,220' },
      { date: '2024-07-10', reference: 'IS-103', description: 'Total expenses', debit: '$79,480' },
    ],
  },
  {
    id: 3,
    slug: 'journal',
    name: 'Journal',
    type: 'Journal',
    status: 'Ready',
    period: 'April 2024',
    generatedAt: '2024-04-09',
    summary: 'Shows every journal entry in chronological order as it was recorded.',
    overview: 'The day-to-day bookkeeping record.',
    summaryStats: [
      { label: 'Entries', value: '24', description: 'Journal lines recorded' },
      { label: 'Debits', value: '$68,400', description: 'Total debit postings' },
      { label: 'Credits', value: '$68,400', description: 'Total credit postings' },
    ],
    sections: [
      {
        title: 'Journal Highlights',
        description: 'Recent entries affecting the books',
        items: [
          { label: 'Sales invoice posted', value: '$15,000' },
          { label: 'Office rent posted', value: '$4,200' },
          { label: 'Loan received', value: '$10,000' },
        ],
      },
    ],
    rows: [
      { date: '2024-04-09', reference: 'JN-001', description: 'Sales invoice posted', debit: '$15,000', credit: '$15,000' },
      { date: '2024-04-09', reference: 'JN-002', description: 'Office rent posted', debit: '$4,200', credit: '$4,200' },
      { date: '2024-04-09', reference: 'JN-003', description: 'Loan received', debit: '$10,000', credit: '$10,000' },
    ],
  },
  {
    id: 8,
    slug: 'journal-q2-2024',
    name: 'Journal',
    type: 'Journal',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-09',
    summary: 'Shows every journal entry in chronological order as it was recorded.',
    overview: 'The day-to-day bookkeeping record for Q2.',
    summaryStats: [
      { label: 'Entries', value: '31', description: 'Journal lines recorded' },
      { label: 'Debits', value: '$82,100', description: 'Total debit postings' },
      { label: 'Credits', value: '$82,100', description: 'Total credit postings' },
    ],
    sections: [
      {
        title: 'Journal Highlights',
        description: 'Recent entries affecting the books',
        items: [
          { label: 'Sales invoice posted', value: '$22,000' },
          { label: 'Office rent posted', value: '$4,500' },
          { label: 'Loan repayment', value: '$6,000' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-09', reference: 'JN-101', description: 'Sales invoice posted', debit: '$22,000', credit: '$22,000' },
      { date: '2024-07-09', reference: 'JN-102', description: 'Office rent posted', debit: '$4,500', credit: '$4,500' },
      { date: '2024-07-09', reference: 'JN-103', description: 'Loan repayment', debit: '$6,000', credit: '$6,000' },
    ],
  },
  {
    id: 11,
    slug: 'general-ledger-q1-2024',
    name: 'General Ledger',
    type: 'Ledger',
    status: 'Ready',
    period: 'Q1 2024',
    generatedAt: '2024-04-11',
    summary: 'Chronological ledger activity for Acme Holdings Ltd during Q1 2024.',
    overview: 'A standard ledger extract showing the account postings recorded during the quarter.',
    summaryStats: [
      { label: 'Opening Balance', value: '$18,864.50', description: 'Start of period ledger balance' },
      { label: 'Total Debits', value: '$21,500.00', description: 'Debit-side postings' },
      { label: 'Total Credits', value: '$6,435.50', description: 'Credit-side postings' },
    ],
    sections: [
      {
        title: 'Ledger Scope',
        description: 'Core accounts included in this extract',
        items: [
          { label: 'Income - Services', value: 'Revenue postings' },
          { label: 'Expenses - Supplies', value: 'Operating expenses' },
          { label: 'Fixed Assets', value: 'Capital purchases' },
        ],
      },
      {
        title: 'Control Check',
        description: 'Ledger entries reconcile to a running balance',
        items: [
          { label: 'Status', value: 'Balanced' },
          { label: 'Closing Balance', value: '$33,929.00' },
        ],
      },
    ],
    rows: [
      { date: '2024-04-11', reference: 'LG-001', description: 'Service invoice posted', debit: '$15,000.00', balance: '$33,864.50' },
      { date: '2024-04-11', reference: 'LG-002', description: 'Office supplies purchase', credit: '$245.50', balance: '$33,619.00' },
      { date: '2024-04-11', reference: 'LG-003', description: 'Equipment acquisition', credit: '$890.00', balance: '$32,729.00' },
      { date: '2024-04-11', reference: 'LG-004', description: 'Owner contribution', debit: '$1,200.00', balance: '$33,929.00' },
    ],
  },
  {
    id: 12,
    slug: 'general-ledger-q2-2024',
    name: 'General Ledger',
    type: 'Ledger',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-11',
    summary: 'Chronological ledger activity for Acme Holdings Ltd during Q2 2024.',
    overview: 'Quarter-end ledger extract with the largest account movements captured in one view.',
    summaryStats: [
      { label: 'Opening Balance', value: '$33,929.00', description: 'Start of period ledger balance' },
      { label: 'Total Debits', value: '$29,300.00', description: 'Debit-side postings' },
      { label: 'Total Credits', value: '$11,220.00', description: 'Credit-side postings' },
    ],
    sections: [
      {
        title: 'Ledger Scope',
        description: 'High-activity accounts in the quarter',
        items: [
          { label: 'Sales Revenue', value: 'Revenue postings' },
          { label: 'Bank Loan Payable', value: 'Financing movements' },
          { label: 'Accounts Receivable', value: 'Customer settlements' },
        ],
      },
      {
        title: 'Control Check',
        description: 'Quarter-end balance review',
        items: [
          { label: 'Status', value: 'Balanced' },
          { label: 'Closing Balance', value: '$52,009.00' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-11', reference: 'LG-101', description: 'Customer receipt applied', debit: '$12,000.00', balance: '$45,929.00' },
      { date: '2024-07-11', reference: 'LG-102', description: 'Rent payment', credit: '$4,500.00', balance: '$41,429.00' },
      { date: '2024-07-11', reference: 'LG-103', description: 'Loan proceeds received', debit: '$20,000.00', balance: '$61,429.00' },
      { date: '2024-07-11', reference: 'LG-104', description: 'Tax remittance', credit: '$9,420.00', balance: '$52,009.00' },
    ],
  },
  {
    id: 13,
    slug: 'retail-ledger-q2-2024',
    name: 'General Ledger',
    type: 'Ledger',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-12',
    summary: 'Ledger extract for Nexa Retail Group Ltd covering Q2 2024 posting activity.',
    overview: 'Retail and distribution postings grouped into a chronological ledger statement.',
    summaryStats: [
      { label: 'Opening Balance', value: '$26,410.00', description: 'Start of period ledger balance' },
      { label: 'Total Debits', value: '$18,760.00', description: 'Debit-side postings' },
      { label: 'Total Credits', value: '$9,120.00', description: 'Credit-side postings' },
    ],
    sections: [
      {
        title: 'Ledger Scope',
        description: 'Retail activity captured in the ledger',
        items: [
          { label: 'Inventory', value: 'Stock movements' },
          { label: 'Trade Payables', value: 'Supplier settlements' },
          { label: 'Cash', value: 'Store receipts' },
        ],
      },
      {
        title: 'Control Check',
        description: 'Ledger totals remain in balance',
        items: [
          { label: 'Status', value: 'Balanced' },
          { label: 'Closing Balance', value: '$36,050.00' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-12', reference: 'LG-201', description: 'Store cash deposits', debit: '$8,500.00', balance: '$34,910.00' },
      { date: '2024-07-12', reference: 'LG-202', description: 'Supplier payment', credit: '$3,120.00', balance: '$31,790.00' },
      { date: '2024-07-12', reference: 'LG-203', description: 'Inventory restock', credit: '$6,000.00', balance: '$25,790.00' },
      { date: '2024-07-12', reference: 'LG-204', description: 'Bank adjustment', debit: '$10,260.00', balance: '$36,050.00' },
    ],
  },
  {
    id: 14,
    slug: 'distribution-ledger-q2-2024',
    name: 'General Ledger',
    type: 'Ledger',
    status: 'Processing',
    period: 'Q2 2024',
    generatedAt: '2024-07-13',
    summary: 'Ledger extract for Peak Foods Distributors currently finishing processing.',
    overview: 'Distribution ledger activity captured for close review before sign-off.',
    summaryStats: [
      { label: 'Opening Balance', value: '$41,200.00', description: 'Start of period ledger balance' },
      { label: 'Total Debits', value: '$15,000.00', description: 'Debit-side postings' },
      { label: 'Total Credits', value: '$7,480.00', description: 'Credit-side postings' },
    ],
    sections: [
      {
        title: 'Ledger Scope',
        description: 'Distribution movements captured in the extract',
        items: [
          { label: 'Accounts Receivable', value: 'Customer collections' },
          { label: 'Inventory', value: 'Warehouse movements' },
          { label: 'Cash', value: 'Settlement activity' },
        ],
      },
      {
        title: 'Control Check',
        description: 'Processing status before final posting',
        items: [
          { label: 'Status', value: 'Processing' },
          { label: 'Provisional Closing Balance', value: '$48,720.00' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-13', reference: 'LG-301', description: 'Customer collection', debit: '$6,200.00', balance: '$47,400.00' },
      { date: '2024-07-13', reference: 'LG-302', description: 'Fuel expense', credit: '$1,280.00', balance: '$46,120.00' },
      { date: '2024-07-13', reference: 'LG-303', description: 'Warehouse transfer', credit: '$6,200.00', balance: '$39,920.00' },
      { date: '2024-07-13', reference: 'LG-304', description: 'Inventory adjustment', debit: '$8,800.00', balance: '$48,720.00' },
    ],
  },
  {
    id: 4,
    slug: 'cash-book',
    name: 'Cash Book',
    type: 'Cash Book',
    status: 'Ready',
    period: 'April 2024',
    generatedAt: '2024-04-08',
    summary: 'Tracks cash received and cash paid out in the business.',
    overview: 'A view of daily cash movements.',
    summaryStats: [
      { label: 'Opening Balance', value: '$18,750', description: 'Start of period cash' },
      { label: 'Cash In', value: '$42,800', description: 'Money received' },
      { label: 'Cash Out', value: '$28,960', description: 'Money paid' },
    ],
    sections: [
      {
        title: 'Cash Activity',
        description: 'Latest cash book movements',
        items: [
          { label: 'Cash sales', value: '$18,000' },
          { label: 'Bank deposit', value: '$10,000' },
          { label: 'Supplier payment', value: '$8,200' },
        ],
      },
    ],
    rows: [
      { date: '2024-04-08', reference: 'CB-001', description: 'Cash sales', amount: '$18,000', balance: '$36,750' },
      { date: '2024-04-08', reference: 'CB-002', description: 'Supplier payment', amount: '$8,200', balance: '$28,550' },
      { date: '2024-04-08', reference: 'CB-003', description: 'Bank deposit', amount: '$10,000', balance: '$18,550' },
    ],
  },
  {
    id: 9,
    slug: 'cash-book-q2-2024',
    name: 'Cash Book',
    type: 'Cash Book',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-08',
    summary: 'Tracks cash received and cash paid out in the business.',
    overview: 'A view of daily cash movements for Q2.',
    summaryStats: [
      { label: 'Opening Balance', value: '$28,550', description: 'Start of period cash' },
      { label: 'Cash In', value: '$54,300', description: 'Money received' },
      { label: 'Cash Out', value: '$34,760', description: 'Money paid' },
    ],
    sections: [
      {
        title: 'Cash Activity',
        description: 'Latest cash book movements',
        items: [
          { label: 'Cash sales', value: '$20,000' },
          { label: 'Bank deposit', value: '$12,000' },
          { label: 'Supplier payment', value: '$9,500' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-08', reference: 'CB-101', description: 'Cash sales', amount: '$20,000', balance: '$48,550' },
      { date: '2024-07-08', reference: 'CB-102', description: 'Supplier payment', amount: '$9,500', balance: '$39,050' },
      { date: '2024-07-08', reference: 'CB-103', description: 'Bank deposit', amount: '$12,000', balance: '$27,050' },
    ],
  },
  {
    id: 5,
    slug: 'trial-balance',
    name: 'Trial Balance',
    type: 'Trial Balance',
    status: 'Processing',
    period: 'April 2024',
    generatedAt: '2024-04-07',
    summary: 'Summarizes all account balances to check that debits and credits are equal.',
    overview: 'A control report used before preparing statements.',
    summaryStats: [
      { label: 'Debit Total', value: '$245,000', description: 'All debit balances' },
      { label: 'Credit Total', value: '$245,000', description: 'All credit balances' },
      { label: 'Difference', value: '$0', description: 'Should be zero' },
    ],
    sections: [
      {
        title: 'Control Check',
        description: 'The report is balanced',
        items: [
          { label: 'Debits equal credits', value: 'Yes' },
          { label: 'Review status', value: 'Processing' },
        ],
      },
    ],
    rows: [
      { date: '2024-04-07', reference: 'TB-001', description: 'Cash', debit: '$42,000', credit: '-' },
      { date: '2024-04-07', reference: 'TB-002', description: 'Loans Payable', debit: '-', credit: '$55,000' },
      { date: '2024-04-07', reference: 'TB-003', description: 'Owner Equity', debit: '-', credit: '$111,500' },
    ],
  },
  {
    id: 10,
    slug: 'trial-balance-q2-2024',
    name: 'Trial Balance',
    type: 'Trial Balance',
    status: 'Ready',
    period: 'Q2 2024',
    generatedAt: '2024-07-07',
    summary: 'Summarizes all account balances to check that debits and credits are equal.',
    overview: 'A control report used before preparing statements.',
    summaryStats: [
      { label: 'Debit Total', value: '$278,000', description: 'All debit balances' },
      { label: 'Credit Total', value: '$278,000', description: 'All credit balances' },
      { label: 'Difference', value: '$0', description: 'Should be zero' },
    ],
    sections: [
      {
        title: 'Control Check',
        description: 'The report is balanced',
        items: [
          { label: 'Debits equal credits', value: 'Yes' },
          { label: 'Review status', value: 'Ready' },
        ],
      },
    ],
    rows: [
      { date: '2024-07-07', reference: 'TB-101', description: 'Cash', debit: '$52,000', credit: '-' },
      { date: '2024-07-07', reference: 'TB-102', description: 'Loans Payable', debit: '-', credit: '$60,000' },
      { date: '2024-07-07', reference: 'TB-103', description: 'Owner Equity', debit: '-', credit: '$129,000' },
    ],
  },
];

export const reportButtons = [
  { key: 'all', label: 'All Reports', icon: 'FileText', slug: 'all' },
  { key: 'balance-sheet', label: 'Balance Sheet', icon: 'Scale', slug: 'balance-sheet' },
  { key: 'income-statement', label: 'Income Statement', icon: 'BadgeCheck', slug: 'income-statement' },
  { key: 'journal', label: 'Journal', icon: 'BookText', slug: 'journal' },
  { key: 'ledger', label: 'Ledger', icon: 'BookOpen', slug: 'ledger' },
  { key: 'cash-book', label: 'Cash Book', icon: 'Wallet', slug: 'cash-book' },
] as const;

export const reportTypeIcons = {
  'Balance Sheet': 'Scale',
  'Income Statement': 'BadgeCheck',
  Journal: 'BookText',
  Ledger: 'BookOpen',
  'Cash Book': 'Wallet',
  'Trial Balance': 'CalendarClock',
} as const;

export const reportTypeToSlug = (type: ReportType) => {
  switch (type) {
    case 'Balance Sheet':
      return 'balance-sheet';
    case 'Income Statement':
      return 'income-statement';
    case 'Journal':
      return 'journal';
    case 'Ledger':
      return 'ledger';
    case 'Cash Book':
      return 'cash-book';
    case 'Trial Balance':
      return 'trial-balance';
  }
};

export const getReportById = (id: number) => reports.find((report) => report.id === id);
export const getReportBySlug = (slug: string) => reports.find((report) => report.slug === slug);

const reportBusinessMap: Record<number, string> = {
  1: 'Acme Holdings Ltd',
  2: 'Acme Holdings Ltd',
  3: 'Acme Holdings Ltd',
  4: 'Acme Holdings Ltd',
  5: 'Acme Holdings Ltd',
  6: 'Nexa Retail Group Ltd',
  7: 'Nexa Retail Group Ltd',
  8: 'Nexa Retail Group Ltd',
  9: 'Peak Foods Distributors',
  10: 'Peak Foods Distributors',
  11: 'Acme Holdings Ltd',
  12: 'Acme Holdings Ltd',
  13: 'Nexa Retail Group Ltd',
  14: 'Peak Foods Distributors',
};

export const getReportBusinessName = (id: number) => reportBusinessMap[id] ?? 'Acme Holdings Ltd';
