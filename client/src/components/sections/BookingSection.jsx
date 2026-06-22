import BookingForm from './BookingForm.jsx';
import { Check, Shield, Clock, Award } from '../ui/Icon.jsx';

const points = [
  { icon: <Clock />, title: 'Confirmed in 15 min', text: 'Our team WhatsApps and calls you within 15 minutes.' },
  { icon: <Shield />, title: 'No payment required', text: 'Pay only after consultation. Free transparent quote.' },
  { icon: <Award />, title: 'Specialists only', text: 'Every plan is reviewed by a relevant specialist.' },
  { icon: <Check />, title: 'EMI available', text: 'Easy 0%-interest EMI options for major treatments.' },
];

export default function BookingSection() {
  return (
    <section id="book" className="section bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <div className="container grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6">
          <span className="eyebrow">Book online</span>
          <h2 className="heading mt-4">Book your appointment in under 30 seconds.</h2>
          <p className="subheading mt-3">
            Skip the queue. Tell us when works for you and we'll lock in your slot — confirmation arrives on WhatsApp instantly.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <div key={p.title} className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">{p.icon}</div>
                <div>
                  <div className="font-semibold text-ink-900">{p.title}</div>
                  <div className="text-sm text-ink-500">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
