'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({
  isOpen,
  title = 'Delete item',
  message,
  confirmLabel = 'Delete',
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/45"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.22)] sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-red-100 p-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-600">{message}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
