import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from '../ui/Icon.jsx';

const items = [
  { id: 1, label: 'Severe staining → bright white', treatment: 'Whitening',
    before: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80' },
  { id: 2, label: 'Missing teeth → full smile', treatment: 'Implants',
    before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80' },
  { id: 3, label: 'Crooked teeth → perfect alignment', treatment: 'Aligners',
    before: 'https://images.unsplash.com/photo-1606811951341-1b7f3a52d3f0?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=800&q=80' },
  { id: 4, label: 'Chipped front → seamless veneer', treatment: 'Cosmetic',
    before: 'https://images.unsplash.com/photo-1559591935-c6c92c6e4ce6?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1581585051171-6f6b3c4f1a7d?auto=format&fit=crop&w=800&q=80' },
  { id: 5, label: 'Decayed molar → painless RCT', treatment: 'Root Canal',
    before: 'https://images.unsplash.com/photo-1559591937-37b2a1c7e9d5?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80' },
  { id: 6, label: 'Gummy smile → balanced line', treatment: 'Cosmetic',
    before: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=800&q=80' },
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

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.button
              key={it.id}
              type="button"
              onClick={() => setActive(it)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden text-left"
            >
              <div className="grid grid-cols-2 h-full">
                <img src={it.before} alt="Before" className="h-full w-full object-cover" loading="lazy" />
                <img src={it.after} alt="After" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <span className="absolute top-3 left-3 badge bg-white/90 text-ink-900">Before</span>
              <span className="absolute top-3 right-3 badge bg-brand-600 text-white">After</span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
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
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center">
                <X />
              </button>
              <div className="grid sm:grid-cols-2">
                <div className="relative">
                  <img src={active.before} alt="Before" className="w-full aspect-square object-cover" />
                  <span className="absolute top-3 left-3 badge bg-white text-ink-900">Before</span>
                </div>
                <div className="relative">
                  <img src={active.after} alt="After" className="w-full aspect-square object-cover" />
                  <span className="absolute top-3 left-3 badge bg-brand-600 text-white">After</span>
                </div>
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
