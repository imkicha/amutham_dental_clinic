import { useLocation } from 'react-router-dom';
import SEO from '../components/layout/SEO.jsx';
import BookingForm from '../components/sections/BookingForm.jsx';
import { Shield, Clock, Award, WhatsApp } from '../components/ui/Icon.jsx';
import { CLINIC, waLink, telLink } from '../utils/clinic';

export default function BookAppointment() {
  const { search } = useLocation();
  const defaultTreatment = new URLSearchParams(search).get('treatment') || '';

  return (
    <>
      <SEO title="Book Appointment" description="Book your dental appointment online in 30 seconds. WhatsApp confirmation within 15 minutes." />
      <section className="gradient-hero">
        <div className="container py-14 lg:py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="eyebrow">Online booking</span>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold mt-3">Book in 30 seconds. Confirmed in 15 minutes.</h1>
            <p className="text-ink-500 mt-4 text-lg">No payment now. Pay only after consultation.</p>

            <ul className="mt-7 space-y-4">
              <Point icon={<Clock />} title="Same-day slots usually available" text="If your slot isn't free, we'll offer the closest match." />
              <Point icon={<Shield />} title="Your details stay private" text="We never share or sell your phone number." />
              <Point icon={<Award />} title="Specialists only" text="Every plan reviewed by a specialist in that area." />
            </ul>

            <div className="mt-8 card p-5 bg-emerald-50 border-emerald-100">
              <div className="font-semibold text-emerald-700">Prefer WhatsApp?</div>
              <div className="text-sm text-emerald-700/80 mt-1">Tap below to message us directly.</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-10 px-4 text-xs">
                  <WhatsApp className="h-4 w-4" /> WhatsApp now
                </a>
                <a href={telLink()} className="btn-dark h-10 px-4 text-xs">Call {CLINIC.phone}</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <BookingForm defaultTreatment={defaultTreatment} />
          </div>
        </div>
      </section>
    </>
  );
}

function Point({ icon, title, text }) {
  return (
    <li className="flex gap-3">
      <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <div className="font-semibold text-ink-900">{title}</div>
        <div className="text-sm text-ink-500">{text}</div>
      </div>
    </li>
  );
}
