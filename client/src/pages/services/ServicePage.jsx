import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/layout/SEO.jsx';
import BookingForm from '../../components/sections/BookingForm.jsx';
import { findService, services } from '../../data/services';
import { Check, ArrowRight, WhatsApp, Phone } from '../../components/ui/Icon.jsx';
import { waLink, telLink, CLINIC } from '../../utils/clinic';

export default function ServicePage() {
  const { slug } = useParams();
  const svc = findService(slug);
  if (!svc) return <Navigate to="/" replace />;

  const otherServices = services.filter((s) => s.slug !== svc.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: svc.title,
    description: svc.description,
    procedureType: 'Dental',
    bodyLocation: 'Mouth',
    provider: { '@type': 'Dentist', name: CLINIC.name, telephone: CLINIC.phone },
  };

  return (
    <>
      <SEO
        title={svc.title}
        description={svc.short}
        path={`/services/${svc.slug}`}
        jsonLd={jsonLd}
      />

      <section className={`relative overflow-hidden bg-gradient-to-br ${svc.color}`}>
        <div className="absolute inset-0 tooth-pattern opacity-15 pointer-events-none" />
        <div className="container relative py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center text-white">
          <div className="lg:col-span-7">
            <Link to="/" className="text-sm text-white/80 hover:text-white">← All services</Link>
            <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight mt-3 leading-[1.05]">
              {svc.hero}
            </h1>
            <p className="mt-5 text-white/90 text-lg max-w-xl">{svc.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={`/book-appointment?treatment=${encodeURIComponent(svc.title)}`} className="btn h-12 px-6 bg-white text-brand-700 hover:bg-brand-50">
                Book {svc.title} <ArrowRight />
              </Link>
              <a href={waLink(`Hi, I would like to know more about ${svc.title}.`)} target="_blank" rel="noreferrer" className="btn-whatsapp h-12 px-6">
                <WhatsApp className="h-4 w-4" /> Ask on WhatsApp
              </a>
              <a href={telLink()} className="btn h-12 px-6 bg-white/10 text-white border border-white/20 hover:bg-white/20">
                <Phone className="h-4 w-4" /> Call now
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/15 backdrop-blur p-5 border border-white/20">
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-3">What's included</div>
              <ul className="space-y-2.5">
                {svc.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-white">
                    <Check className="h-5 w-5 shrink-0 text-white/90 mt-0.5" /> <span className="text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <span className="eyebrow">FAQ</span>
            <h2 className="heading mt-3">Things patients often ask.</h2>
            <div className="mt-8 divide-y divide-slate-100 border-t border-b border-slate-100">
              {svc.faqs.map((f, i) => <FAQItem key={i} {...f} />)}
            </div>

            <div className="mt-12">
              <span className="eyebrow">Treatment journey</span>
              <h3 className="heading text-2xl mt-3">A typical visit, step by step.</h3>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['Consult & 3D scan', 'A 30-minute consult, full scan, and a written plan with price.'],
                  ['Comfort dentistry', 'Local anaesthesia, music & noise-cancel headphones if you like.'],
                  ['Procedure', `Performed by our ${svc.title} specialist using the latest tech.`],
                  ['Follow-up & warranty', 'Free review visit + warranty on materials used.'],
                ].map(([t, d], i) => (
                  <li key={t} className="card p-5">
                    <div className="h-8 w-8 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center">{i + 1}</div>
                    <div className="mt-3 font-semibold text-ink-900">{t}</div>
                    <div className="text-sm text-ink-500 mt-1">{d}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <BookingForm defaultTreatment={svc.title} />
          </aside>
        </div>
      </section>

      <section className="section bg-brand-50/40">
        <div className="container">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="heading">Other treatments you might want</h2>
            <Link to="/" className="text-sm font-semibold text-brand-700">All services →</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {otherServices.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card p-5 hover:shadow-xl transition group">
                <div className="font-display font-bold text-lg text-ink-900">{s.title}</div>
                <div className="text-sm text-ink-500 mt-1">{s.short}</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 text-left">
        <span className="font-semibold text-ink-900">{q}</span>
        <span className={`h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center transition ${open ? 'bg-brand-600 text-white border-brand-600 rotate-45' : 'text-ink-500'}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-ink-500 text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
