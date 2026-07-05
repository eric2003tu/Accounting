import type { ReportDto } from '../types';
import { generateId } from '@/app/lib/mockData';

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_REPORTS: (ReportDto & { period?: string; period_label?: string; owner?: string; generated_by?: string; summaryStats?: { label: string; value: string; description: string }[] })[] = [
  { id: 1, business_id: 1, name: 'Balance Sheet', type: 'Balance Sheet', period: 'Jun 2026', period_label: 'Monthly', owner: 'Eric Tuyishime', generated_by: 'System', params: {}, result: { totals: { totalAssets: 250000, totalLiabilities: 80000, totalEquity: 170000 } }, summaryStats: [{ label: 'Assets', value: '$250,000', description: 'Total assets in the statement' }, { label: 'Liabilities', value: '$80,000', description: 'Total liabilities in the statement' }, { label: 'Equity', value: '$170,000', description: 'Total equity in the statement' }], created_at: '2026-06-30T00:00:00Z' },
  { id: 2, business_id: 1, name: 'Income Statement', type: 'Income Statement', period: 'Jun 2026', period_label: 'Monthly', owner: 'Eric Tuyishime', generated_by: 'System', params: {}, result: { totals: { revenue: 485000, costOfSales: 150000, operatingExpenses: 162000, netProfit: 86500 } }, summaryStats: [{ label: 'Revenue', value: '$485,000', description: 'Total income for the period' }, { label: 'Expenses', value: '$312,000', description: 'Total expenses for the period' }, { label: 'Net Profit', value: '$86,500', description: 'Income less expenses' }], created_at: '2026-06-30T00:00:00Z' },
  { id: 3, business_id: 1, name: 'Journal Entries', type: 'Journal', period: 'Jun 2026', period_label: 'Monthly', owner: 'Eric Tuyishime', generated_by: 'System', params: {}, result: { entries: [] }, summaryStats: [{ label: 'Entries', value: '5', description: 'Journal entries in the period' }, { label: 'Debits', value: '$68,400', description: 'Sum of debit entries' }, { label: 'Credits', value: '$68,400', description: 'Sum of credit entries' }], created_at: '2026-06-30T00:00:00Z' },
  { id: 4, business_id: 1, name: 'General Ledger', type: 'Ledger', period: 'Q2 2026', period_label: 'Quarterly', owner: 'Jean Claude Ishimwe', generated_by: 'Manager', params: {}, result: { accounts: [] }, summaryStats: [{ label: 'Entries', value: '24', description: 'Ledger lines in the report' }, { label: 'Sections', value: '6', description: 'Summary sections' }, { label: 'Status', value: 'Balanced', description: 'Ledger status' }], created_at: '2026-06-30T00:00:00Z' },
  { id: 5, business_id: 2, name: 'Cash Book', type: 'Cash Book', period: 'Jun 2026', period_label: 'Monthly', owner: 'Diane Mukamana', generated_by: 'Owner', params: {}, result: { transactions: [] }, summaryStats: [{ label: 'Opening Balance', value: '$18,750', description: 'Balance brought forward' }, { label: 'Receipts', value: '3', description: 'Incoming cash entries' }, { label: 'Payments', value: '3', description: 'Outgoing cash entries' }], created_at: '2026-06-30T00:00:00Z' },
  { id: 6, business_id: 2, name: 'Trial Balance', type: 'Trial Balance', period: 'Jun 2026', period_label: 'Monthly', owner: 'Eric Tuyishime', generated_by: 'System', params: {}, result: { totals: { totalDebit: 500000, totalCredit: 500000 } }, summaryStats: [{ label: 'Debit Total', value: '$500,000', description: 'Sum of debit balances' }, { label: 'Credit Total', value: '$500,000', description: 'Sum of credit balances' }, { label: 'Difference', value: '$0', description: 'Should be zero when balanced' }], created_at: '2026-06-30T00:00:00Z' },
];

export const reportsClient = {
  getAll: async (businessId?: string): Promise<ReportDto[]> => {
    await delay();
    if (!businessId) return MOCK_REPORTS;
    return MOCK_REPORTS.filter((r) => String(r.business_id) === businessId);
  },
  getById: async (id: string): Promise<ReportDto> => {
    await delay();
    const report = MOCK_REPORTS.find((r) => String(r.id) === id);
    if (!report) throw Object.assign(new Error('Report not found'), { status: 404 });
    return report;
  },
  create: async (payload: Record<string, any>): Promise<ReportDto> => {
    await delay();
    return { id: generateId(), ...payload, created_at: new Date().toISOString() } as ReportDto;
  },
  generateDaily: async (payload: Record<string, any>): Promise<any> => {
    await delay();
    return { success: true, message: 'Daily report generated' };
  },
};

export default reportsClient;
