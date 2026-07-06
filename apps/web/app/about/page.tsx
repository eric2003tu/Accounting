import { ArrowRight, BadgeCheck, Building2, Globe2, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const milestones = [
  {
    year: '2019',
    title: 'Company founded',
    detail: 'Started with a simple goal: make financial operations clear for growing businesses.',
  },
  {
    year: '2021',
    title: 'Automation engine launched',
    detail: 'Introduced smart workflows for reconciliation, reminders, and recurring financial tasks.',
  },
  {
    year: '2023',
    title: 'Global customer expansion',
    detail: 'Scaled support, onboarding, and compliance tooling for teams across multiple regions.',
  },
  {
    year: '2026',
    title: 'Unified finance platform',
    detail: 'Connected reporting, billing, and controls into one trusted workspace for modern teams.',
  },
];

const values = [
  {
    title: 'Clarity over complexity',
    description: 'We design every workflow to be intuitive, measurable, and decision-ready.',
    Icon: Sparkles,
  },
  {
    title: 'Security by default',
    description: 'From encryption to permissions, trust and data protection are built into every layer.',
    Icon: ShieldCheck,
  },
  {
    title: 'Outcomes that scale',
    description: 'Our platform evolves with your team, so systems stay strong as operations grow.',
    Icon: TrendingUp,
  },
];

const stats = [
  { label: 'Businesses supported', value: '8,400+' },
  { label: 'Countries served', value: '120+' },
  { label: 'Avg. reporting speed gain', value: '3.1x' },
  { label: 'Customer retention', value: '97%' },
];

const principles = [
  {
    title: 'Built for operators, not just analysts',
    detail: 'Finance teams need software that supports daily execution, not only monthly reporting.',
    Icon: Users,
  },
  {
    title: 'Designed for cross-team collaboration',
    detail: 'Founders, accountants, and operations leads work from one source of truth.',
    Icon: Building2,
  },
  {
    title: 'Ready for international growth',
    detail: 'Localized workflows and scalable controls support teams as they expand globally.',
    Icon: Globe2,
  },
];

export default function AboutPage() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
          <div className="relative min-h-[360px] sm:min-h-[420px]">
            <Image src="/images/bg1.jpg" alt="About accounting platform" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/65 to-slate-950/35" />
            <div className="relative flex min-h-[360px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-10 lg:max-w-4xl">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-green-300/40 bg-green-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-100">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                About accounting
              </p>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                We build modern finance infrastructure for teams that are ready to grow
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
                Our mission is to help businesses replace fragmented spreadsheets and manual accounting routines with a single platform that brings visibility, speed, and confidence to every financial decision.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
            >
              <p className="text-3xl font-bold tracking-tight text-slate-900">{item.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Our journey</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We have grown by solving real financial bottlenecks for real operating teams.
            </p>

            <div className="mt-6 space-y-4">
              {milestones.map((item) => (
                <div key={item.year} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">{item.year}</p>
                  <h3 className="mt-1 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">How we work</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Every product choice is guided by practical outcomes, team trust, and long-term reliability.
              </p>
            </div>

            <div className="space-y-4">
              {principles.map((item) => (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <item.Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_16px_34px_rgba(15,23,42,0.12)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <value.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Want to see how this works for your team?</h2>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Talk to our specialists and get a tailored walkthrough of workflows that match your business model.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Contact our team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
