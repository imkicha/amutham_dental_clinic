const express = require('express');

const router = express.Router();

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
// Optional: set GOOGLE_PLACE_ID to skip the text-search resolve step.
let PLACE_ID = process.env.GOOGLE_PLACE_ID || '';
const PLACE_QUERY =
  process.env.GOOGLE_PLACE_QUERY ||
  `${process.env.CLINIC_NAME || 'Amutham Dental Care'} ${process.env.CLINIC_ADDRESS || 'Kalavasal Madurai'}`;

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
let cache = { at: 0, data: null };

async function resolvePlaceId() {
  if (PLACE_ID) return PLACE_ID;
  const url =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json' +
    `?input=${encodeURIComponent(PLACE_QUERY)}&inputtype=textquery&fields=place_id&key=${API_KEY}`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.status !== 'OK' || !j.candidates || !j.candidates.length) {
    throw new Error(`Find Place failed: ${j.status} ${j.error_message || ''}`.trim());
  }
  PLACE_ID = j.candidates[0].place_id;
  return PLACE_ID;
}

async function fetchReviews() {
  const placeId = await resolvePlaceId();
  const url =
    'https://maps.googleapis.com/maps/api/place/details/json' +
    `?place_id=${placeId}&reviews_sort=newest&reviews_no_translations=true` +
    `&fields=rating,user_ratings_total,reviews,url,name&key=${API_KEY}`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.status !== 'OK') {
    throw new Error(`Place Details failed: ${j.status} ${j.error_message || ''}`.trim());
  }
  const result = j.result || {};
  return {
    ok: true,
    source: 'google',
    name: result.name,
    rating: result.rating || null,
    total: result.user_ratings_total || 0,
    url: result.url || null,
    reviews: (result.reviews || []).map((rv) => ({
      name: rv.author_name,
      rating: rv.rating,
      text: rv.text,
      relativeTime: rv.relative_time_description,
      time: rv.time, // unix seconds
      profilePhoto: rv.profile_photo_url || null,
      authorUrl: rv.author_url || null,
    })),
  };
}

router.get('/', async (_req, res) => {
  if (!API_KEY) {
    return res.json({ ok: false, reason: 'no_api_key' });
  }
  const now = Date.now();
  if (cache.data && now - cache.at < CACHE_TTL_MS) {
    return res.json({ ...cache.data, cached: true });
  }
  try {
    const data = await fetchReviews();
    cache = { at: now, data };
    res.json(data);
  } catch (err) {
    console.warn('Reviews fetch failed:', err.message);
    // Serve stale cache if we have it; otherwise signal the client to fall back.
    if (cache.data) return res.json({ ...cache.data, cached: true, stale: true });
    res.json({ ok: false, reason: 'fetch_failed' });
  }
});

module.exports = router;
