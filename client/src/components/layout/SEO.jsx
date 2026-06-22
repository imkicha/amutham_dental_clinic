import { Helmet } from 'react-helmet-async';
import { CLINIC } from '../../utils/clinic';

export default function SEO({
  title,
  description,
  path = '/',
  image,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${CLINIC.name}` : `${CLINIC.name} — Premium Dental Care`;
  const desc = description || 'Book your appointment with Amutham Dental Clinic — premium dental care for the whole family.';
  const url = typeof window !== 'undefined' ? window.location.origin + path : path;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
