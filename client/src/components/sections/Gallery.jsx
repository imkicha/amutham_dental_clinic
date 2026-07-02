import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from '../ui/Icon.jsx';

// Real patient before/after cases (single composite images).
const items = [
  { id: 1, label: 'Full Mouth Implant Rehabilitation', treatment: 'Full Mouth Implants', src: '/before-after/full-mouth-implant-rehab.webp' },
  { id: 2, label: 'Full Mouth Implants', treatment: 'Implants', src: '/before-after/full-mouth-implants.webp' },
  { id: 3, label: 'Composite Smile Design', treatment: 'Cosmetic', src: '/before-after/composite-smile.webp' },
  { id: 4, label: 'Zirconia Crowns', treatment: 'Crowns', src: '/before-after/zirconia-crowns.webp' },
  { id: 5, label: 'Root Canal Treatment', treatment: 'Root Canal', src: '/before-after/root-canal.webp' },
  { id: 6, label: 'Stain Removal — Air Polishing', treatment: 'Cleaning', src: '/before-after/stain-removal.webp' },
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  return (
    <section className="section bg-brand-50/40">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Real transformations</span>
          <h2 className="heading mt-4">Before & after — results that speak.</h2>
          <p className="subheading mt-3 mx-auto">
            Real patients, real outcomes. Every photo here is shared with the patient's written consent.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {items.map((it, i) => (
            <motion.button
              key={it.id}
              type="button"
              onClick={() => setActive(it)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group card relative aspect-[4/3] overflow-hidden text-left bg-ink-100"
            >
              <img
                src={it.src}
                alt={`${it.label} — before and after`}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute top-3 left-3 badge bg-brand-600 text-white">Before / After</span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                <div className="text-white text-sm font-semibold">{it.label}</div>
                <div className="text-brand-200 text-xs">{it.treatment}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center">
                <X />
              </button>
              <div className="bg-ink-100 flex items-center justify-center max-h-[70vh]">
                <img src={active.src} alt={`${active.label} — before and after`} className="max-h-[70vh] w-full object-contain" />
              </div>
              <div className="p-5 sm:p-6 flex items-center justify-between gap-3">
                <div>
                  <div className="font-display font-bold text-lg text-ink-900">{active.label}</div>
                  <div className="text-sm text-ink-500">Treatment: {active.treatment}</div>
                </div>
                <a href="/book-appointment" className="btn-primary h-10 px-4 text-xs">
                  Book yours <ArrowRight />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
