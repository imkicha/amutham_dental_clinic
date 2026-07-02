import { Link } from 'react-router-dom';
import SEO from '../../components/layout/SEO.jsx';
import ServicesGrid from '../../components/sections/ServicesGrid.jsx';
import { ArrowRight, WhatsApp } from '../../components/ui/Icon.jsx';
import { waLink } from '../../utils/clinic';
import { services } from '../../data/services';
import { breadcrumbSchema, abs } from '../../utils/seo';

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Dental Services at Amutham Dental Care, Madurai',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.title,
    url: abs(`/services/${s.slug}`),
  })),
};

export default function ServicesList() {
  return (
    <>
      <SEO
        title="Dental Services in Madurai"
        description="Explore all dental treatments at Amutham Dental Care, Kalavasal Madurai — root canal, dental implants, full mouth implants, braces, teeth whitening, cosmetic and kids dentistry. Book with Dr. Gokul Nivas."
        keywords="Dental services Madurai, Dental treatments Madurai, Dentist Madurai, Root canal Madurai, Dental implants Madurai"
        path="/services"
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          itemListSchema,
        ]}
      />

      <section className="gradient-hero">
        <div className="container py-14 lg:py-20 max-w-3xl text-center mx-auto">
          <span className="eyebrow">Our services</span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mt-4">
            Dental Services in <span className="text-brand-700">Madurai</span>
          </h1>
          <p className="mt-5 text-lg text-ink-500">
            Premium dentistry under one roof — from painless root canals to full-mouth implant
            rehabilitation. Every treatment is led by a specialist at Amutham Dental Care, Kalavasal.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link to="/book-appointment" className="btn-primary h-12 px-6 text-sm">
              Book Appointment <ArrowRight />
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-12 px-6 text-sm">
              <WhatsApp className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ServicesGrid />
    </>
  );
}
