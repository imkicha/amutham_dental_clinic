import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO.jsx';
import PriceList from '../components/sections/PriceList.jsx';
import { ArrowRight, WhatsApp } from '../components/ui/Icon.jsx';
import { waLink } from '../utils/clinic';
import { breadcrumbSchema } from '../utils/seo';

export default function Pricing() {
  return (
    <>
      <SEO
        title="Dental Treatment Price List in Madurai"
        description="Transparent dental treatment prices at Amutham Dental Care, Madurai — consultation, teeth cleaning, root canal (₹3,200), crowns, dental implants (from ₹20,000), full-mouth implants & braces. EMI available."
        keywords="Dental treatment cost Madurai, Root canal cost Madurai, Dental implant cost Madurai, Braces cost Madurai, Teeth cleaning price Madurai"
        path="/pricing"
        jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }])}
      />

      <section className="gradient-hero">
        <div className="container py-14 lg:py-20 max-w-3xl text-center mx-auto">
          <span className="eyebrow">Transparent &amp; affordable</span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mt-4">
            Dental Treatment <span className="text-brand-700">Price List</span>
          </h1>
          <p className="mt-5 text-lg text-ink-500">
            Honest, upfront pricing for every treatment — no hidden costs. Final cost may vary slightly
            based on the complexity of your case. EMI available for major orthodontic and implant treatments.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link to="/book-appointment" className="btn-primary h-12 px-6 text-sm">
              Book Appointment <ArrowRight />
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-12 px-6 text-sm">
              <WhatsApp className="h-5 w-5" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <PriceList showHeader={false} />

      <section className="section bg-ink-900 text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Not sure what you need?</h2>
          <p className="mt-3 text-white/70">
            Send us a message or book a consultation — we'll give you a clear, written estimate before any treatment begins.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link to="/book-appointment" className="btn-yellow h-12 px-6 text-sm">
              Book a consultation <ArrowRight />
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-12 px-6 text-sm">
              <WhatsApp className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
