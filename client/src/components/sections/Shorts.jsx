import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '../ui/Icon.jsx';
import { API_BASE } from '../../utils/clinic.js';

const CHANNEL_URL = 'https://www.youtube.com/@gokulnivas1996';

function ShortCard({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="snap-start shrink-0 w-[200px] sm:w-[230px]">
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-ink-900 shadow-soft border border-ink-100">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play: ${video.title}`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-105 transition"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="h-14 w-14 rounded-full bg-white/95 grid place-items-center shadow-lg group-hover:scale-110 transition">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink-900 translate-x-0.5" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 px-0.5 text-xs text-ink-500 leading-snug line-clamp-2">{video.title}</p>
    </div>
  );
}

export default function Shorts() {
  const [videos, setVideos] = useState([]);
  const scroller = useRef(null);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/videos`)
      .then((r) => r.json())
      .then((j) => {
        if (active && j && Array.isArray(j.videos)) setVideos(j.videos);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const scrollBy = (dir) => {
    if (scroller.current) scroller.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  if (!videos.length) return null;

  return (
    <section id="shorts" className="section bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="eyebrow">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brand-700" fill="currentColor">
                <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8zM10 15V9l5 3-5 3z" />
              </svg>
              Watch our clinic
            </span>
            <h2 className="heading mt-4">Shorts from Dr. Gokulnivas.</h2>
            <p className="subheading mt-3">
              Quick, real explainers on implants, full-mouth rehab and everyday dental care.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 self-start lg:self-auto">
            <button onClick={() => scrollBy(-1)} className="btn-ghost h-10 w-10 !px-0" aria-label="Scroll left">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button onClick={() => scrollBy(1)} className="btn-ghost h-10 w-10 !px-0" aria-label="Scroll right">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 scrollbar-hide"
        >
          {videos.map((v) => <ShortCard key={v.id} video={v} />)}
        </div>

        <div className="mt-6 flex justify-center">
          <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="btn-ghost h-11 px-5">
            Visit our YouTube channel <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
