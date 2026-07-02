import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import { services } from '../../data/services';
import { CLINIC, telLink, waLink, INSTAGRAM_URL } from '../../utils/clinic';
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
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-10 px-4 text-xs">
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
            <a href={telLink()} className="btn-yellow h-10 px-4 text-xs">
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="btn h-10 px-4 text-xs text-white bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
              </svg>
              Instagram
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
          <span>
            Developed by{' '}
            <a
              href="https://kishore.pokisham.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-500 hover:text-brand-400 underline-offset-2 hover:underline"
            >
              Kishore Nishaanth
            </a>{' '}
            · Software Developer ·{' '}
            <a href="tel:+918682821273" className="hover:text-brand-500">+91 86828 21273</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
