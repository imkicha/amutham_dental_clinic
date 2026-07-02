import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Check, Award, ArrowRight } from '../ui/Icon.jsx';

// All certificates / recognitions for Dr. Gokul Nivas.
const certs = [
  { src: '/image/certificate.webp', label: 'Most Trusted Doctor — Top 100 Doctors in India · 2024', short: 'Most Trusted Doctor — Top 100 in India' },
  { src: '/certificate/certificate3.webp', label: 'Best Implantologist in Madurai — India Medical Awards (IDA) · 2024', short: 'Best Implantologist in Madurai — IDA 2024' },
  { src: '/certificate/certificate1.webp', label: 'PG Certificate in Clinical Implantology — British Academy of Dental Implantology · 2023', short: 'Clinical Implantology — BADI, UK' },
  { src: '/certificate/certificate2.webp', label: 'Microscopic Periodontal Surgery — University of Siena, Italy · 2021', short: 'Microscopic Periodontal Surgery — Siena, Italy' },
  { src: '/certificate/certificate4.webp', label: 'Clinical Endodontics (Root Canal) — British Academy of Restorative Dentistry · 2022', short: 'Clinical Endodontics — BARD, UK' },
];

export default function AwardSection() {
  const count = certs.length;
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const go = (dir) => setIndex((i) => (i + dir + count) % count);

  // auto-advance the featured certificate (pauses while zoomed)
  useEffect(() => {
    if (zoom) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [zoom, count]);

  const current = certs[index];

  return (
    <section id="awards" className="section relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />

      <div className="container max-w-7xl relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 text-brand-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            <Award className="h-3.5 w-3.5" /> Award &amp; Recognition
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-5 leading-[1.1]">
            Internationally certified.{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              Nationally recognised.
            </span>
          </h2>

          <div className="flex items-center gap-1 mt-4 text-brand-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5" />)}
            <span className="ml-2 text-sm text-white/60">Top 100 Doctors in India · 2024</span>
          </div>

          <ul className="mt-7 space-y-3">
            {certs.map((c, i) => (
              <li key={c.src}>
                <button
                  onClick={() => setIndex(i)}
                  className={`w-full flex items-start gap-3 text-left rounded-xl px-3 py-2 transition ${
                    i === index ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`mt-0.5 h-6 w-6 shrink-0 grid place-items-center rounded-full ${
                    i === index ? 'bg-brand-500 text-ink-900' : 'bg-white/10 text-brand-400'
                  }`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className={`text-sm leading-snug ${i === index ? 'text-white font-semibold' : 'text-white/70'}`}>
                    {c.short}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <Link to="/book-appointment" className="btn-yellow h-12 px-6 text-sm mt-8 inline-flex">
            Book with a certified specialist <ArrowRight />
          </Link>
        </motion.div>

        {/* RIGHT — certificate viewer */}
        <div>
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-sm">
            <button
              onClick={() => setZoom(true)}
              className="group relative block w-full rounded-2xl overflow-hidden bg-white aspect-[4/3]"
              aria-label="View certificate full size"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={current.src}
                  alt={current.label}
                  className="absolute inset-0 h-full w-full object-contain p-3"
                />
              </AnimatePresence>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 text-white px-3 py-1.5 text-xs font-semibold backdrop-blur opacity-0 group-hover:opacity-100 transition">
                Zoom <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>

            {/* arrows */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-1 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-ink-900/60 text-white hover:bg-ink-900 transition"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-ink-900/60 text-white hover:bg-ink-900 transition"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-white/70 min-h-[2.5rem]">{current.label}</p>

          {/* thumbnail strip */}
          <div className="mt-3 flex gap-2 justify-center flex-wrap">
            {certs.map((c, i) => (
              <button
                key={c.src}
                onClick={() => setIndex(i)}
                aria-label={`Show ${c.short}`}
                className={`h-12 w-16 rounded-lg overflow-hidden bg-white ring-2 transition ${
                  i === index ? 'ring-brand-500' : 'ring-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={c.src} alt="" className="h-full w-full object-contain p-1" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* fullscreen zoom */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/95 backdrop-blur-sm p-4 sm:p-10 cursor-zoom-out"
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={current.src} alt={current.label} className="mx-auto max-h-[80vh] max-w-full rounded-lg shadow-2xl bg-white" />
              <p className="mt-4 text-center text-sm text-white/80">{current.label}</p>
            </div>
            <button
              onClick={() => setZoom(false)}
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
