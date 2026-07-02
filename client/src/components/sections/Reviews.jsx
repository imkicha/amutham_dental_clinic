import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight } from '../ui/Icon.jsx';
import { API_BASE, GOOGLE_REVIEWS_URL } from '../../utils/clinic.js';

// Real Google reviews for Amutham Dental Care. Shown by default, and kept as a
// fallback if/when the live Places API isn't configured, so the section is never empty.
const fallbackReviews = [
  {
    name: 'Chandru S',
    rating: 5,
    text: "Absolutely love this dental clinic! I'm currently getting my teeth aligned here, and the experience has been amazing so far. Dr. Priyanka is super friendly, knowledgeable, and makes you feel completely at ease. The prices are very affordable, and the care you get is top-notch. If you're looking for a place to take care of your smile, this is it! Highly recommend to everyone!",
    relativeTime: '7 months ago',
    profilePhoto: null,
  },
  {
    name: 'Latha S',
    rating: 5,
    text: 'Amutham Dental Care Clinic is not just a dental hospital it is a place where patients are treated with care respect and kindness. The doctors are highly talented humble and dedicated to giving every patient a confident smile. Their patience gentle treatment and friendly approach make people feel comfortable and stressfree. The clinic stands as a symbol of trust quality and happiness for many families.',
    relativeTime: 'a month ago',
    profilePhoto: null,
  },
  {
    name: 'Saktheeswari S',
    rating: 5,
    text: 'Excellent service at Amutham Dental Care Clinic! Friendly and professional doctors, clean environment, and clear explanation of treatments. I was nervous at first, but they made me feel very comfortable. Smooth and painless experience with great results at a reasonable cost. Highly recommended!',
    relativeTime: 'a month ago',
    profilePhoto: null,
  },
  {
    name: 'Sethu raman',
    rating: 5,
    text: 'Doctor communication style romba nalla irundhuchu. Medical terms ellam simple ah explain pannanga. Adhanala treatment mela confidence vandhuduchu. Enakku irundha doubts ellathayum patiently clear pannanga. Treatment start panna munadi procedure pathi detail ah solli puriya vachanga. Doctor oda friendly approach nala bayam kuraindhuduchu. Treatment complete aana apramum proper care instructions kuduthanga. Overall very professional and satisfying experience.',
    relativeTime: '3 weeks ago',
    profilePhoto: null,
  },
  {
    name: 'Sk Sk',
    rating: 5,
    text: 'Broken tooth problem ku treatment edukka vandhen. Doctor quick ah solution kuduthanga. Result romba natural ah irundhuchu. Treatment smooth ah mudinjiduchu. Staff support super ah irundhuchu. Overall happy with the service.',
    relativeTime: '3 weeks ago',
    profilePhoto: null,
  },
];

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

// Branded "Happy Testimonial" image cards.
const photoTestimonials = [
  { src: '/image/testimonial-1.webp', name: 'Mr. Phupalan Packyam', treatment: 'Full Mouth Dental Care' },
];

export default function Reviews() {
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState({
    rating: 5.0,
    total: 322,
    reviews: fallbackReviews,
    live: false,
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/reviews`)
      .then((r) => r.json())
      .then((j) => {
        if (!active || !j || !j.ok || !Array.isArray(j.reviews) || j.reviews.length === 0) return;
        setData({
          rating: j.rating || 5.0,
          total: j.total || null,
          reviews: j.reviews,
          live: true,
        });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const { rating, total, reviews } = data;
  // Google text reviews + branded image testimonials share one carousel.
  const slides = [
    ...photoTestimonials.map((p) => ({ type: 'image', ...p })),
    ...reviews.map((r) => ({ type: 'text', ...r })),
  ];
  const count = slides.length;

  // Auto-advance the featured testimonial.
  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  const safeIndex = index % count;
  const current = slides[safeIndex];
  const go = (dir) => setIndex((i) => (i + dir + count) % count);

  // Touch swipe (mobile): drag left → next, drag right → previous.
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section className="section relative overflow-hidden bg-ink-950 text-white">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 text-brand-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            <Star className="h-3.5 w-3.5" /> Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-5 leading-[1.1]">
            Quietly trusted by{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              Madurai families.
            </span>
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-12 overflow-hidden touch-pan-y select-none"
          >
            {/* big quote watermark */}
            <span className="pointer-events-none absolute -top-6 left-6 text-[160px] leading-none font-display text-white/[0.06] select-none">
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {current.type === 'image' ? (
                  <button
                    type="button"
                    onClick={() => setPhoto(current)}
                    className="block w-full rounded-2xl overflow-hidden bg-white"
                    aria-label={`View testimonial from ${current.name}`}
                  >
                    <img
                      src={current.src}
                      alt={`Testimonial from ${current.name} — ${current.treatment}`}
                      className="w-full h-auto max-h-[62vh] object-contain"
                    />
                  </button>
                ) : (
                  <>
                    <div className="flex items-center gap-1 text-brand-500">
                      {[...Array(current.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5" />
                      ))}
                    </div>

                    <p className="mt-5 sm:mt-6 text-lg sm:text-2xl leading-relaxed text-white/90 font-medium">
                      &ldquo;{current.text}&rdquo;
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="p-[2px] rounded-full bg-gradient-to-tr from-brand-500 to-brand-300">
                        <div className="h-12 w-12 rounded-full bg-ink-900 grid place-items-center text-sm font-bold text-brand-400">
                          {initials(current.name) || 'G'}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{current.name}</div>
                        <div className="text-sm text-white/50">{current.relativeTime} · via Google</div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <p className="mt-4 text-center text-xs text-white/40 sm:hidden">← swipe to read more →</p>
          )}

          {/* controls */}
          {count > 1 && (
            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="h-10 w-10 grid place-items-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 transition"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === safeIndex ? 'w-6 bg-brand-500' : 'w-2 bg-white/25 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Next review"
                className="h-10 w-10 grid place-items-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 transition"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className="flex items-center gap-1 text-brand-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
            </span>
            <span className="font-bold text-white">{Number(rating).toFixed(1)}</span>
            from <span className="font-semibold">{total ? total.toLocaleString() : '322'}</span> Google reviews
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-brand-500 text-ink-900 font-semibold hover:bg-brand-400 transition"
          >
            See all Google reviews <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* image testimonial lightbox */}
      <AnimatePresence>
        {photo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhoto(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/90 backdrop-blur-sm p-4 sm:p-10 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={photo.src}
              alt={`Testimonial from ${photo.name}`}
              className="max-h-[85vh] max-w-full rounded-lg shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setPhoto(null)}
              aria-label="Close"
              className="absolute top-5 right-5 h-10 w-10 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 transition text-xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
