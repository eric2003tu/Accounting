import { Clock3, Headphones, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';

const contactChannels = [
  {
    title: 'Sales Team',
    detail: 'sales@accounting.com',
    note: 'Product plans, demos, and pricing guidance.',
    Icon: Mail,
  },
  {
    title: 'Support Desk',
    detail: '+1 (800) 145-0097',
    note: 'Technical help for active accounts and onboarding.',
    Icon: Headphones,
  },
  {
    title: 'Live Chat',
    detail: 'Available in dashboard',
    note: 'Fast answers for everyday product questions.',
    Icon: MessageSquareText,
  },
];

const faqs = [
  {
    question: 'How quickly will I get a response?',
    answer: 'Most inquiries are answered within 2 business hours. Priority support requests are handled sooner.',
  },
  {
    question: 'Can I book a product walkthrough?',
    answer: 'Yes. Choose "Sales" in the form and our team will schedule a guided walkthrough for your workflow.',
  },
  {
    question: 'Do you support implementation?',
    answer: 'Absolutely. We provide onboarding support for setup, migration, and team training.',
  },
];

export default function ContactPage() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
            Contact us
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Let us help you run finance operations with confidence
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Whether you need pricing details, onboarding support, or technical guidance, our team is ready to help you move forward quickly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <article
              key={channel.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_16px_34px_rgba(15,23,42,0.12)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <channel.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{channel.title}</h2>
              <p className="mt-2 text-sm font-medium text-green-700">{channel.detail}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{channel.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <aside className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Business Hours</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">Our global support and customer success teams are available during these hours.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Clock3 className="mt-0.5 h-4 w-4 text-green-700" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Mon - Fri</p>
                  <p className="text-sm text-slate-600">8:00 AM - 6:00 PM (EST)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Phone className="mt-0.5 h-4 w-4 text-green-700" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Urgent Support</p>
                  <p className="text-sm text-slate-600">24/7 for enterprise accounts</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <MapPin className="mt-0.5 h-4 w-4 text-green-700" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Head Office</p>
                  <p className="text-sm text-slate-600">45 Ledger Street, New York, NY 10001</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">Frequently asked</h3>
              <div className="mt-3 space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">{faq.question}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Send us a message</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Share a few details about your request and we will connect you with the right specialist.
            </p>

            <form className="mt-6 grid gap-5 sm:grid-cols-2" action="#" method="post">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  placeholder="Jane"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-700">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  placeholder="Smith"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  placeholder="you@company.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="topic" className="mb-2 block text-sm font-medium text-slate-700">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  defaultValue="Sales"
                >
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Billing</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  placeholder="Tell us what you need help with..."
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
