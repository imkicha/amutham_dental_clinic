import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_KEYWORDS,
  abs,
} from '../../utils/seo';

/**
 * Reusable SEO head for every page. UI-agnostic — only emits <head> tags.
 *
 * <SEO title description keywords path image jsonLd noindex type />
 * - `path`     → canonical + og:url (absolute, built from SITE_URL)
 * - `jsonLd`   → a schema object OR an array of schema objects
 * - `type`     → og:type (website | article)
 */
export default function SEO({
  title,
  description,
  keywords,
  path = '/',
  image,
  jsonLd,
  noindex = false,
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Best Dental Clinic in Madurai`;
  const desc =
    description ||
    'Amutham Dental Care is one of the best dental clinics in Madurai — root canal, dental implants, braces, cosmetic and kids dentistry by Dr. Gokul Nivas.';
  const url = abs(path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords || DEFAULT_KEYWORDS} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />
      <meta name="author" content={SITE_NAME} />
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Madurai" />
      <meta name="geo.position" content="9.9287152;78.0955389" />
      <meta name="ICBM" content="9.9287152, 78.0955389" />

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
