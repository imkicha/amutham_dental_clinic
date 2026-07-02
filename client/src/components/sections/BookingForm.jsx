import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';
import { Check, ArrowRight, WhatsApp, Shield, Clock } from '../ui/Icon.jsx';
import { services } from '../../data/services';
import { waLink } from '../../utils/clinic';

const TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM',
];

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function BookingForm({ defaultTreatment, compact = false }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    treatment: defaultTreatment || '',
    preferredDate: tomorrow(),
    preferredTime: '11:00 AM',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (defaultTreatment) setForm((f) => ({ ...f, treatment: defaultTreatment }));
  }, [defaultTreatment]);

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    if (!form.name || !form.phone || !form.treatment) {
      toast.error('Please fill name, phone & treatment');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.post('/appointments', form);
      setDone(data);
      toast.success('Appointment received! Our team will contact you shortly.');
      // Note: we intentionally do NOT auto-open WhatsApp — the booking is saved
      // and appears in the admin dashboard. The success screen offers an
      // optional WhatsApp button if the patient wants to message us.
    } catch (err) {
      const msg = err?.response?.data?.error || 'Could not submit. Please call us directly.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className={`card p-8 text-center ${compact ? '' : 'max-w-lg mx-auto'}`}
      >
        <div className="h-14 w-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="heading text-2xl mt-4">You're booked in.</h3>
        <p className="text-ink-500 mt-2 text-sm">
          We've received your request for <b>{form.treatment}</b> on <b>{form.preferredDate}</b> at <b>{form.preferredTime}</b>.
          Our team will call & WhatsApp you within 15 minutes to confirm.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row justify-center gap-2">
          <a href={waLink('Hi, I just booked an appointment. Reference: ' + (done.appointment?.id || ''))} target="_blank" rel="noreferrer" className="btn-whatsapp h-11 px-5">
            <WhatsApp className="h-4 w-4" /> Chat now
          </a>
          <button onClick={() => { setDone(null); setForm({ ...form, name: '', phone: '', message: '' }); }} className="btn-ghost h-11 px-5">
            Book another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`card p-6 sm:p-8 ${compact ? '' : 'shadow-xl'}`}>
      {!compact && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
            <Shield className="h-4 w-4" /> Your details stay private
            <span className="mx-2 text-slate-300">·</span>
            <Clock className="h-4 w-4" /> Confirmed within 15 min
          </div>
          <h3 className="font-display text-2xl font-extrabold text-ink-900 mt-3">Book your appointment</h3>
          <p className="text-sm text-ink-500 mt-1">No payment now. We will WhatsApp you a confirmation immediately.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Full name *</label>
          <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Priya Sharma" required />
        </div>
        <div>
          <label className="label">Phone (WhatsApp) *</label>
          <input className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="10-digit mobile" inputMode="tel" required />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Email (optional)</label>
          <input className="input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Treatment *</label>
          <select className="input" value={form.treatment} onChange={(e) => update('treatment', e.target.value)} required>
            <option value="">Select a treatment</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="General Consultation">General Consultation</option>
          </select>
        </div>
        <div>
          <label className="label">Preferred date *</label>
          <input
            type="date" className="input"
            min={new Date().toISOString().slice(0, 10)}
            value={form.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Preferred time *</label>
          <select className="input" value={form.preferredTime} onChange={(e) => update('preferredTime', e.target.value)} required>
            {TIMES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Message (optional)</label>
          <textarea className="input min-h-[90px]" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your concern..." />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary h-12 w-full mt-6 text-sm disabled:opacity-60">
        {submitting ? 'Booking...' : <>Confirm Appointment <ArrowRight /></>}
      </button>

      <p className="text-[11px] text-ink-300 text-center mt-3">
        By submitting, you agree to be contacted by the clinic on WhatsApp & phone.
      </p>
    </form>
  );
}
