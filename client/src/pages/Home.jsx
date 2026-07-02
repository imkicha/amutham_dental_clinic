import SEO from '../components/layout/SEO.jsx';
import Hero from '../components/sections/Hero.jsx';
import Trust from '../components/sections/Trust.jsx';
import AwardSection from '../components/sections/AwardSection.jsx';
import ServicesGrid from '../components/sections/ServicesGrid.jsx';
import Pricing from '../components/sections/Pricing.jsx';
import Reviews from '../components/sections/Reviews.jsx';
import Gallery from '../components/sections/Gallery.jsx';
import Shorts from '../components/sections/Shorts.jsx';
import BookingSection from '../components/sections/BookingSection.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import { CLINIC } from '../utils/clinic';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINIC.name,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC.address,
      addressLocality: 'Madurai',
      addressRegion: 'Tamil Nadu',
      postalCode: '625016',
      addressCountry: 'IN',
    },
    telephone: CLINIC.phone,
    email: CLINIC.email,
    priceRange: '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '18:00', closes: '21:00' },
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '322' },
  };
  return (
    <>
      <SEO
        title="A Complete Family Dental Care, Madurai"
        description="Painless root canal, implants, braces, whitening & emergency dentistry in Kalavasal Madurai. Book in 30 seconds — WhatsApp confirmation in 15 min."
        jsonLd={jsonLd}
      />
      <Hero />
      <Trust />
      <Pricing />
      <ServicesGrid />
      <Gallery />
      <Shorts />
      <Reviews />
      <AwardSection />
      <BookingSection />
      <ContactSection />
    </>
  );
}
