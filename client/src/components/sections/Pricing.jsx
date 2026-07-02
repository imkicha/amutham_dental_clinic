import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '../ui/Icon.jsx';

// Each card maps to a valid booking treatment so "Book Now" prefills the form.
const plans = [
  {
    title: 'Teeth Cleaning',
    price: '₹1,200',
    unit: 'session',
    treatment: 'General Consultation',
    featured: true,
    rows: ['Professional Scaling', 'Grade 2 Cleaning: ₹1,300', 'Stain Removal: +₹300'],
  },
  {
    title: 'Root Canal',
    price: '₹3,200',
    unit: 'tooth',
    treatment: 'Root Canal Treatment',
    rows: ['X-Ray Included', 'Front Tooth: ₹3,200', 'Back Molar: ₹3,500'],
  },
  {
    title: 'Ceramic Crowns',
    from: true,
    price: '₹3,000',
    unit: 'unit',
    treatment: 'Cosmetic Dentistry',
    rows: ['Ceramic Crown: ₹3,000', 'Zirconia (5-yr warranty): ₹5,000', 'Zirconia (10-yr warranty): ₹7,000'],
  },
  {
    title: 'Dental Implants',
    from: true,
    price: '₹20,000',
    unit: 'implant',
    treatment: 'Dental Implants',
    rows: ['Titanium Implant: ₹20,000', 'Implant Crown Ceramic (5-yr): ₹5,000', 'Implant Crown Zirconia (10-yr): ₹7,000'],
  },
  {
    title: 'Full Mouth Implants',
    from: true,
    price: '₹2.5L',
    unit: 'package',
    treatment: 'Full Mouth Dental Implants',
    rows: ['Basic: ₹2.5 Lakh', 'Premium: ₹3 Lakh', 'Elite: ₹3.5 Lakh'],
  },
  {
    title: 'Teeth Filling',
    price: '₹900',
    unit: 'tooth',
    treatment: 'General Consultation',
    rows: ['GIC Filling: ₹900', 'Composite (Laser): ₹1,500', 'Temporary Filling: ₹500'],
  },
  {
    title: 'Orthodontic Braces',
    price: '₹25,000',
    unit: 'kit',
    treatment: 'Braces & Aligners',
    rows: ['Metal Braces: ₹25k', 'Ceramic Braces: ₹50k', 'Damon System: ₹60k'],
  },
  {
    title: 'Tooth Extraction',
    price: '₹1,000',
    unit: 'teeth',
    treatment: 'General Consultation',
    rows: ['Simple: ₹1,000', 'Wisdom Tooth: ₹2,500', 'Surgical: ₹5,000'],
  },
  {
    title: 'Invisalign / Aligners',
    from: true,
    price: '₹80k',
    unit: 'kit',
    treatment: 'Braces & Aligners',
    rows: ['Invisible Braces', 'No Wires / Metal', 'EMI Options Available'],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-brand-50/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Transparent pricing</span>
          <h2 className="heading mt-4">Treatment costs, upfront — no surprises.</h2>
          <p className="subheading mt-3 mx-auto">
            Indicative prices for our most-requested treatments. Final cost is confirmed after a
            quick clinical check. EMI available on major procedures.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
              className={`card p-0 overflow-hidden flex flex-col ${
                p.featured ? 'ring-2 ring-brand-500 shadow-gold' : ''
              }`}
            >
              {p.featured && (
                <div className="bg-brand-500 text-ink-900 text-[11px] font-bold uppercase tracking-wide text-center py-1.5">
                  Most booked
                </div>
              )}

              <div className="px-6 pt-6 pb-5 text-center">
                <div className="text-sm font-semibold uppercase tracking-wide text-ink-700">
                  {p.title}
                </div>
                <div className="mt-3 flex items-end justify-center gap-1">
                  {p.from && <span className="text-base font-semibold text-ink-400 mb-1">From</span>}
                  <span className="font-display font-extrabold text-3xl text-ink-900">{p.price}</span>
                  <span className="text-sm text-ink-400 mb-1">/ {p.unit}</span>
                </div>
              </div>

              <div className="border-t border-ink-100">
                {p.rows.map((row, idx) => (
                  <div
                    key={row}
                    className={`px-6 py-3 text-center text-sm text-ink-500 ${
                      idx % 2 === 0 ? 'bg-ink-100/50' : 'bg-white'
                    }`}
                  >
                    {row}
                  </div>
                ))}
              </div>

              <div className="p-5 mt-auto">
                <Link
                  to={`/book-appointment?treatment=${encodeURIComponent(p.treatment)}`}
                  className={`h-11 w-full ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link to="/pricing" className="btn-ghost h-11 px-5">
            View full price list <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-center text-xs text-ink-400">
            * Prices are indicative and may vary based on individual clinical needs.
          </p>
        </div>
      </div>
    </section>
  );
}
