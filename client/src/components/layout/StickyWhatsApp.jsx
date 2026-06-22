import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WhatsApp } from '../ui/Icon.jsx';
import { waLink } from '../../utils/clinic';

export default function StickyWhatsApp() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  return (
    <motion.a
      href={waLink('Hello! I would like to book an appointment at Amutham Dental Clinic.')}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 18 }}
      className="fixed bottom-5 right-5 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
      <span className="relative flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white pl-4 pr-5 py-3 shadow-xl shadow-emerald-500/30 transition">
        <WhatsApp className="h-6 w-6" />
        <span className="hidden sm:inline font-semibold text-sm whitespace-nowrap">Chat on WhatsApp</span>
      </span>
    </motion.a>
  );
}
