import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WhatsApp, Star, Shield, Award, ArrowRight } from '../ui/Icon.jsx';
import { waLink, CLINIC } from '../../utils/clinic';

export default function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 tooth-pattern opacity-50 pointer-events-none" />
      <div className="container relative pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              10,000+ happy patients · 4.9★ rated
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-900 mt-5 leading-[1.05]"
          >
            A healthier smile is one{' '}
            <span className="relative inline-block">
              <span className="relative z-10">appointment</span>
              <span className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-brand-500/80 -z-0" />
            </span>{' '}
            away.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-5 text-ink-500 text-lg max-w-xl"
          >
            {CLINIC.tagline} — root canal, implants, braces, kids dentistry and emergency care.
            Now serving Madurai families with painless, premium dentistry under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link to="/book-appointment" className="btn-yellow h-12 px-6 text-sm">
              Book Appointment <ArrowRight />
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-12 px-6 text-sm">
              <WhatsApp className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-3 gap-3 sm:gap-5 max-w-md"
          >
            <Stat icon={<Award className="h-5 w-5 text-brand-600" />} value="15+" label="Years experience" />
            <Stat icon={<Shield className="h-5 w-5 text-brand-600" />} value="100%" label="Sterilised" />
            <Stat icon={<Star className="h-5 w-5 text-brand-500" />} value="4.9★" label="Patient rated" />
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-3xl bg-ink-900 shadow-soft" />
            <div className="absolute inset-3 rounded-[20px] overflow-hidden ring-4 ring-brand-500">
              <img
                alt="Modern dental clinic interior"
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80"
                loading="eager"
              />
            </div>

            <FloatingCard className="-left-4 top-8 hidden sm:flex">
              <div className="h-9 w-9 rounded-xl bg-brand-500 text-ink-900 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-ink-300 uppercase tracking-wider">Verified</div>
                <div className="text-sm font-semibold text-ink-900">Dental Council of India</div>
              </div>
            </FloatingCard>

            <FloatingCard className="-right-4 bottom-10 hidden sm:flex animate-floaty">
              <div className="flex -space-x-2">
                {['1027','1011','1005'].map((id) => (
                  <img key={id} className="h-8 w-8 rounded-full ring-2 ring-white object-cover" src={`https://i.pravatar.cc/64?img=${id}`} alt="" />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-brand-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3" />)}
                </div>
                <div className="text-[11px] text-ink-500">Trusted by 10,000+ families</div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl bg-white/85 glass border border-brand-100 p-3 sm:p-4">
      <div className="flex items-center gap-2">{icon}<span className="font-display font-extrabold text-lg text-ink-900">{value}</span></div>
      <div className="text-[11px] text-ink-500 mt-1 leading-tight">{label}</div>
    </div>
  );
}

function FloatingCard({ children, className = '' }) {
  return (
    <div className={`absolute z-10 flex items-center gap-3 rounded-2xl bg-white/95 shadow-soft border border-ink-100 px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}
