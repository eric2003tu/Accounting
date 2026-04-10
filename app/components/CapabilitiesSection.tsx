import { BookOpen, Layers3, Lock, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const capabilities = [
  {
    title: 'Automated Financial Close',
    description: 'Streamline month-end with smart workflows that reconcile, validate, and prepare reports automatically.',
    Icon: Zap,
  },
  {
    title: 'Multi-Layer Security',
    description: 'Enterprise-grade encryption, role-based access, and audit trails keep your financial data protected.',
    Icon: Lock,
  },
  {
    title: 'Flexible Integrations',
    description: 'Connect with your existing tech stack—banking platforms, payment processors, tax software, and more.',
    Icon: Layers3,
  },
  {
    title: 'Built-In Knowledge',
    description: 'Guided workflows and contextual help reduce onboarding time and support ticket volume.',
    Icon: BookOpen,
  },
];

const CapabilitiesSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-emerald-50 to-green-50 py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(34,197,94,0.12),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
            Powerful capabilities
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything your finance team expects from a modern platform
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Built with the complexity of real operations in mind, so you can focus on strategy instead of spreadsheets.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.10)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors duration-300 group-hover:bg-green-600">
                <capability.Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{capability.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{capability.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-[0_20px_50px_rgba(34,197,94,0.15)]">
          <div className="grid items-center gap-0 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative h-80 w-full lg:h-[450px]">
              <Image src="/images/bg3.jpg" alt="Platform capabilities in action" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">More than software</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">A complete solution for modern finance teams</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                From day-to-day operations to strategic planning, our platform scales with your business needs and brings your entire finance function into one cohesive workspace.
              </p>
              <ul className="mt-5 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Enterprise-grade security and compliance
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Seamless multi-team collaboration
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Built for continuous improvement
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-12 rounded-2xl border border-emerald-200 bg-white p-6 text-slate-900 shadow-[0_12px_32px_rgba(34,197,94,0.10)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ready to transform your finance operations?</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">See how we can help your team move faster</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Get a personalized walkthrough tailored to your business model and current workflows.
              </p>
            </div>
            <div className="flex flex-col items-center justify-end gap-3 pt-3 lg:pt-0">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
