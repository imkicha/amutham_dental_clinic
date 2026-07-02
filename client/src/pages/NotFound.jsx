import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO.jsx';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" path="/404" noindex />
      <section className="min-h-[70vh] grid place-items-center text-center px-6">
        <div>
          <div className="font-display text-7xl font-extrabold text-brand-600">404</div>
          <h1 className="heading mt-3">We couldn't find that page.</h1>
          <p className="text-ink-500 mt-2 max-w-md mx-auto">The page may have moved — but our smiles haven't.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link to="/" className="btn-primary h-11 px-5">Go home</Link>
            <Link to="/book-appointment" className="btn-ghost h-11 px-5">Book appointment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
