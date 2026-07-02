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
import {
  dentistSchema,
  organizationSchema,
  websiteSchema,
  webPageSchema,
  faqSchema,
} from '../utils/seo';

const HOME_TITLE = 'Best Dental Clinic in Madurai';
const HOME_DESC =
  'Amutham Dental Care is one of the best dental clinics in Madurai & Kalavasal offering Root Canal Treatment, Dental Implants, Full Mouth Implants, Braces, Cosmetic Dentistry and Kids Dentistry by Dr. Gokul Nivas (MDS, Implantologist). Book: +91 94454 11891.';

const HOME_FAQS = [
  {
    q: 'Which is the best dental clinic in Madurai?',
    a: 'Amutham Dental Care in Kalavasal, Madurai is a leading dental clinic led by Dr. Gokul Nivas (MDS, Implantologist & Periodontologist), offering dental implants, root canal, braces, cosmetic and kids dentistry with a 5-star rating from 322+ patients.',
  },
  {
    q: 'Where is Amutham Dental Care located?',
    a: 'No 75, Bypass Road, Near Big Bazaar, Kalavasal, Madurai 625016, Tamil Nadu. Easy parking, walk-ins welcome during clinic hours.',
  },
  {
    q: 'What are the clinic timings?',
    a: 'Monday to Saturday, 6:00 PM to 9:00 PM. Sunday by appointment. Emergency care available on call.',
  },
  {
    q: 'How much does a dental implant cost in Madurai?',
    a: 'Single dental implants start at ₹20,000 and full-mouth fixed implant packages start from ₹2.5 lakh. The final cost is confirmed after a consultation and 3D CBCT scan.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'Call +91 94454 11891, message us on WhatsApp, or book online at amuthamdentalcare.com. You get a confirmation within minutes.',
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title={HOME_TITLE}
        description={HOME_DESC}
        keywords="Best Dental Clinic in Madurai, Best Dental Clinic in Kalavasal, Dentist in Kalavasal, Dentist Madurai, Dental Clinic Madurai, Best Dentist Madurai, Root Canal Madurai, Dental Implants Madurai, Kids Dentist Madurai"
        path="/"
        jsonLd={[
          dentistSchema(),
          organizationSchema(),
          websiteSchema(),
          webPageSchema({ path: '/', title: `${HOME_TITLE} | Amutham Dental Care`, description: HOME_DESC }),
          faqSchema(HOME_FAQS),
        ]}
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
