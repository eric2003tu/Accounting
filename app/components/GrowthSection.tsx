import { ArrowUpRight, BarChart3, CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
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

const growthStats = [
  { label: 'TOTAL PARTNERS', targetValue: 1340, suffix: '+' },
  { label: 'SUBSCRIBERS', targetValue: 8420, suffix: '+' },
  { label: 'ACTIVE USERS', targetValue: 24500, suffix: '+' },
  { label: 'COUNTRIES SERVED', targetValue: 120, suffix: '+' },
];

const GrowthSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(22,163,74,0.08),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(15,23,42,0.06),transparent_35%)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10  lg:mb-16">
          <HeroStatsCards stats={growthStats} variant="light" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Built to scale with you
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A modern finance workspace for teams that move fast
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Replace manual accounting busywork with intelligent workflows, real-time visibility, and dependable controls that make every financial decision faster and sharper.
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
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.10)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Operations snapshot</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Your finance flow, fully connected</h3>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {['Cash flow monitoring', 'Automated reconciliation', 'Custom stakeholder reports'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                  <ArrowUpRight className="h-4 w-4 text-green-600" aria-hidden="true" />
                </div>
              ))}
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

        <div className="relative mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Ready to simplify your accounting stack?</h3>
              <p className="mt-2 text-slate-600">Join teams improving accuracy, speed, and visibility in one unified platform.</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Get Started Today
            </button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">Visual workspace</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">See your finances in motion</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Real-time dashboards, streamlined workflows, and intuitive controls give your team the clarity they need to make faster decisions.
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
