// Central SEO configuration + JSON-LD schema builders for Amutham Dental Care.
// UI is untouched — this only feeds <head> tags and structured data.

export const SITE_URL = 'https://www.amuthamdentalcare.com';
export const SITE_NAME = 'Amutham Dental Care';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const TWITTER_HANDLE = '';

export const DEFAULT_KEYWORDS = [
  'Dentist in Madurai',
  'Dental Clinic Madurai',
  'Best Dentist Madurai',
  'Root Canal Treatment Madurai',
  'Dental Implants Madurai',
  'Full Mouth Dental Implants Madurai',
  'Braces Madurai',
  'Teeth Whitening Madurai',
  'Kids Dentist Madurai',
  'Emergency Dentist Madurai',
  'Cosmetic Dentistry Madurai',
  'Orthodontist Madurai',
].join(', ');

// Absolute URL for a path (canonical, sitemap, schema).
export const abs = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// ── Clinic NAP (name / address / phone) used across schema ───────────────
const CLINIC_NAP = {
  name: SITE_NAME,
  legalName: 'Amutham Dental Care — Full Mouth Implant Rehabilitation Centre',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  image: DEFAULT_OG_IMAGE,
  telephone: '+91 94454 11891',
  email: 'gokulnivas999@gmail.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No 75, Bypass Road, Near Big Bazaar, Kalavasal',
    addressLocality: 'Madurai',
    addressRegion: 'Tamil Nadu',
    postalCode: '625016',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 9.9287152, longitude: 78.0955389 },
  sameAs: [
    'https://www.instagram.com/dr_gokulnivas_implantologist/',
    'https://www.youtube.com/@AmuthamDentalCare',
    'https://www.google.com/maps?cid=15422977007656897352',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '18:00',
      closes: '21:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Madurai' },
    { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '322' },
};

// LocalBusiness + Dentist + MedicalBusiness rolled into one node (multi-type).
export const dentistSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
  '@id': `${SITE_URL}/#clinic`,
  ...CLINIC_NAP,
  medicalSpecialty: 'Dentistry',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 94454 11891',
    contactType: 'reservations',
    areaServed: 'IN',
    availableLanguage: ['English', 'Tamil'],
  },
});

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp`, width: 930, height: 929 },
  image: DEFAULT_OG_IMAGE,
  sameAs: CLINIC_NAP.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 94454 11891',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Tamil'],
  },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/services/{search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

export const webPageSchema = ({ path = '/', title, description }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name: title,
  description,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#clinic` },
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const serviceSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name,
  description,
  url: abs(path),
  provider: { '@id': `${SITE_URL}/#clinic` },
  areaServed: { '@type': 'City', name: 'Madurai' },
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
