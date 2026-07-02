import { Link, useParams, Navigate } from 'react-router-dom';
import SEO from '../../components/layout/SEO.jsx';
import { ArrowRight, WhatsApp, Phone, Check } from '../../components/ui/Icon.jsx';
import { findPost, posts } from '../../data/blog';
import { services, findService } from '../../data/services';
import { CLINIC, waLink, telLink } from '../../utils/clinic';
import { articleSchema, breadcrumbSchema, faqSchema } from '../../utils/seo';

export default function BlogPost() {
  const { slug } = useParams();
  const post = findPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const path = `/blog/${post.slug}`;
  const related = (post.related || []).map(findService).filter(Boolean);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        path={path}
        type="article"
        jsonLd={[
          articleSchema({ title: post.title, description: post.metaDescription, path, datePublished: post.date }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path },
          ]),
          faqSchema(post.faqs),
        ]}
      />

      {/* header */}
      <section className="gradient-hero">
        <div className="container py-12 lg:py-16 max-w-3xl">
          <nav className="text-sm text-ink-400">
            <Link to="/" className="hover:text-brand-700">Home</Link> ·{' '}
            <Link to="/blog" className="hover:text-brand-700">Blog</Link>
          </nav>
          <div className="flex items-center gap-2 mt-4 text-[11px] font-semibold uppercase tracking-wider">
            <span className="badge bg-brand-100 text-ink-900">{post.category}</span>
            <span className="text-ink-400">{post.readTime} read</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tight mt-4 leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-ink-500">{post.excerpt}</p>
          <div className="mt-5 text-sm text-ink-400">By Dr. Gokul Nivas · Amutham Dental Care, Kalavasal, Madurai</div>
        </div>
      </section>

      <div className="container max-w-5xl py-12 lg:py-16 grid lg:grid-cols-3 gap-10">
        {/* article body */}
        <article className="lg:col-span-2">
          {post.sections.map((s, i) => (
            <section key={i} className={i > 0 ? 'mt-8' : ''}>
              {s.h2 && <h2 className="font-display font-bold text-2xl text-ink-900 mb-3">{s.h2}</h2>}
              {(s.body || []).map((para, j) => (
                <p key={j} className="text-ink-700 leading-relaxed mb-3">{para}</p>
              ))}
              {s.list && (
                <ul className="mt-2 space-y-2">
                  {s.list.map((li, k) => (
                    <li key={k} className="flex gap-3 text-ink-700">
                      <Check className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQ */}
          {post.faqs?.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display font-bold text-2xl text-ink-900 mb-4">Frequently asked questions</h2>
              <div className="space-y-3">
                {post.faqs.map((f, i) => (
                  <details key={i} className="card p-5 group">
                    <summary className="font-semibold text-ink-900 cursor-pointer list-none flex justify-between items-center">
                      {f.q}
                      <span className="text-brand-600 group-open:rotate-45 transition">+</span>
                    </summary>
                    <p className="text-sm text-ink-500 mt-3 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-3xl bg-ink-900 text-white p-8 text-center">
            <h2 className="font-display text-2xl font-extrabold">Book your appointment today</h2>
            <p className="mt-2 text-white/70">Amutham Dental Care, Kalavasal, Madurai · {CLINIC.phone}</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link to="/book-appointment" className="btn-yellow h-12 px-6 text-sm">Book Appointment <ArrowRight /></Link>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn-whatsapp h-12 px-6 text-sm">
                <WhatsApp className="h-5 w-5" /> WhatsApp
              </a>
              <a href={telLink()} className="btn-ghost h-12 px-6 text-sm text-white border-white/20 hover:bg-white/10">
                <Phone className="h-5 w-5" /> Call
              </a>
            </div>
          </div>
        </article>

        {/* sidebar: related services + posts */}
        <aside className="lg:col-span-1 space-y-8">
          {related.length > 0 && (
            <div className="card p-6">
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-700 mb-3">Related treatments</div>
              <ul className="space-y-2">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="flex items-center gap-2 text-sm text-ink-700 hover:text-brand-700">
                      <ArrowRight className="h-4 w-4 text-brand-600" /> {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/services" className="mt-4 inline-flex text-sm font-semibold text-brand-700">All services →</Link>
            </div>
          )}

          <div className="card p-6">
            <div className="text-xs uppercase tracking-wider font-semibold text-brand-700 mb-3">More articles</div>
            <ul className="space-y-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="text-sm text-ink-700 hover:text-brand-700 leading-snug block">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="mt-4 inline-flex text-sm font-semibold text-brand-700">View all articles →</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
