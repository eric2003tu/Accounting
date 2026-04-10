'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = '',
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-300 ${
        onClick
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]'
          : 'hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]'
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-100/70 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
            {trend && (
              <span
                className={`text-sm font-semibold ${
                  trend.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          )}
        </div>
        <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-3 text-green-700 shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
