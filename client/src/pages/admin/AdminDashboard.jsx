import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../utils/api';
import { API_BASE, waLink } from '../../utils/clinic';
import Logo from '../../components/ui/Logo.jsx';
import { WhatsApp, Phone, Mail, Users, Award, Clock, Check, X } from '../../components/ui/Icon.jsx';

const STATUSES = ['all', 'new', 'confirmed', 'completed', 'cancelled'];

// Safely read the stored admin — tolerates missing / "undefined" / corrupt values.
function readStoredAdmin() {
  const raw = localStorage.getItem('adc_admin');
  if (!raw || raw === 'undefined' || raw === 'null') return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem('adc_admin');
    return null;
  }
}

const statusStyle = {
  new: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-slate-100 text-slate-700',
  cancelled: 'bg-rose-100 text-rose-700',
};

export default function AdminDashboard() {
  const nav = useNavigate();
  const admin = readStoredAdmin();
  const [filters, setFilters] = useState({ q: '', status: 'all', from: '', to: '', page: 1, limit: 20 });
  const [data, setData] = useState({ items: [], total: 0, stats: {} });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/appointments', { params: filters });
      // Normalise — never let a malformed/HTML response crash the render.
      if (!data || typeof data !== 'object' || !Array.isArray(data.items)) {
        throw new Error('Unexpected response from the server (is the API reachable?)');
      }
      setData({ items: data.items, total: data.total || 0, stats: data.stats || {} });
    } catch (err) {
      setData({ items: [], total: 0, stats: {} });
      toast.error(err?.response?.data?.error || err.message || 'Could not load');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!localStorage.getItem('adc_admin_token')) nav('/admin/login');
  }, [nav]);

  function logout() {
    localStorage.removeItem('adc_admin_token');
    localStorage.removeItem('adc_admin');
    nav('/admin/login');
  }

  async function updateStatus(id, status) {
    try {
      const { data: appt } = await api.patch(`/admin/appointments/${id}`, { status });
      toast.success(`Marked ${status}`);
      setData((d) => ({ ...d, items: d.items.map((it) => (it._id === id ? appt : it)) }));
      if (selected?._id === id) setSelected(appt);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Update failed');
    }
  }

  async function deleteAppointment(id) {
    if (!confirm('Delete this appointment? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/appointments/${id}`);
      toast.success('Deleted');
      setData((d) => ({ ...d, items: d.items.filter((it) => it._id !== id) }));
      setSelected(null);
    } catch (err) {
      toast.error('Delete failed');
    }
  }

  function exportCsv() {
    const token = localStorage.getItem('adc_admin_token');
    // Use fetch so we can attach token; csv download via blob.
    fetch(`${API_BASE}/admin/appointments/export.csv?status=${filters.status}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `appointments-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => toast.error('Export failed'));
  }

  const statCards = [
    { key: 'new', label: 'New', icon: <Users className="h-5 w-5" />, color: 'bg-blue-50 text-blue-700' },
    { key: 'confirmed', label: 'Confirmed', icon: <Award className="h-5 w-5" />, color: 'bg-emerald-50 text-emerald-700' },
    { key: 'completed', label: 'Completed', icon: <Check className="h-5 w-5" />, color: 'bg-slate-100 text-slate-700' },
    { key: 'cancelled', label: 'Cancelled', icon: <X className="h-5 w-5" />, color: 'bg-rose-50 text-rose-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100">
        <div className="container h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-ink-500">{admin?.email}</span>
            <button onClick={exportCsv} className="btn-ghost h-9 px-4 text-xs">Export CSV</button>
            <button onClick={logout} className="btn-dark h-9 px-4 text-xs">Logout</button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="font-display text-2xl font-extrabold">Appointments</h1>
        <p className="text-sm text-ink-500 mt-1">{data.total} total in current filter</p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((c) => (
            <div key={c.key} className="card p-5 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${c.color}`}>{c.icon}</div>
              <div>
                <div className="text-xs text-ink-500">{c.label}</div>
                <div className="font-display font-extrabold text-2xl text-ink-900">{data.stats?.[c.key] || 0}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-4 mt-6 flex flex-col lg:flex-row gap-3 lg:items-center">
          <input
            className="input flex-1"
            placeholder="Search name, phone, email, treatment..."
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value, page: 1 }))}
          />
          <select
            className="input lg:w-44"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value, page: 1 }))}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s === 'all' ? 'All statuses' : s}</option>)}
          </select>
          <input type="date" className="input lg:w-40" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value, page: 1 }))} />
          <input type="date" className="input lg:w-40" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value, page: 1 }))} />
        </div>

        <div className="card mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-ink-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Patient</th>
                  <th className="text-left px-4 py-3 font-semibold">Treatment</th>
                  <th className="text-left px-4 py-3 font-semibold">Preferred</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Booked</th>
                  <th className="text-right px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr><td colSpan="6" className="text-center py-10 text-ink-300">Loading…</td></tr>
                )}
                {!loading && data.items.length === 0 && (
                  <tr><td colSpan="6" className="text-center py-10 text-ink-300">No appointments found.</td></tr>
                )}
                {!loading && data.items.map((a) => (
                  <tr key={a._id} className="hover:bg-brand-50/40 cursor-pointer" onClick={() => setSelected(a)}>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-ink-900">{a.name}</div>
                      <div className="text-xs text-ink-500">{a.phone}{a.email ? ` · ${a.email}` : ''}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-700">{a.treatment}</td>
                    <td className="px-4 py-3 text-ink-700">{a.preferredDate} <span className="text-ink-300">·</span> {a.preferredTime}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusStyle[a.status] || ''}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-500 text-xs">{new Date(a.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex gap-1">
                        <a href={waLink(`Hi ${a.name}, calling from Amutham Dental.`)} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center" title="WhatsApp">
                          <WhatsApp className="h-4 w-4" />
                        </a>
                        <a href={`tel:${a.phone}`} className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center" title="Call">
                          <Phone className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-sm">
            <div className="text-ink-500">Page {filters.page} of {Math.max(1, Math.ceil(data.total / filters.limit))}</div>
            <div className="flex gap-2">
              <button
                disabled={filters.page <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                className="btn-ghost h-9 px-4 text-xs disabled:opacity-40"
              >Previous</button>
              <button
                disabled={filters.page * filters.limit >= data.total}
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                className="btn-ghost h-9 px-4 text-xs disabled:opacity-40"
              >Next</button>
            </div>
          </div>
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={() => setSelected(null)}>
          <aside className="w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="font-display font-extrabold text-xl">Appointment</div>
              <button onClick={() => setSelected(null)} className="h-9 w-9 rounded-full bg-slate-100"><X /></button>
            </div>
            <span className={`badge mt-3 ${statusStyle[selected.status] || ''}`}>{selected.status}</span>

            <div className="mt-5 space-y-3 text-sm">
              <Row label="Name" value={selected.name} />
              <Row label="Phone" value={<a className="text-brand-700" href={`tel:${selected.phone}`}>{selected.phone}</a>} />
              {selected.email && <Row label="Email" value={<a className="text-brand-700" href={`mailto:${selected.email}`}>{selected.email}</a>} />}
              <Row label="Treatment" value={selected.treatment} />
              <Row label="Preferred" value={`${selected.preferredDate} at ${selected.preferredTime}`} />
              {selected.message && <Row label="Message" value={selected.message} />}
              <Row label="Booked at" value={new Date(selected.createdAt).toLocaleString()} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <a href={waLink(`Hi ${selected.name}, this is ${'Amutham Dental'} — confirming your appointment for ${selected.treatment} on ${selected.preferredDate} at ${selected.preferredTime}.`)} target="_blank" rel="noreferrer" className="btn-whatsapp h-10 text-xs">
                <WhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`tel:${selected.phone}`} className="btn-primary h-10 text-xs">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-2">Update status</div>
              <div className="grid grid-cols-2 gap-2">
                {['new','confirmed','completed','cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`h-10 rounded-xl text-xs font-semibold ${selected.status === s ? 'bg-brand-600 text-white' : 'bg-slate-100 text-ink-700 hover:bg-slate-200'}`}
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => deleteAppointment(selected._id)} className="mt-8 text-xs text-rose-500 hover:text-rose-700">
              Delete appointment
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-3">
      <div className="w-24 shrink-0 text-ink-300 text-xs uppercase tracking-wider mt-0.5">{label}</div>
      <div className="text-ink-900 break-words">{value}</div>
    </div>
  );
}
