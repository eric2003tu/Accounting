export type ReportType = 'Balance Sheet' | 'Income Statement' | 'Journal' | 'Cash Book' | 'Trial Balance';

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
  { key: 'cash-book', label: 'Cash Book', icon: 'Wallet', slug: 'cash-book' },
] as const;

export const reportTypeIcons = {
  'Balance Sheet': 'Scale',
  'Income Statement': 'BadgeCheck',
  Journal: 'BookText',
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
};

export const getReportBusinessName = (id: number) => reportBusinessMap[id] ?? 'Acme Holdings Ltd';
