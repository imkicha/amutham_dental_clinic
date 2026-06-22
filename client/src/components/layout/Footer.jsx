import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import { services } from '../../data/services';
import { CLINIC, telLink, waLink } from '../../utils/clinic';
import { Phone, MapPin, Mail, WhatsApp } from '../ui/Icon.jsx';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200 mt-10 relative overflow-hidden">
      <div className="absolute inset-0 chevron-pattern opacity-30 pointer-events-none" />
      <div className="container relative py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="text-sm mt-4 leading-relaxed text-ink-300">
            {CLINIC.tagline} — root canal, implants, braces, kids dentistry and emergency care, right here in Kalavasal, Madurai.
          </p>
          <div className="mt-5 flex gap-2">
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-10 px-4 text-xs">
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
            <a href={telLink()} className="btn-yellow h-10 px-4 text-xs">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-brand-500 font-semibold mb-3">Services</div>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-brand-500">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-brand-500 font-semibold mb-3">Quick links</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-500">About</Link></li>
            <li><Link to="/book-appointment" className="hover:text-brand-500">Book Appointment</Link></li>
            <li><Link to="/contact" className="hover:text-brand-500">Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-brand-500 text-ink-500 text-xs">Clinic Admin</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-brand-500 font-semibold mb-3">Get in touch</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-brand-500 shrink-0" /> {CLINIC.address}</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 text-brand-500 shrink-0" />
              <span>
                <a href={telLink(CLINIC.phone)} className="hover:text-brand-500 block">{CLINIC.phone}</a>
                <a href={telLink(CLINIC.phoneAlt)} className="hover:text-brand-500 block">{CLINIC.phoneAlt}</a>
              </span>
            </li>
            <li className="flex gap-3"><Mail className="h-5 w-5 text-brand-500 shrink-0" /> <a href={`mailto:${CLINIC.email}`} className="hover:text-brand-500">{CLINIC.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 relative">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <span>© {new Date().getFullYear()} {CLINIC.name}. {CLINIC.dci}.</span>
          <span>Designed for healthier smiles.</span>
        </div>
      </div>
    </footer>
  );
}
