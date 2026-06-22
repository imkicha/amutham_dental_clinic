import { motion } from 'framer-motion';
import { Award, Users, Shield, Star, Check } from '../ui/Icon.jsx';
import { CLINIC } from '../../utils/clinic';

const doctors = [
  {
    name: 'Dr. Gokulnivas M',
    role: 'Chief Dentist · Founder',
    qualifications: `BDS, MDS — ${CLINIC.dci}`,
    experience: '15+ years',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    skills: ['Implants', 'Cosmetic', 'Family Dentistry'],
  },
  {
    name: 'Dr. Priya R',
    role: 'Orthodontist & Aligner Specialist',
    qualifications: 'BDS, MDS (Orthodontics), Invisalign Provider',
    experience: '10 years',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    skills: ['Invisalign®', 'Braces', 'Adult ortho'],
  },
  {
    name: 'Dr. Anand S',
    role: 'Endodontist & Pediatric Dentist',
    qualifications: 'BDS, MDS (Endodontics)',
    experience: '8 years',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    skills: ['Root canal', 'Kids dentistry', 'Microscopy'],
  },
];

const stats = [
  { value: '10,000+', label: 'Happy patients', icon: <Users className="h-5 w-5" /> },
  { value: '15+', label: 'Years of practice', icon: <Award className="h-5 w-5" /> },
  { value: '4.9★', label: 'Patient rating', icon: <Star className="h-5 w-5" /> },
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

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card overflow-hidden group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                <img src={d.img} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                <div className="absolute top-3 left-3 badge bg-brand-500 text-ink-900">
                  <Award className="h-3.5 w-3.5" /> {d.experience}
                </div>
              </div>
              <div className="p-5">
                <div className="font-display font-bold text-lg text-ink-900">{d.name}</div>
                <div className="text-xs font-semibold text-brand-700 uppercase tracking-wide mt-0.5">{d.role}</div>
                <div className="text-xs text-ink-500 mt-2">{d.qualifications}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.skills.map((s) => (
                    <span key={s} className="badge bg-brand-50 text-ink-900 border border-brand-200">
                      <Check className="h-3 w-3 text-brand-700" /> {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
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
