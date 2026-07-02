require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const appointmentsRouter = require('./routes/appointments');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const reviewsRouter = require('./routes/reviews');
const videosRouter = require('./routes/videos');

const app = express();

// CSP disabled: the client serves images from external hosts (e.g. Unsplash).
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60 });
app.use('/api/appointments', publicLimiter);

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use('/api/appointments', appointmentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/videos', videosRouter);

// Serve the built React client (single-origin) when a production build exists.
const clientDist = path.join(__dirname, '..', 'client', 'dist');
const hasClientBuild = fs.existsSync(path.join(clientDist, 'index.html'));
if (hasClientBuild) {
  console.log('Serving client build from:', clientDist);
  app.use(express.static(clientDist));
  // SPA fallback for everything EXCEPT /api (so API routes always return JSON).
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
} else {
  console.warn(
    'client/dist not found at',
    clientDist,
    '— frontend will not be served. Ensure the client is built and the app root is the repo root.'
  );
  // Keep the app healthy for diagnostics even without a build.
  app.get('/', (_req, res) => res.json({ ok: true, note: 'API up; client build missing' }));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Start the HTTP server first so the frontend and /api/health are always up,
// even if the database is slow or misconfigured. Then connect to MongoDB.
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

if (!MONGO_URI) {
  console.error('MONGO_URI is not set — API routes that use the database will fail until it is configured.');
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
}
