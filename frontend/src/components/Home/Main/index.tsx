"use client"
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import axios from 'axios';
import Image from 'next/image';

/* ── Tip Tanımları ─────────────────────────────────────────── */
interface Item {
  idj: number;
  foto: string;
  Videolarımız: string;
  vd1: string;
  vd2: string;
  vd3: string;
  vd4: string;
}
interface GaleriItem {
  _id: string;
  resimUrl: string;
  createdAt: Date;
}

/* ── Tema Sabitleri ────────────────────────────────────────── */
const C = {
  bg:      '#0a0a0a',
  surface: '#111111',
  card:    '#161616',
  border:  'rgba(255,255,255,0.07)',
  gold:    '#C9A84C',
  goldDim: 'rgba(201,168,76,0.12)',
  text:    '#F9FAFB',
  muted:   '#6B7280',
  subtle:  '#9CA3AF',
};

/* ── Section Başlık Bileşeni ───────────────────────────────── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
    <p style={{ margin: 0, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>
      Serap Hair Studio
    </p>
    <h2 style={{ margin: '0.6rem 0 0', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200, color: C.text, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
      {children}
    </h2>
    <div style={{ margin: '1rem auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
      <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ width: '5px', height: '5px', background: C.gold, transform: 'rotate(45deg)' }} />
      <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
    </div>
  </div>
);

/* ── Responsive Style ──────────────────────────────────────── */
const Styles = () => (
  <style>{`
    .galeri-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    .galeri-item {
      position: relative;
      aspect-ratio: 4/5;
      overflow: hidden;
      border-radius: 0.75rem;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .galeri-item img {
      transition: transform 0.5s ease, filter 0.5s ease;
      filter: brightness(0.85) saturate(0.9);
    }
    .galeri-item:hover img {
      transform: scale(1.05);
      filter: brightness(0.65) saturate(0.8);
    }
    .galeri-item::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%);
      pointer-events: none;
      z-index: 1;
    }
    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.25rem;
    }
    .video-wrapper {
      position: relative;
      border-radius: 0.75rem;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
      background: #161616;
    }
    .video-wrapper video {
      width: 100%;
      display: block;
      aspect-ratio: 9/16;
      object-fit: cover;
    }
    @media (max-width: 640px) {
      .galeri-grid { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
      .video-grid  { grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    }
  `}</style>
);

/* ── Ana Bileşen ───────────────────────────────────────────── */
const Anasayfa: React.FC = () => {
  const [data, setData] = useState<Item | null>(null);
  const [galeriItems, setGaleriItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/data.json');
        const result = await res.json();
        setData(result[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    const fetchGaleri = async () => {
      try {
        const res = await axios.get('https://serap.alwaysdata.net/galeri');
        setGaleriItems(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
    fetchGaleri();
  }, []);

  if (loading || !data) return <Loading />;

  const videos = [data.vd1, data.vd2, data.vd3, data.vd4].filter(Boolean);

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh' }}>
      <Styles />

      {/* ── Galeri Section ── */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle>{data.foto}</SectionTitle>
          <div className="galeri-grid">
            {galeriItems.map((item) => (
              <div key={item._id} className="galeri-item">
                <Image
                  src={item.resimUrl}
                  alt="Galeri"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ayraç */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 2rem', background: C.bg }}>
        <div style={{ flex: 1, height: '1px', background: C.border }} />
        <div style={{ margin: '0 1.25rem', width: '6px', height: '6px', background: C.goldDim, border: `1px solid ${C.gold}`, transform: 'rotate(45deg)' }} />
        <div style={{ flex: 1, height: '1px', background: C.border }} />
      </div>

      {/* ── Video Section ── */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle>{data.Videolarımız}</SectionTitle>
          <div className="video-grid">
            {videos.map((src, i) => (
              <div key={i} className="video-wrapper">
                {/* Üst altın şerit */}
                <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
                <video src={src} controls style={{ width: '100%', display: 'block', aspectRatio: '9/16', objectFit: 'cover', background: '#000' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: '3rem' }} />
    </div>
  );
};

export default Anasayfa;