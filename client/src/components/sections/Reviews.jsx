import { motion } from 'framer-motion';
import { Star } from '../ui/Icon.jsx';

const reviews = [
  {
    name: 'Sangeetha R.',
    rating: 5,
    text: 'Had a single-visit root canal and it was honestly painless. Dr. Karthik explained everything so clearly. The clinic feels more like a 5-star spa than a hospital.',
    treatment: 'Root Canal',
    avatar: 'https://i.pravatar.cc/96?img=47',
    when: '2 weeks ago',
  },
  {
    name: 'Arun Prakash',
    rating: 5,
    text: 'Got my implants done here after consulting 3 other clinics. The CT-guided process and warranty card sold me. 6 months in — feels just like a real tooth.',
    treatment: 'Dental Implants',
    avatar: 'https://i.pravatar.cc/96?img=12',
    when: '1 month ago',
  },
  {
    name: 'Meera & son',
    rating: 5,
    text: 'My 6 year old actually asked to come back for his next visit! The pediatric room and friendly staff made all the difference.',
    treatment: 'Pediatric Dentistry',
    avatar: 'https://i.pravatar.cc/96?img=32',
    when: '3 weeks ago',
  },
  {
    name: 'Vignesh Kumar',
    rating: 5,
    text: 'Invisalign treatment finished in 14 months — exactly as Dr. Priya predicted. The 3D smile preview helped me trust the process.',
    treatment: 'Invisalign',
    avatar: 'https://i.pravatar.cc/96?img=68',
    when: '2 months ago',
  },
  {
    name: 'Lakshmi N.',
    rating: 5,
    text: 'Emergency at 11 PM — they answered on the first ring and saw me within an hour. Pain gone in 30 minutes. Forever grateful.',
    treatment: 'Emergency',
    avatar: 'https://i.pravatar.cc/96?img=49',
    when: '5 days ago',
  },
  {
    name: 'Rahul S.',
    rating: 5,
    text: 'Veneers + whitening combo for my wedding. Photos came out unreal. Their digital smile design previewed exactly what I got.',
    treatment: 'Cosmetic',
    avatar: 'https://i.pravatar.cc/96?img=14',
    when: '1 month ago',
  },
];

export default function Reviews() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="eyebrow">
              <Star className="h-3.5 w-3.5 text-brand-500" /> Google reviews
            </span>
            <h2 className="heading mt-4">4.9 / 5 — and our patients tell the story.</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-brand-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5" />)}
            </div>
            <div className="text-sm text-ink-500">
              <span className="font-bold text-ink-900">4.9</span> from <span className="font-semibold">1,200+</span> reviews
            </div>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="card p-6 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-semibold text-ink-900 text-sm">{r.name}</div>
                  <div className="text-[11px] text-ink-300">{r.when} · via Google</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-brand-500">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
              </div>
              <p className="text-sm text-ink-500 mt-3 leading-relaxed flex-1">"{r.text}"</p>
              <div className="badge mt-4 bg-brand-50 text-brand-700 self-start">{r.treatment}</div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.google.com/search?q=Amutham+Dental+Clinic+reviews"
            target="_blank" rel="noreferrer"
            className="btn-ghost h-11 px-5"
          >
            See all Google reviews
          </a>
        </div>
      </div>
    </section>
  );
}
