'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function QuickActionButton({
  icon: Icon,
  label,
  description,
  onClick,
  variant = 'secondary',
  className = '',
}: QuickActionButtonProps) {
  const bgColor =
    variant === 'primary'
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-slate-100 hover:bg-slate-200';
  const textColor = variant === 'primary' ? 'text-white' : 'text-slate-900';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-lg p-4 transition-all duration-200 ${bgColor} ${textColor} ${className}`}
    >
      <Icon className="h-6 w-6" />
      <div className="text-center">
        <p className="text-sm font-semibold">{label}</p>
        {description && <p className="text-xs opacity-75 mt-1">{description}</p>}
      </div>
    </button>
  );
}
