import { motion } from 'framer-motion';
import { ArrowRight } from '../ui/Icon.jsx';

// ── CONFIG ─────────────────────────────────────────────────────────────
// 1) Set your Instagram profile URL:
export const INSTAGRAM_URL = 'https://www.instagram.com/amuthamdentalcare/';
export const INSTAGRAM_HANDLE = '@amuthamdentalcare';
// 2) Paste the widget iframe URL from SnapWidget / LightWidget here.
//    (From SnapWidget "Get Widget" → copy the src="..." value of the <iframe>.)
//    Leave '' to just show the Follow button until you have it.
const WIDGET_SRC = '';
// ───────────────────────────────────────────────────────────────────────

function IgIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
    </svg>
  );
}

export default function InstagramFeed() {
  return (
    <section id="instagram" className="section bg-white">
      <div className="container max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <IgIcon className="h-3.5 w-3.5" /> Instagram
          </span>
          <h2 className="heading mt-4">Follow us {INSTAGRAM_HANDLE}</h2>
          <p className="subheading mt-3 mx-auto">
            Smile transformations, patient stories and clinic life — every week on our Instagram.
          </p>
        </div>

        {WIDGET_SRC ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-3xl overflow-hidden border border-ink-100 shadow-soft"
          >
            <iframe
              src={WIDGET_SRC}
              title="Amutham Dental Care on Instagram"
              className="w-full"
              style={{ border: 0, minHeight: 620 }}
              scrolling="no"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-ink-200 bg-brand-50/40 p-10 text-center">
            <p className="text-ink-500">See our latest posts and reels on Instagram.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white font-semibold bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:opacity-90 transition"
          >
            <IgIcon className="h-5 w-5" /> Follow on Instagram <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
