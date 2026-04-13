'use client';

import React from 'react';
import {
  BadgeCheck,
  Banknote,
  BarChart3,
  CircleDollarSign,
  Landmark,
  Scale,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import StatCard from './StatCard';

type ReportSummaryStat = {
  label: string;
  value: string;
  description: string;
};

type ReportSummaryStatsProps = {
  stats: ReportSummaryStat[];
};

const iconMap: Record<string, LucideIcon> = {
  Assets: Scale,
  Liabilities: Landmark,
  Equity: BarChart3,
  Revenue: TrendingUp,
  Expenses: Wallet,
  'Net Profit': CircleDollarSign,
  Entries: BadgeCheck,
  Debits: Banknote,
  Credits: Banknote,
  'Opening Balance': Wallet,
  'Cash In': TrendingUp,
  'Cash Out': Wallet,
  Difference: CircleDollarSign,
  'Debit Total': Banknote,
  'Credit Total': Banknote,
};

export default function ReportSummaryStats({ stats }: ReportSummaryStatsProps) {
  return (
    <>
      {stats.map((stat) => {
        const Icon = iconMap[stat.label] || BarChart3;

        return (
          <StatCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            description={stat.description}
            icon={Icon}
          />
        );
      })}
    </>
  );
}
