"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, MailCheck, RefreshCcw, ShieldCheck } from 'lucide-react';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 45;

function maskEmail(email: string) {
  const [localPart, domain = ''] = email.split('@');
  if (!localPart || !domain) {
    return email;
  }

  const visibleStart = localPart.slice(0, 2);
  const hidden = '*'.repeat(Math.max(localPart.length - 2, 2));
  return `${visibleStart}${hidden}@${domain}`;
}

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? 'erictuyishime574@gmail.com';

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackTone, setFeedbackTone] = useState<'idle' | 'error' | 'success'>('idle');
  const [resendCountdown, setResendCountdown] = useState(RESEND_COOLDOWN_SECONDS);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otpValue = useMemo(() => otpDigits.join(''), [otpDigits]);
  const isOtpComplete = otpValue.length === OTP_LENGTH && otpDigits.every((digit) => /^\d$/.test(digit));

  useEffect(() => {
    document.title = 'Verify OTP | Accounting';
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setResendCountdown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const updateDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    setFeedback('');
    setFeedbackTone('idle');

    if (value && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      focusInput(index - 1);
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) {
      return;
    }

    const nextDigits = Array(OTP_LENGTH)
      .fill('')
      .map((_, index) => pasted[index] ?? '');

    setOtpDigits(nextDigits);
    setFeedback('');
    setFeedbackTone('idle');
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isOtpComplete || isVerifying) {
      return;
    }

    setIsVerifying(true);
    setFeedback('');
    setFeedbackTone('idle');

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (otpValue === '123456') {
      setFeedback('OTP verified. Redirecting to your dashboard...');
      setFeedbackTone('success');
      localStorage.removeItem('pendingRegistration');
      router.push('/dashboard');
      return;
    }

    setIsVerifying(false);
    setFeedbackTone('error');
    setFeedback('Invalid OTP. Use 123456 for demo, or request a new code.');
  };

  const handleResend = async () => {
    if (resendCountdown > 0) {
      return;
    }

    setResendCountdown(RESEND_COOLDOWN_SECONDS);
    setOtpDigits(Array(OTP_LENGTH).fill(''));
    setFeedbackTone('success');
    setFeedback('A fresh OTP has been sent. For demo, use 123456.');
    focusInput(0);
  };

  return (
    <section className="h-full overflow-hidden bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-6">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="rounded-t-2xl border-b border-slate-200 bg-gradient-to-r from-green-50 via-white to-slate-50 px-6 py-6 sm:px-8">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to registration
          </Link>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
            <MailCheck className="h-4 w-4" />
            Email verification
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Verify your OTP</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Enter the 6-digit code sent to <span className="font-semibold text-slate-900">{maskEmail(email)}</span>.
          </p>
        </div>

        <div className="px-6 py-4 sm:px-8 sm:py-7">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">One-time passcode</label>
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => updateDigit(index, event.target.value.replace(/\D/g, ''))}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    aria-label={`OTP digit ${index + 1}`}
                    className="h-12 rounded-lg border border-slate-300 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 sm:h-14 sm:text-xl"
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">For demo, the valid code is 123456.</p>
            </div>

            {feedback && (
              <p
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                  feedbackTone === 'error'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : feedbackTone === 'success'
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              disabled={!isOtpComplete || isVerifying}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
            >
              <ShieldCheck className="h-4 w-4" />
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">Didn’t get the code?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCountdown > 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw className="h-4 w-4" />
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend OTP'}
            </button>
          </div>

          <p className="mt-5 text-sm text-slate-600">
            Entered the wrong email?{' '}
            <Link href="/get-started" className="font-semibold text-green-700 hover:text-green-800">
              Edit registration details
            </Link>
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
