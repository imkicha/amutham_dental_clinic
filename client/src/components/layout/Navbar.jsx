import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo.jsx';
import { Menu, X, Phone, WhatsApp } from '../ui/Icon.jsx';
import { CLINIC, telLink, waLink } from '../../utils/clinic';
import { services } from '../../data/services';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '#services', label: 'Services', dropdown: true },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setShowServices(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 glass shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) =>
            l.dropdown ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <button className="px-4 py-2 text-sm font-semibold text-ink-700 hover:text-brand-700 rounded-full">
                  Services
                </button>
                <AnimatePresence>
                  {showServices && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
                    >
                      <div className="w-[560px] grid grid-cols-2 gap-1 p-3 rounded-2xl border border-slate-100 bg-white shadow-soft">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="rounded-xl p-3 hover:bg-brand-50 transition"
                          >
                            <div className="text-sm font-semibold text-ink-900">{s.title}</div>
                            <div className="text-xs text-ink-500 mt-0.5">{s.short}</div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition ${
                    isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:text-brand-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a href={telLink()} className="btn-ghost h-10 px-4 text-xs">
            <Phone className="h-4 w-4" /> {CLINIC.phone}
          </a>
          <Link to="/book-appointment" className="btn-primary h-10 px-5 text-xs">
            Book Appointment
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 text-ink-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks
                .filter((l) => !l.dropdown)
                .map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              <div className="text-xs font-semibold text-ink-300 mt-2 px-3 uppercase tracking-wider">Services</div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="px-3 py-2 text-sm text-ink-700 rounded-xl hover:bg-brand-50"
                >
                  {s.title}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <a href={waLink()} className="btn-whatsapp h-11" target="_blank" rel="noreferrer">
                  <WhatsApp className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <Link to="/book-appointment" className="btn-primary h-11">
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
