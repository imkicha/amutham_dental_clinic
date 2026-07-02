import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC } from '../../utils/clinic';

// Drop the seal logo at client/public/logo.png (or .webp) and it shows automatically.
// Until then, it falls back to the styled glyph so the header never breaks.
const LOGO_SRC = '/logo.webp';

export default function Logo({ light = false }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label={CLINIC.name}>
      {imgOk ? (
        <img
          src={LOGO_SRC}
          alt={CLINIC.name}
          onError={() => setImgOk(false)}
          className="h-12 w-12 rounded-full object-contain shadow-soft group-hover:scale-105 transition-transform"
        />
      ) : (
        <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-brand-500 shadow-soft group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M7 3.5C9 2 11 2.5 12 3.4c1-.9 3-1.4 5-0 2.5 1.8 2 6 1 9-.7 2-1 6-2 7s-1.5-2-2-4-1.5-2-2-2-1 0-2 2-1 5-2 4-1.3-5-2-7c-1-3-1.5-7.2 1-9z"/>
          </svg>
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-brand-500 border-2 border-white"/>
        </span>
      )}
      <span className="flex flex-col leading-tight">
        <span className={`font-display font-extrabold text-[16px] tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
          AMUTHAM DENTAL
        </span>
        <span className={`text-[10px] tracking-[0.22em] uppercase font-semibold ${light ? 'text-brand-400' : 'text-brand-700'}`}>
          A Complete Family Dental Care
        </span>
      </span>
    </Link>
  );
}
