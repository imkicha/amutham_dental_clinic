import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '../ui/Icon.jsx';
import { services } from '../../data/services';

export default function ServicesGrid() {
  return (
    <section id="services" className="section bg-brand-50/50">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="eyebrow">Our services</span>
            <h2 className="heading mt-4">Premium dentistry, all under one roof.</h2>
            <p className="subheading mt-3">
              From routine cleaning to full-mouth rehabilitation — every procedure is performed with hospital-grade sterilisation.
            </p>
          </div>
          <Link to="/book-appointment" className="btn-primary h-11 px-5 self-start lg:self-auto">
            Book a consultation <ArrowRight />
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                to={`/services/${s.slug}`}
                className="card p-6 h-full block group hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center font-display font-extrabold`}>
                  {s.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <div className="font-display font-bold text-xl text-ink-900 mt-5">{s.title}</div>
                <div className="text-sm text-ink-500 mt-2 leading-relaxed">{s.short}</div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
