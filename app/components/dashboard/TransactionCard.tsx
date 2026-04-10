'use client';

import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface TransactionCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  className?: string;
  onClick?: () => void;
}

export default function TransactionCard({
  icon: Icon,
  category,
  description,
  amount,
  date,
  type,
  className = '',
  onClick,
}: TransactionCardProps) {
  const isIncome = type === 'income';
  const bgColor = isIncome ? 'bg-emerald-50' : 'bg-slate-50';
  const textColor = isIncome ? 'text-emerald-600' : 'text-slate-700';
  const amountColor = isIncome ? 'text-emerald-600' : 'text-slate-900';
  const iconBgColor = isIncome
    ? 'bg-emerald-100 text-emerald-600'
    : 'bg-slate-100 text-slate-600';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 rounded-lg border border-slate-200 ${bgColor} p-4 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:scale-102' : ''
      } ${className}`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 rounded-lg p-3 ${iconBgColor}`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900">{category}</p>
          <span className={`text-xs font-medium ${textColor} bg-white/50 px-2 py-1 rounded`}>
            {type === 'income' ? '+' : '-'}
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">{description}</p>
      </div>

      {/* Amount and Date */}
      <div className="flex flex-col items-end gap-1">
        <p className={`text-base font-bold ${amountColor}`}>
          {isIncome ? '+' : '-'}${amount.toFixed(2)}
        </p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>

      {/* Chevron */}
      {onClick && (
        <div className="flex-shrink-0 text-slate-400">
          <ChevronRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
