import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import StickyWhatsApp from './components/layout/StickyWhatsApp.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ServicesList = lazy(() => import('./pages/services/ServicesList.jsx'));
const ServicePage = lazy(() => import('./pages/services/ServicePage.jsx'));
const BookAppointment = lazy(() => import('./pages/BookAppointment.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const BlogList = lazy(() => import('./pages/blog/BlogList.jsx'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<AdminLogin />} />
              </Routes>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<ServicesList />} />
                    <Route path="/services/:slug" element={<ServicePage />} />
                    <Route path="/book-appointment" element={<BookAppointment />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <StickyWhatsApp />
            </div>
          }
        />
      </Routes>
    </>
  );
}
