const env = import.meta.env;

export const CLINIC = {
  name: env.VITE_CLINIC_NAME || 'Amutham Dental Care',
  tagline: env.VITE_CLINIC_TAGLINE || 'A Complete Family Dental Care',
  phone: env.VITE_CLINIC_PHONE || '+91 94454 11891',
  phoneAlt: env.VITE_CLINIC_PHONE_ALT || '+91 94431 95491',
  whatsapp: (env.VITE_CLINIC_WHATSAPP || '919445411891').replace(/[^0-9]/g, ''),
  email: env.VITE_CLINIC_EMAIL || 'care@amuthamdental.com',
  address: env.VITE_CLINIC_ADDRESS || 'No 75, Bypass Road, Near Big Bazaar, Kalavasal, Madurai 625016',
  mapQuery: env.VITE_CLINIC_MAP_QUERY || 'Amutham Dental Care Kalavasal Madurai',
  dci: env.VITE_CLINIC_DCI || 'DCI Reg No 27795',
  hours: [
    { day: 'Monday – Saturday', time: '6:00 PM — 9:00 PM' },
    { day: 'Sunday', time: 'Morning, by appointment' },
    { day: 'Emergency', time: '24 × 7 on call' },
  ],
};

export function waLink(text = 'Hello, I would like to book an appointment.') {
  return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telLink(number) {
  const n = (number || CLINIC.phone).replace(/\s/g, '');
  return `tel:${n}`;
}

export const API_BASE = env.VITE_API_URL || '/api';
