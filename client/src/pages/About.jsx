import SEO from '../components/layout/SEO.jsx';
import Trust from '../components/sections/Trust.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Check } from '../components/ui/Icon.jsx';

const values = [
  { icon: <Shield />, title: 'Hospital-grade sterilisation', text: 'Class-B autoclaves, single-use kits, EPA-approved disinfection on every patient.' },
  { icon: <Award />, title: 'Specialists, not generalists', text: 'Every treatment is led by a specialist trained in that exact procedure.' },
  { icon: <Users />, title: 'Patient-first care', text: 'Clear pricing, no upselling. We treat what you need — not what we can sell.' },
];

export default function About() {
  return (
    <>
      <SEO title="About Us" description="20+ years of trusted dentistry in Chennai. Meet the doctors, see our values and the technology behind every smile." />
      <section className="gradient-hero">
        <div className="container py-16 lg:py-24 max-w-3xl">
          <span className="eyebrow">Our story</span>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight mt-4">
            20 years. 15,000 smiles. <span className="text-brand-700">One promise.</span>
          </h1>
          <p className="mt-5 text-lg text-ink-500">
            Amutham Dental Clinic was founded in 2004 with a simple belief — premium dental care should be painless, transparent and within reach. Today, three generations of families call us their dentist.
          </p>
          <div className="mt-7 flex gap-3">
            <Link to="/book-appointment" className="btn-primary h-12 px-6 text-sm">Book a consultation <ArrowRight /></Link>
            <Link to="/contact" className="btn-ghost h-12 px-6 text-sm">Visit our clinic</Link>
          </div>
        </div>
      </section>

      <Trust />

      <section className="section bg-brand-50/40">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Our values</span>
            <h2 className="heading mt-4">What sets us apart.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <div className="h-12 w-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">{v.icon}</div>
                <div className="font-display font-bold text-lg mt-4">{v.title}</div>
                <div className="text-sm text-ink-500 mt-2">{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80" alt="Clinic interior" className="rounded-3xl shadow-soft" />
          <div>
            <span className="eyebrow">Technology</span>
            <h2 className="heading mt-4">Tools usually found in dental schools — in your treatment chair.</h2>
            <ul className="mt-6 grid gap-3">
              {[
                'Digital intra-oral X-ray (1/10th the radiation)',
                '3D CBCT scanner for implant planning',
                'Operating microscope for endodontics',
                'Soft-tissue laser for painless gum work',
                'Intra-oral scanner — no goopy impressions',
                'Smile-design software with real-time preview',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-700">
                  <Check className="h-5 w-5 text-brand-600 mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
