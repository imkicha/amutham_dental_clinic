const express = require('express');

const router = express.Router();

const CHANNEL_ID = process.env.YT_CHANNEL_ID || 'UCwKNrplIZLmY7Mh3JUPxEzQ';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MAX = 12;

const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours
let cache = { at: 0, data: null };

function decode(s = '') {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseFeed(xml) {
  const entries = xml.split('<entry>').slice(1);
  const videos = [];
  for (const e of entries) {
    const id = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (e.match(/<title>([^<]*)<\/title>/) || [])[1];
    const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1];
    if (!id) continue;
    videos.push({
      id,
      title: decode(title || ''),
      published: published || null,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/shorts/${id}`,
    });
    if (videos.length >= MAX) break;
  }
  return videos;
}

router.get('/', async (_req, res) => {
  const now = Date.now();
  if (cache.data && now - cache.at < CACHE_TTL_MS) {
    return res.json({ ...cache.data, cached: true });
  }
  try {
    const r = await fetch(FEED_URL, { headers: { 'Accept-Language': 'en-US' } });
    if (!r.ok) throw new Error(`feed HTTP ${r.status}`);
    const xml = await r.text();
    const videos = parseFeed(xml);
    const data = {
      ok: videos.length > 0,
      channelUrl: 'https://www.youtube.com/@gokulnivas1996',
      videos,
    };
    cache = { at: now, data };
    res.json(data);
  } catch (err) {
    console.warn('Videos fetch failed:', err.message);
    if (cache.data) return res.json({ ...cache.data, cached: true, stale: true });
    res.json({ ok: false, channelUrl: 'https://www.youtube.com/@gokulnivas1996', videos: [] });
  }
});

module.exports = router;
