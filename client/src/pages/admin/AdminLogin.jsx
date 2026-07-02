import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../utils/api';
import Logo from '../../components/ui/Logo.jsx';
import { Shield } from '../../components/ui/Icon.jsx';

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('adc_admin_token')) nav('/admin/dashboard');
  }, [nav]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('adc_admin_token', data.token);
      if (data.admin) localStorage.setItem('adc_admin', JSON.stringify(data.admin));
      else localStorage.removeItem('adc_admin');
      toast.success('Welcome back.');
      nav('/admin/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen gradient-hero grid place-items-center px-4">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-8">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="badge bg-emerald-50 text-emerald-700"><Shield className="h-3 w-3" /> Secure</span>
        </div>
        <h1 className="font-display text-2xl font-extrabold mt-6">Clinic admin login</h1>
        <p className="text-sm text-ink-500 mt-1">Sign in to manage appointments.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <button disabled={loading} className="btn-primary h-11 w-full mt-6 text-sm disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <a href="/" className="block text-center text-xs text-ink-300 mt-5 hover:text-brand-700">← Back to website</a>
      </form>
    </div>
  );
}
