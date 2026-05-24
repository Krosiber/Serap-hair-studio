import React from 'react';
import Layout from "../components/Layout/Layout";
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';

/* ── Tip ───────────────────────────────────────────────────── */
interface Item {
  hakkimizda: string;
  altbaslik: string;
  imgUrl: string;
  createdAt: Date;
}
interface Props { kurumsal: Item; }

/* ── Tema ──────────────────────────────────────────────────── */
const C = {
  bg:      '#0a0a0a',
  surface: '#111111',
  card:    '#161616',
  border:  'rgba(255,255,255,0.07)',
  gold:    '#C9A84C',
  goldDim: 'rgba(201,168,76,0.12)',
  text:    '#F9FAFB',
  subtle:  '#9CA3AF',
};

const Styles = () => (
  <style>{`
    .kurumsal-img-wrap {
      position: relative;
      width: 100%;
      border-radius: 1rem;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .kurumsal-img-wrap img {
      transition: transform 0.6s ease, filter 0.6s ease;
      filter: brightness(0.82) saturate(0.9);
    }
    .kurumsal-img-wrap:hover img {
      transform: scale(1.03);
      filter: brightness(0.7) saturate(0.85);
    }
  `}</style>
);

/* ── Sayfa ─────────────────────────────────────────────────── */
const Kurumsal: NextPage<Props> = ({ kurumsal }) => (
  <Layout>
    <Styles />
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '5rem 1.5rem' }}>

        {/* Başlık bloğu */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>
            Serap Hair Studio
          </p>
          <h1 style={{ margin: '0.65rem 0 0', fontSize: 'clamp(2.25rem,6vw,4rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.1, color: C.text }}>
            {kurumsal.hakkimizda}
          </h1>
          {/* Gold çizgi */}
          <div style={{ marginTop: '1rem', width: '3rem', height: '2px', background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
        </div>

        {/* İçerik kartı */}
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: '1.25rem',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
          {/* Üst altın şerit */}
          <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />

          <div style={{ padding: '2.5rem' }}>
            {/* Alt başlık */}
            <p style={{ margin: '0 0 2.5rem', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: C.subtle, lineHeight: 1.85, fontWeight: 300 }}>
              {kurumsal.altbaslik}
            </p>

            {/* Görsel */}
            <div className="kurumsal-img-wrap" style={{ aspectRatio: '16/9' }}>
              {/* Alt ve kenar gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 40%)',
              }} />
              <Image
                src={kurumsal.imgUrl}
                alt="Kurumsal Görsel"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 860px) 100vw, 860px"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('https://serap.alwaysdata.net/kurumsal');
    return { props: { kurumsal: response.data } };
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return { notFound: true };
  }
};

export default Kurumsal;