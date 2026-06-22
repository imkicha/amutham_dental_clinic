import SEO from '../components/layout/SEO.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import BookingForm from '../components/sections/BookingForm.jsx';

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact & Location" description="Visit Amutham Dental Clinic in Chennai. Call, WhatsApp or book online — confirmed in 15 minutes." />
      <section className="gradient-hero">
        <div className="container py-14 lg:py-20 max-w-3xl">
          <span className="eyebrow">Get in touch</span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold mt-3">We're here for your smile.</h1>
          <p className="text-ink-500 mt-3 text-lg">Reach us by phone, WhatsApp or just walk in. We're open until 9 PM.</p>
        </div>
      </section>
      <ContactSection />
      <section className="section bg-brand-50/40">
        <div className="container max-w-xl">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
