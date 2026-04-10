import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Handshake,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HeroStatsCards from './HeroStatsCards';

const featureCards = [
  {
    title: 'Smart Financial Insights',
    description:
      'Turn raw accounting data into clear decisions with dashboards built for cash flow, profitability, and growth trends.',
    Icon: BarChart3,
  },
  {
    title: 'Secure And Reliable',
    description:
      'Bank-level encryption and role-based controls keep your numbers protected while your team collaborates with confidence.',
    Icon: ShieldCheck,
  },
  {
    title: 'Faster Daily Workflow',
    description:
      'Automate repetitive tasks, reconcile transactions quickly, and keep month-end close smooth from start to finish.',
    Icon: Zap,
  },
];

const trustMetrics = [
  { label: 'Automated Tasks', value: '92%' },
  { label: 'Close Time Reduced', value: '3.1x' },
  { label: 'Data Accuracy', value: '99.9%' },
];

const operatingRhythm = [
  {
    phase: 'Daily',
    title: 'Realtime cash movement tracking',
    detail: 'Classify inflows and outflows as they happen with exception flags for unusual spikes.',
    Icon: Clock3,
  },
  {
    phase: 'Weekly',
    title: 'Review margin and expense drift',
    detail: 'Surface category-level changes early so finance and operations can act before month-end.',
    Icon: TrendingUp,
  },
  {
    phase: 'Monthly',
    title: 'Close with audit-ready records',
    detail: 'Track approvals, reconciliation status, and variance notes in one shared command center.',
    Icon: Handshake,
  },
];

const deliverySignals = [
  { label: 'Reconciliation Coverage', value: '96%', width: 'w-[96%]' },
  { label: 'Invoice Match Rate', value: '94%', width: 'w-[94%]' },
  { label: 'Approval SLA Compliance', value: '98%', width: 'w-[98%]' },
];

const growthStats = [
  { label: 'TOTAL PARTNERS', targetValue: 1340, suffix: '+' },
  { label: 'SUBSCRIBERS', targetValue: 8420, suffix: '+' },
  { label: 'ACTIVE USERS', targetValue: 24500, suffix: '+' },
  { label: 'COUNTRIES SERVED', targetValue: 120, suffix: '+' },
];

const GrowthSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(22,163,74,0.09),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(15,23,42,0.07),transparent_35%)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 lg:mb-14">
          <HeroStatsCards stats={growthStats} variant="light" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Operating system for finance
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Built for teams that need speed without losing control
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Replace fragmented tools with one finance workspace that keeps daily execution and executive reporting aligned. Every workflow is designed to reduce rework, improve confidence, and accelerate decision quality.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                >
                  <div className="text-xl font-bold text-slate-900">{metric.value}</div>
                  <div className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              >
                Start with your workflow
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-green-300 hover:text-green-700"
              >
                Talk to a specialist
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.10)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Operations snapshot</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Execution quality this quarter</h3>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {deliverySignals.map((signal) => (
                <div key={signal.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{signal.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{signal.value}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                    <div className={`h-1.5 rounded-full bg-green-600 ${signal.width}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-green-100 bg-green-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-800">Benchmark</p>
              <p className="mt-1 text-sm leading-7 text-slate-700">
                Teams using guided approvals and auto-reconciliation close books on average <span className="font-semibold text-slate-900">9 days faster</span> than spreadsheet-first workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="group rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-green-200 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors duration-300 group-hover:bg-green-600">
                <card.Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-3">
          {operatingRhythm.map((item) => (
            <article
              key={item.phase}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_22px_rgba(15,23,42,0.06)]"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                <item.Icon className="h-3.5 w-3.5 text-green-700" aria-hidden="true" />
                {item.phase}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Turn finance into a strategic advantage</h3>
              <p className="mt-2 text-slate-600">Ship better reporting cycles, shorten close, and give leaders trusted numbers before every decision.</p>
            </div>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Get Started Today
            </Link>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">Visual workspace</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">See your finances in motion</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Live dashboards, workflow checkpoints, and transparent audit context make finance reviews faster for operators and clearer for leadership.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Live financial updates
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Automated reporting
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Team collaboration
                </li>
              </ul>
            </div>
            <div className="relative h-80 w-full lg:h-[420px]">
              <Image src="/images/bg1.jpg" alt="Finance dashboard interface" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
