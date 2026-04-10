import { BadgeCheck, Check, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    description: 'Great for solo founders and early teams managing day-to-day bookkeeping.',
    monthlyPrice: '$19',
    yearlyPrice: '$15',
    highlight: false,
    cta: 'Start Starter',
    features: [
      'Up to 2 team members',
      'Invoice and expense tracking',
      'Basic cash flow dashboard',
      'Monthly reporting exports',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    description: 'Designed for scaling businesses that need automation and deeper reporting.',
    monthlyPrice: '$49',
    yearlyPrice: '$39',
    highlight: true,
    cta: 'Choose Growth',
    features: [
      'Up to 10 team members',
      'Automated reconciliations',
      'Advanced financial insights',
      'Custom report templates',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For finance-heavy operations requiring governance, controls, and custom support.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    highlight: false,
    cta: 'Contact Sales',
    features: [
      'Unlimited team members',
      'Role-based access controls',
      'Compliance and audit tooling',
      'Dedicated onboarding specialist',
      '24/7 premium support',
    ],
  },
];

const comparisonRows = [
  { label: 'Team members', starter: '2', growth: '10', enterprise: 'Unlimited' },
  { label: 'Automated reconciliation', starter: 'Basic', growth: 'Advanced', enterprise: 'Advanced + custom rules' },
  { label: 'Custom reports', starter: 'Limited', growth: 'Included', enterprise: 'Included' },
  { label: 'Support level', starter: 'Email', growth: 'Priority', enterprise: '24/7 dedicated' },
  { label: 'Security and controls', starter: 'Standard', growth: 'Enhanced', enterprise: 'Enterprise-grade' },
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. You can upgrade or downgrade at any time, and billing is prorated automatically.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'All paid plans include a 14-day trial so you can evaluate workflows before committing.',
  },
  {
    question: 'Do you offer onboarding support?',
    answer: 'Yes. Growth and Enterprise plans include structured onboarding and implementation guidance.',
  },
];

export default function PricingPage() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Pricing plans
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Flexible pricing built for every stage of your finance journey
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Start simple, scale confidently, and choose the level of automation and support that matches your business growth.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            <BadgeCheck className="h-3.5 w-3.5 text-green-700" aria-hidden="true" />
            Annual plans save up to 20%
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-6 shadow-[0_10px_26px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(15,23,42,0.12)] ${
                plan.highlight
                  ? 'border-green-300 bg-gradient-to-b from-green-50 to-white'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{plan.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{plan.description}</p>
                </div>
                {plan.highlight && (
                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-end gap-2">
                <p className="text-4xl font-bold tracking-tight text-slate-900">{plan.monthlyPrice}</p>
                <p className="pb-1 text-sm text-slate-500">/month</p>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                {plan.yearlyPrice === 'Custom' ? 'Talk to sales for annual terms' : `${plan.yearlyPrice}/month billed annually`}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 text-green-700" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Enterprise' ? '/contact' : '/get-started'}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-slate-900 text-white hover:bg-green-600'
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-700" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-slate-900">Plan comparison</h2>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Feature</th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Starter</th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Growth</th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-200/80 last:border-b-0">
                    <td className="px-3 py-3 text-sm font-medium text-slate-900">{row.label}</td>
                    <td className="px-3 py-3 text-sm text-slate-600">{row.starter}</td>
                    <td className="px-3 py-3 text-sm text-slate-600">{row.growth}</td>
                    <td className="px-3 py-3 text-sm text-slate-600">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start gap-2">
                <HelpCircle className="mt-0.5 h-4 w-4 text-green-700" aria-hidden="true" />
                <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
