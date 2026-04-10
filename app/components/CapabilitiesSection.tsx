import { ArrowRight, BookOpenCheck, FileSpreadsheet, Layers3, Lock, Puzzle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const capabilities = [
  {
    title: 'Close Management',
    description: 'Keep month-end organized with a clear checklist, owner assignment, and status at each step.',
    points: ['Track pending tasks by entity', 'Assign ownership and due dates', 'Export close evidence quickly'],
    Icon: FileSpreadsheet,
  },
  {
    title: 'Security and Access',
    description: 'Set practical controls by team and role so people only see what they need to do their work.',
    points: ['Role-based views across teams', 'Approval routing with clear thresholds', 'Searchable activity history'],
    Icon: Lock,
  },
  {
    title: 'Integrations',
    description: 'Connect bank feeds and business tools without losing transaction context in your ledger.',
    points: ['Map fields once and reuse rules', 'Catch duplicates before posting', 'Keep source links for audits'],
    Icon: Puzzle,
  },
  {
    title: 'Team Playbooks',
    description: 'Document process steps in the workflow so onboarding does not depend on tribal knowledge.',
    points: ['Standardize repeatable procedures', 'Add notes at the point of work', 'Reduce handoff mistakes'],
    Icon: BookOpenCheck,
  },
];

const operatingNotes = [
  {
    title: 'Controller view',
    detail: 'See what is blocked, what is late, and what needs approval before close.',
    Icon: ShieldCheck,
  },
  {
    title: 'Leadership view',
    detail: 'Review reporting confidence and period variance without waiting for manual updates.',
    Icon: Layers3,
  },
];

const CapabilitiesSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(22,163,74,0.08),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(15,23,42,0.05),transparent_35%)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-800">
            <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
            Capabilities
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Tools accountants actually use every day
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Built for close, controls, and reporting. No fluff. Just the workflows teams need to move faster and stay accurate.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors duration-300 group-hover:bg-green-600">
                  <capability.Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{capability.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{capability.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {capability.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_18px_38px_rgba(15,23,42,0.26)] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-300">How teams run it</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">One workspace from daily entries to month-end close</h3>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Keep your books current during the month, then finish close with fewer surprises and cleaner audit trails.
            </p>

            <div className="mt-6 space-y-3">
              {operatingNotes.map((note) => (
                <div key={note.title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <div className="flex items-center gap-2">
                    <note.Icon className="h-4 w-4 text-green-300" aria-hidden="true" />
                    <p className="text-sm font-semibold text-white">{note.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{note.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-green-400/30 bg-green-500/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-200">Implementation note</p>
              <p className="mt-1 text-sm leading-6 text-slate-100">
                Most teams start with close management and access controls first, then add integrations in phase two.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_38px_rgba(15,23,42,0.10)]">
          <div className="grid items-center lg:grid-cols-[1fr_1.1fr]">
            <div className="relative h-72 w-full lg:h-[410px]">
              <Image src="/images/bg3.jpg" alt="Accounting workflow interface" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/55 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Built for practical execution</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">A cleaner workflow for close, controls, and reporting</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Keep process steps visible, reduce handoff confusion, and give every stakeholder a clear view of what is done and what is pending.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
