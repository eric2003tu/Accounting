'use client';

import React from 'react';

interface SummaryCardProps {
  title: string;
  items: {
    label: string;
    value: string | number;
    color?: 'text-slate-900' | 'text-green-600' | 'text-red-600' | 'text-amber-600';
  }[];
  className?: string;
  footer?: string;
}

export default function SummaryCard({
  title,
  items,
  className = '',
  footer,
}: SummaryCardProps) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between pb-3 border-b border-slate-200 last:border-0 last:pb-0">
            <p className="text-sm text-slate-600">{item.label}</p>
            <p className={`text-base font-bold ${item.color || 'text-slate-900'}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {footer && <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">{footer}</p>}
    </div>
  );
}
