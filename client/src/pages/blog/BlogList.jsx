import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/layout/SEO.jsx';
import { ArrowRight } from '../../components/ui/Icon.jsx';
import { posts } from '../../data/blog';
import { breadcrumbSchema, abs } from '../../utils/seo';

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Amutham Dental Care Blog',
  description: 'Dental health tips, treatment guides and cost information for patients in Madurai & Kalavasal.',
  url: abs('/blog'),
  publisher: { '@id': 'https://www.amuthamdentalcare.com/#organization' },
};

export default function BlogList() {
  return (
    <>
      <SEO
        title="Dental Health Blog — Madurai"
        description="Dental tips, treatment guides and cost information for patients in Madurai & Kalavasal — implants, root canal, braces, whitening, kids dentistry and more."
        keywords="Dental blog Madurai, Dental tips Madurai, Dental treatment cost Madurai"
        path="/blog"
        jsonLd={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
          blogSchema,
        ]}
      />

      <section className="gradient-hero">
        <div className="container py-14 lg:py-20 max-w-3xl text-center mx-auto">
          <span className="eyebrow">Dental health blog</span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mt-4">
            Dental Tips & Guides for <span className="text-brand-700">Madurai</span>
          </h1>
          <p className="mt-5 text-lg text-ink-500">
            Clear, honest information on treatments, costs and dental care — written by the team at
            Amutham Dental Care, Kalavasal.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                className="card p-0 overflow-hidden flex flex-col hover:shadow-gold hover:-translate-y-1 transition"
              >
                <Link to={`/blog/${p.slug}`} className="flex flex-col h-full p-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                    <span className="badge bg-brand-50 text-brand-700 border border-brand-200">{p.category}</span>
                    <span className="text-ink-300">{p.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-lg text-ink-900 mt-4 leading-snug">{p.title}</h2>
                  <p className="text-sm text-ink-500 mt-2 leading-relaxed flex-1">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
