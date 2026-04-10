'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  title?: string;
  description?: string;
  data: DataPoint[];
  type?: 'bar' | 'pie' | 'line';
  height?: string;
  className?: string;
}

const chartColors = ['#22c55e', '#16a34a', '#10b981', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6'];

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: 12,
  color: '#fff',
  boxShadow: '0 14px 34px rgba(15, 23, 42, 0.24)',
};

function ChartShell({
  title,
  description,
  className,
  children,
}: {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)] sm:p-6 ${className || ''}`}>
      {(title || description) && (
        <div className="mb-5">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export default function SimpleChart({
  title,
  description,
  data,
  type = 'bar',
  className = '',
}: SimpleChartProps) {
  const chartData = data.map((point) => ({ name: point.label, value: point.value, color: point.color }));

  if (type === 'bar') {
    return (
      <ChartShell title={title} description={description} className={className}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                contentStyle={tooltipStyle}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={52}>
                {chartData.map((entry, idx) => (
                  <Cell key={entry.name} fill={entry.color || chartColors[idx % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartShell>
    );
  }

  if (type === 'line') {
    return (
      <ChartShell title={title} description={description} className={className}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartShell>
    );
  }

  return (
    <ChartShell title={title} description={description} className={className}>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="h-72 w-full xl:w-[58%]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={108}
                paddingAngle={4}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={entry.name} fill={entry.color || chartColors[idx % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [`$${Number(value).toLocaleString()}`, String(name)]}
              />
              <Legend verticalAlign="bottom" height={28} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 xl:w-[42%] xl:grid-cols-1">
          {chartData.map((item, index) => {
            const total = chartData.reduce((sum, current) => sum + current.value, 0);
            const share = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';

            return (
              <div key={item.name} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color || chartColors[index % chartColors.length] }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-500">${item.value.toLocaleString()} · {share}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ChartShell>
  );
}
