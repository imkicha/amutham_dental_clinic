# Amutham Dental Clinic — Premium Website

A conversion-focused, healthcare-grade website for **Amutham Dental Clinic** with online appointment booking, WhatsApp notifications, and a clinic admin panel.

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS, React Router, Framer Motion, react-helmet-async, axios |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, json2csv |
| Database | MongoDB Atlas |
| Notifications | wa.me deep-links (free) **+** optional Twilio WhatsApp Business API |
| Hosting target | Hostinger Business (Node.js + static) |

## Project layout

```
amutham_dental_clinic/
├── client/    # React frontend (Vite)
└── server/    # Express + MongoDB backend
```

## Quick start (local dev)

### 1. Backend

**macOS / Linux / Git Bash:**
```bash
cd server
cp .env.example .env       # fill in MONGO_URI, JWT_SECRET, etc.
npm install
npm run seed:admin         # creates admin user from ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev                # http://localhost:5000
```

**Windows PowerShell** (no `&&` — use `;` or separate lines):
```powershell
cd server
Copy-Item .env.example .env
npm install
npm run seed:admin
npm run dev
```

### 2. Frontend (in a **new** terminal window)

**macOS / Linux / Git Bash:**
```bash
cd client
cp .env.example .env       # optional — defaults work in dev via Vite proxy
npm install
npm run dev                # http://localhost:5173
```

**Windows PowerShell:**
```powershell
cd client
Copy-Item .env.example .env
npm install
npm run dev
```

The Vite dev server proxies `/api` → `http://localhost:5000`, so you can develop without CORS issues.

## Routes

### Public
- `/` — Home (Hero, Trust, Services grid, Gallery, Reviews, Booking, Contact)
- `/services/:slug` — Individual service page (7 services available)
  - `root-canal-treatment`, `teeth-whitening`, `dental-implants`, `braces-aligners`, `pediatric-dentistry`, `cosmetic-dentistry`, `emergency-dental-care`
- `/book-appointment` — Booking page (accepts `?treatment=...` prefill)
- `/about`, `/contact`

### Admin
- `/admin/login` — Admin sign-in
- `/admin/dashboard` — Appointments list, search/filter, status update, CSV export

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/appointments` | Create appointment (public). Returns appointment + WhatsApp links. |
| `GET`  | `/api/appointments/treatments` | List of treatments. |
| `POST` | `/api/auth/login` | Admin login → JWT. |
| `GET`  | `/api/admin/appointments` | List with filters: `q`, `status`, `from`, `to`, `page`, `limit`. |
| `PATCH`| `/api/admin/appointments/:id` | Update `status`. |
| `DELETE`| `/api/admin/appointments/:id` | Delete. |
| `GET`  | `/api/admin/appointments/export.csv` | CSV export. |
| `GET`  | `/api/health` | Health check. |

## WhatsApp integration

Two modes — choose either, both, or only the free one:

1. **Link mode (default, free).** When an appointment is submitted, the backend builds two `wa.me` links — one for the clinic and one for the patient. The frontend auto-opens the patient confirmation, and the admin dashboard has WhatsApp/Call buttons per appointment.

2. **Twilio WhatsApp Business mode (optional).** Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_WHATSAPP_FROM` in `server/.env`. The backend will programmatically send WhatsApp messages to both clinic and patient on every booking.

Set the clinic's WhatsApp number in `server/.env`:
```
CLINIC_WHATSAPP=919876543210   # digits only, country code prefix
```
…and in `client/.env`:
```
VITE_CLINIC_WHATSAPP=919876543210
```

## Conversion features

- Sticky WhatsApp button on every public page
- Hero with dual CTAs (Book + WhatsApp)
- Booking form on every service page (sticky on desktop)
- 30-second form, no payment, confirmation in 15 min messaging
- Trust signals: doctors, qualifications, stats, Google reviews, before/after gallery
- Mobile-first responsive design, smooth animations, fast LCP

## SEO

- Dynamic `<title>`, meta description, canonical, OpenGraph, Twitter cards via `react-helmet-async`
- JSON-LD `Dentist` schema on Home and `MedicalProcedure` on service pages
- `robots.txt`, semantic HTML, lazy-loaded images, `font-display: swap`
- Site is fully SSR-friendly if you later move to Next.js — Helmet emits the right tags

## Deploying on Hostinger Business

1. **Frontend (static)** — run `npm run build` inside `client/`, upload the contents of `client/dist` to the `public_html` directory (or a subdomain).
2. **Backend (Node.js)** — Hostinger Business supports Node.js apps. In the Hostinger panel, set up a new Node.js application pointing to the `server/` folder, with `npm install` as the install command and `node server.js` as the start command. Set the environment variables from `.env.example`.
3. **API base** — set `VITE_API_URL=https://api.yourdomain.com` (or `/api` if you proxy via Hostinger) before running `npm run build`.
4. **MongoDB Atlas** — in your Atlas cluster, allow Hostinger's outbound IP, or `0.0.0.0/0` (less secure), and paste the SRV URI into `MONGO_URI`.
5. **Domain & SSL** — Hostinger provisions free Let's Encrypt SSL. Make sure both `yourdomain.com` and `api.yourdomain.com` (if used) have valid certificates.
6. **Seed the admin** — once the Node app is running on the host, SSH in and run `npm run seed:admin`.

## Customising clinic details

All clinic info (name, phone, address, hours, WhatsApp number, map query) is centralised:
- Frontend → `client/.env` (loaded into `client/src/utils/clinic.js`)
- Backend → `server/.env`

Replace the placeholder Unsplash images and doctor profiles in:
- `client/src/components/sections/Hero.jsx`
- `client/src/components/sections/Trust.jsx`
- `client/src/components/sections/Gallery.jsx`

## License

Proprietary — built for Amutham Dental Clinic.
