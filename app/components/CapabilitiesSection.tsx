import { ArrowRight, BookOpenCheck, FileSpreadsheet, Layers3, Lock, Puzzle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const capabilities = [
   {
      title: 'Close Management',
      description: 'Keep month-end organized with a clear checklist, owner assignment, and status at each step.',
      points: ['Track pending tasks by entity', 'Assign ownership and due dates', 'Export close evidence quickly'],
      image: '/images/growth-dashboard.png',
      Icon: FileSpreadsheet,
   },
   {
      title: 'Security and Access',
      description: 'Set practical controls by team and role so people only see what they need to do their work.',
      points: ['Role-based views across teams', 'Approval routing with clear thresholds', 'Searchable activity history'],
      image: '/images/security-vault.png',
      Icon: Lock,
   },
   {
      title: 'Integrations',
      description: 'Connect bank feeds and business tools without losing transaction context in your ledger.',
      points: ['Map fields once and reuse rules', 'Catch duplicates before posting', 'Keep source links for audits'],
      image: '/images/bg2.jpg',
      Icon: Puzzle,
   },
   {
      title: 'Team Playbooks',
      description: 'Document process steps in the workflow so onboarding does not depend on tribal knowledge.',
      points: ['Standardize repeatable procedures', 'Add notes at the point of work', 'Reduce handoff mistakes'],
      image: '/images/team-workflow.png',
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

const executiveSignals = [
   { label: 'Close readiness', value: '98%' },
   { label: 'Policy coverage', value: '91%' },
   { label: 'Audit trail completeness', value: '99%' },
];

const CapabilitiesSection = () => {
   return (
      <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(22,163,74,0.08),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(15,23,42,0.05),transparent_35%)]" />
         <div className="pointer-events-none absolute right-[-10%] top-[-8rem] h-72 w-72 rounded-full bg-green-100/50 blur-3xl" />
         <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
               <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-800">
                  <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
                  Finance operations
               </p>
               <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  A premium finance suite for teams that need control, clarity, and speed
               </h2>
               <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                  Built for close, controls, and reporting. No fluff. Just the workflows teams need to move faster, stay accurate, and present a stronger financial narrative.
               </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
               <div className="grid gap-5 sm:grid-cols-2">
                  {capabilities.map((capability) => (
                     <article
                        key={capability.title}
                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
                     >
                        <div className="relative h-40 w-full">
                           <Image src={capability.image} alt={capability.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                           <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-slate-900 shadow-lg backdrop-blur">
                              <capability.Icon className="h-5 w-5" aria-hidden="true" />
                           </div>
                           <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-200">Finance workflow</p>
                              <h3 className="mt-1 text-xl font-semibold text-white">{capability.title}</h3>
                           </div>
                        </div>
                        <div className="p-6">
                           <p className="text-sm leading-7 text-slate-600">{capability.description}</p>
                           <ul className="mt-4 space-y-1.5">
                              {capability.points.map((point) => (
                                 <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                                    {point}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </article>
                  ))}
               </div>

               <aside className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-[0_18px_38px_rgba(15,23,42,0.26)]">
                     <div className="grid min-h-[17rem] gap-0 lg:grid-cols-[0.88fr_1.12fr]">
                        <div className="flex flex-col justify-between gap-5 p-6 text-white">
                           <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-300">How teams run it</p>
                              <h3 className="mt-3 text-2xl font-semibold leading-tight">One workspace from daily entries to month-end close</h3>
                              <p className="mt-3 text-sm leading-7 text-slate-200">
                                 Keep your books current during the month, then finish close with fewer surprises and cleaner audit trails.
                              </p>
                           </div>

                           <div className="grid gap-3">
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
                        </div>

                        <div className="relative min-h-[17rem]">
                           <Image src="/images/bg3.jpg" alt="Finance operations workspace" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 38vw" />
                           <div className="absolute inset-0 bg-gradient-to-l from-slate-950/10 via-slate-950/25 to-slate-950/60" />
                           <div className="absolute bottom-4 left-4 right-4 space-y-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                              <div className="flex items-center justify-between gap-3">
                                 <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-200">Executive signals</p>
                                    <p className="mt-1 text-sm text-slate-100">Clear performance markers for leadership reviews</p>
                                 </div>
                                 <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white">
                                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                                 </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                 {executiveSignals.map((signal) => (
                                    <div key={signal.label} className="rounded-xl bg-slate-950/45 px-3 py-2 text-center">
                                       <div className="text-base font-semibold text-white">{signal.value}</div>
                                       <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300">{signal.label}</div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                     <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                        <div className="relative h-36 w-full">
                           <Image src="/images/growth-dashboard.png" alt="Finance analytics dashboard" fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
                        </div>
                        <div className="p-4">
                           <p className="text-sm font-semibold text-slate-900">Leadership reporting</p>
                           <p className="mt-1 text-sm leading-6 text-slate-600">Translate daily activity into board-ready numbers without rebuilding reports each week.</p>
                        </div>
                     </div>

                     <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                        <div className="relative h-36 w-full">
                           <Image src="/images/security-vault.png" alt="Secure finance permissions" fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
                        </div>
                        <div className="p-4">
                           <p className="text-sm font-semibold text-slate-900">Policy and access</p>
                           <p className="mt-1 text-sm leading-6 text-slate-600">Keep approvals, audit evidence, and sensitive records behind the right level of control.</p>
                        </div>
                     </div>
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
