import { motion } from 'framer-motion';
import { Check, Shield, Award, Star } from '../ui/Icon.jsx';

const ICONS = [Check, Shield, Award, Star];

const categories = [
  {
    title: 'General Dentistry',
    items: [
      { name: 'Professional Consultation', price: 'Free / ₹200' },
      { name: 'Teeth Cleaning (Scaling)', price: '₹1,200', note: 'Deep cleaning for Grade 2/3 stains: ₹1,300 – ₹1,500' },
      { name: 'Tooth Extraction (Simple)', price: '₹800 – ₹1,500' },
      { name: 'Wisdom Tooth Removal (Surgical)', price: '₹3,500 – ₹4,500' },
    ],
  },
  {
    title: 'Fillings & Root Canals',
    items: [
      { name: 'GIC Filling (White)', price: '₹900' },
      { name: 'Composite Light Cure Filling', price: '₹1,500' },
      { name: 'Root Canal Treatment (Anterior)', price: '₹3,200' },
      { name: 'Root Canal (Posterior / Molar)', price: '₹3,500', note: 'Includes X-Rays and consultation' },
    ],
  },
  {
    title: 'Crowns & Bridges',
    items: [
      { name: 'Ceramic Crown', price: '₹3,000 / unit' },
      { name: 'Zirconia Crown (5-year warranty)', price: '₹5,000 / unit' },
      { name: 'Zirconia Crown (10-year warranty)', price: '₹7,000 / unit' },
    ],
  },
  {
    title: 'Dental Implants',
    items: [
      { name: 'Dental Implant (Titanium)', price: '₹20,000', note: 'Brands: Nobel Biocare, Straumann, Osstem, Noris, AlphaBio, Bioline' },
      { name: 'Implant Crown — Ceramic (5-year warranty)', price: '₹5,000' },
      { name: 'Implant Crown — Zirconia (10-year warranty)', price: '₹7,000' },
    ],
  },
  {
    title: 'Full Mouth Implants',
    items: [
      { name: 'Basic Package', price: '₹2.5 Lakh' },
      { name: 'Premium Package', price: '₹3 Lakh' },
      { name: 'Elite Package', price: '₹3.5 Lakh' },
    ],
  },
  {
    title: 'Braces & Aligners',
    items: [
      { name: 'Metal Braces (Full Kit)', price: '₹25,000' },
      { name: 'Ceramic Braces', price: '₹50,000' },
      { name: 'Damon System', price: '₹60,000' },
      { name: 'Invisalign / Clear Aligners', price: 'From ₹80,000' },
    ],
  },
];

export default function PriceList({ showHeader = true }) {
  return (
    <section id="price-list" className="section bg-white">
      <div className="container max-w-7xl">
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Transparent &amp; affordable</span>
            <h2 className="heading mt-4">Dental treatment price list.</h2>
            <p className="subheading mt-3 mx-auto">
              Honest, upfront pricing. Final cost may vary slightly with the complexity of your case.
              EMI available on major treatments.
            </p>
          </div>
        )}

        <div className={`grid md:grid-cols-2 gap-6 ${showHeader ? 'mt-12' : ''}`}>
          {categories.map((cat, ci) => {
            const Icon = ICONS[ci % ICONS.length];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (ci % 2) * 0.08 }}
                className="card p-6 sm:p-7"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-ink-100">
                  <span className="h-10 w-10 rounded-xl bg-brand-500 text-ink-900 grid place-items-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display font-bold text-xl text-ink-900">{cat.title}</h3>
                </div>

                <ul className="divide-y divide-ink-100">
                  {cat.items.map((it) => (
                    <li key={it.name} className="py-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-ink-700">{it.name}</span>
                        <span className="text-sm font-extrabold text-ink-900 whitespace-nowrap">{it.price}</span>
                      </div>
                      {it.note && <p className="text-[11px] italic text-ink-400 mt-1">* {it.note}</p>}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ink-400 max-w-2xl mx-auto">
          <b className="text-ink-700">Note:</b> Prices are indicative and may vary based on individual diagnosis.
          EMI options available for expensive treatments.
        </p>
      </div>
    </section>
  );
}
