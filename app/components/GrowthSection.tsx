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
    title: 'Executive-grade financial insight',
    description:
      'Translate ledger activity into decision-ready dashboards that show cash position, margin movement, and growth pressure in one view.',
    image: '/images/growth-dashboard.png',
    Icon: BarChart3,
  },
  {
    title: 'Controlled, auditable access',
    description:
      'Protect sensitive financial data with permissioned access, traceable approvals, and a clear history of every key action.',
    image: '/images/security-vault.png',
    Icon: ShieldCheck,
  },
  {
    title: 'Faster close operations',
    description:
      'Automate repetitive work, reconcile faster, and keep the close moving with fewer handoffs and less rework.',
    image: '/images/team-workflow.png',
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
    detail: 'Classify inflows and outflows as they happen, with exception flags that call out unusual spikes before they become problems.',
    image: '/images/bg1.jpg',
    Icon: Clock3,
  },
  {
    phase: 'Weekly',
    title: 'Review margin and expense drift',
    detail: 'Surface category-level changes early so finance and operations can course-correct before the month closes.',
    image: '/images/bg2.jpg',
    Icon: TrendingUp,
  },
  {
    phase: 'Monthly',
    title: 'Close with audit-ready records',
    detail: 'Track approvals, reconciliation status, and variance notes in one shared command center that holds up under review.',
    image: '/images/bg3.jpg',
    Icon: Handshake,
  },
];

const deliverySignals = [
  { label: 'Reconciliation Coverage', value: '96%', width: 'w-[96%]' },
  { label: 'Invoice Match Rate', value: '94%', width: 'w-[94%]' },
  { label: 'Approval SLA Compliance', value: '98%', width: 'w-[98%]' },
];

const visualStories = [
  {
    title: 'Cash flow visibility',
    detail: 'Track inflows, outflows, and runway pressure with the clarity leaders need before each review.',
    image: '/images/growth-dashboard.png',
  },
  {
    title: 'Controls that stay audit-ready',
    detail: 'Protect sensitive records with layered permissions and traceable approvals that reduce back-and-forth.',
    image: '/images/security-vault.png',
  },
  {
    title: 'Team execution without guesswork',
    detail: 'Give operators a shared workflow view so handoffs, blockers, and next steps stay visible.',
    image: '/images/team-workflow.png',
  },
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
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70rem] -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 lg:mb-14">
          <HeroStatsCards stats={growthStats} variant="light" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.98fr_1.02fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Operating system for finance
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Built for teams that need speed, control, and a finance layer leaders can trust
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Replace fragmented tools with one finance workspace that keeps daily execution and executive reporting aligned. Every workflow is designed to reduce rework, strengthen confidence, and give leaders numbers they can actually act on.
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
                Start with a guided walkthrough
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-green-300 hover:text-green-700"
              >
                Talk to a specialist
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {visualStories.map((story) => (
                <article
                  key={story.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative h-28 w-full">
                    <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent" />
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{story.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{story.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">Operations snapshot</p>
                <h3 className="mt-2 text-2xl font-semibold">Execution quality this quarter</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Guided approvals, structured reconciliation, and a tighter close rhythm keep every finance motion visible.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-2">
                  {deliverySignals.map((signal) => (
                    <div key={signal.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                      <div className="text-lg font-semibold text-white">{signal.value}</div>
                      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300">{signal.label}</div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/10">
                        <div className={`h-1.5 rounded-full bg-green-400 ${signal.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
                <div className="grid h-full min-h-[16rem] grid-cols-[0.94fr_1.06fr] gap-0">
                  <div className="relative">
                    <Image
                      src="/images/bg1.jpg"
                      alt="Finance leadership dashboard"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/20 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-5 sm:p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Benchmark</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">Close faster without losing evidence</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Teams using guided approvals and auto-reconciliation close books on average <span className="font-semibold text-slate-900">9 days faster</span> than spreadsheet-first workflows.
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Cycle visibility</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">Every step traced from upload to final sign-off</p>
                      </div>
                      <div className="rounded-xl bg-green-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-700">Operational impact</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">Less follow-up, stronger controls, fewer surprises</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Clock3 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Close rhythm</p>
                    <p className="text-sm text-slate-600">Daily, weekly, and month-end checkpoints</p>
                  </div>
                </div>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Control layer</p>
                    <p className="text-sm text-slate-600">Permissioned access and approvals</p>
                  </div>
                </div>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Growth view</p>
                    <p className="text-sm text-slate-600">Signals that support planning and forecasting</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-green-200 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-44 w-full">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-slate-900 shadow-lg backdrop-blur">
                  <card.Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-200">Finance workflow</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{card.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-slate-600">{card.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-3">
          {operatingRhythm.map((item) => (
            <article
              key={item.phase}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.06)]"
            >
              <div className="relative h-36 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  <item.Icon className="h-3.5 w-3.5 text-green-300" aria-hidden="true" />
                  {item.phase}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-7 text-slate-600">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Turn finance into a strategic advantage</h3>
              <p className="mt-2 text-slate-600">Ship cleaner reporting cycles, shorten close, and give leaders trusted numbers before every decision.</p>
            </div>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              See the platform in action
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GrowthSection;
