import { CLINIC, telLink, waLink } from '../../utils/clinic';
import { MapPin, Phone, Mail, Clock, WhatsApp } from '../ui/Icon.jsx';

export default function ContactSection() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`;
  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Visit us</span>
          <h2 className="heading mt-4">Find us in Kalavasal, Madurai.</h2>
          <p className="subheading mt-3 mx-auto">
            Right on the bypass road near Big Bazaar. Easy parking, walk-ins welcome during clinic hours.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-ink-100 shadow-soft min-h-[360px]">
            <iframe
              title="Clinic location"
              src={mapUrl}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="lg:col-span-5 grid gap-4 content-start">
            <InfoCard icon={<MapPin />} title="Address" lines={[CLINIC.address]} />
            <InfoCard icon={<Phone />} title="Phone & WhatsApp" lines={[
              <a key="ph1" href={telLink(CLINIC.phone)} className="hover:text-brand-700 block">{CLINIC.phone}</a>,
              <a key="ph2" href={telLink(CLINIC.phoneAlt)} className="hover:text-brand-700 block">{CLINIC.phoneAlt}</a>,
            ]} />
            <InfoCard icon={<Mail />} title="Email" lines={[
              <a key="em" href={`mailto:${CLINIC.email}`} className="hover:text-brand-700">{CLINIC.email}</a>
            ]} />
            <InfoCard icon={<Clock />} title="Working hours" lines={CLINIC.hours.map((h) => `${h.day} — ${h.time}`)} />
            <div className="flex gap-2">
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-11 flex-1">
                <WhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <a href={telLink()} className="btn-primary h-11 flex-1">
                <Phone className="h-4 w-4" /> Call now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, lines }) {
  return (
    <div className="card p-5 flex gap-4">
      <div className="h-11 w-11 rounded-xl bg-brand-500 text-ink-900 flex items-center justify-center shrink-0">{icon}</div>
      <div className="text-sm">
        <div className="text-xs uppercase tracking-wider font-semibold text-ink-400">{title}</div>
        {lines.map((l, i) => <div key={i} className="text-ink-900 mt-0.5">{l}</div>)}
      </div>
    </div>
  );
}
