import { motion } from 'framer-motion';
import { Award, Users, Shield, Star, Check } from '../ui/Icon.jsx';
import { CLINIC } from '../../utils/clinic';

const doctors = [
  {
    name: 'Dr. Gokul Nivas',
    role: 'Chief Dentist · Founder',
    qualifications: 'MDS (Implantology) · MS Implantology — British Academy of Implants',
    img: '/image/Doctor1.webp',
    skills: ['Full Mouth Implantologist', 'Zygoma Implants', 'Full-Mouth Rehab'],
  },
  {
    name: 'Dr. Priyanka M',
    role: 'Periodontist & Pediatric Dentist',
    qualifications: 'MDS (Periodontics) · FAD (Pediatrics)',
    img: '/image/Doctor2.webp',
    skills: ["Children's Dentistry", 'Periodontics', 'Gum Care'],
  },
  {
    name: 'Dr. Madhumitha',
    role: 'Endodontist · Root Canal Specialist',
    qualifications: 'FAD (Endodontics)',
    img: '/image/Doctor3.webp',
    skills: ['Root Canal', 'Endodontics'],
  },
];

const stats = [
  { value: '10,000+', label: 'Happy patients', icon: <Users className="h-5 w-5" /> },
  { value: '15+', label: 'Years of practice', icon: <Award className="h-5 w-5" /> },
  { value: '5.0★', label: 'Patient rating', icon: <Star className="h-5 w-5" /> },
  { value: '100%', label: 'Sterilisation protocol', icon: <Shield className="h-5 w-5" /> },
];

export default function Trust() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Meet your dental team</span>
          <h2 className="heading mt-4">Care from specialists you can trust.</h2>
          <p className="subheading mt-3 mx-auto">
            Our doctors are members of the Dental Council of India. Every treatment plan is reviewed by a specialist before it begins.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 max-w-7xl mx-auto">
          {doctors.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-ink-100 shadow-soft hover:shadow-gold ring-1 ring-transparent hover:ring-brand-400/60 transition-shadow duration-500"
            >
              {/* portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-ink-100">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* gradient scrim — strong only at the bottom, keeps the face clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 from-0% via-ink-950/15 via-40% to-transparent to-70%" />

                {/* floating specialty badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-500 text-ink-900 px-3 py-1 text-[11px] font-bold shadow-soft">
                  <Award className="h-3.5 w-3.5" /> {d.skills[0]}
                </div>

                {/* name + role overlaid on photo */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display font-extrabold text-xl text-white drop-shadow-md leading-tight">{d.name}</h3>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-400 mt-1">{d.role}</div>
                </div>
              </div>

              {/* details — flex-1 so every card ends at the same height */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs text-ink-500 leading-relaxed">{d.qualifications}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.skills.map((s, j) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 + j * 0.07 }}
                      className="badge bg-brand-50 text-ink-900 border border-brand-200 transition-colors hover:bg-brand-500 hover:border-brand-500"
                    >
                      <Check className="h-3 w-3 text-brand-700" /> {s}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* sheen sweep on hover */}
              <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-60%] group-hover:translate-x-[420%] transition-transform duration-[1100ms] ease-out" />
            </motion.article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-ink-900 p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 chevron-pattern opacity-50 pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-500 text-ink-900 flex items-center justify-center">{s.icon}</div>
                <div>
                  <div className="font-display font-extrabold text-3xl text-brand-500">{s.value}</div>
                  <div className="text-sm text-white/80">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
