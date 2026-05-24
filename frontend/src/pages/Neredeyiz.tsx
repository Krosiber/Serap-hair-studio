import React from 'react';
import Layout from "../components/Layout/Layout";
import { NextPage } from 'next';

/* ── Tema ──────────────────────────────────────────────────── */
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

/* ── Styles ────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    .contact-card {
      background: ${C.card};
      border: 1px solid ${C.border};
      border-radius: 1rem;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      transition: border-color 0.25s, box-shadow 0.25s;
      flex: 1;
      min-width: 0;
    }
    .contact-card:hover {
      border-color: rgba(201,168,76,0.3);
      box-shadow: 0 0 30px rgba(201,168,76,0.06);
    }
    .contact-card-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: ${C.goldDim};
      border: 1px solid rgba(201,168,76,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cards-row {
      display: flex;
      gap: 1.25rem;
      margin-bottom: 3rem;
    }
    @media (max-width: 640px) {
      .cards-row { flex-direction: column; }
    }
    .map-wrap {
      border-radius: 1rem;
      overflow: hidden;
      border: 1px solid ${C.border};
      box-shadow: 0 0 60px rgba(0,0,0,0.5);
    }
    .map-wrap iframe { display: block; }
  `}</style>
);

/* ── İkon SVG'leri ─────────────────────────────────────────── */
const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

/* ── İletişim Kartı ────────────────────────────────────────── */
interface CardProps { icon: React.ReactNode; title: string; content: string; }
const ContactCard = ({ icon, title, content }: CardProps) => (
  <div className="contact-card">
    <div className="contact-card-icon">{icon}</div>
    <div>
      <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: '0.4rem' }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '0.875rem', color: C.subtle, lineHeight: 1.6 }}>
        {content}
      </p>
    </div>
  </div>
);

/* ── Ana Sayfa ─────────────────────────────────────────────── */
const Neredeyiz: NextPage = () => (
  <Layout>
    <Styles />
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem' }}>

        {/* Başlık */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>
            Serap Hair Studio
          </p>
          <h1 style={{ margin: '0.6rem 0 0', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 200, color: C.text, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Neredeyiz?
          </h1>
          <div style={{ margin: '1rem auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ width: '5px', height: '5px', background: C.gold, transform: 'rotate(45deg)' }} />
            <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>

        {/* İletişim Kartları */}
        <div className="cards-row">
          <ContactCard
            icon={<LocationIcon />}
            title="Adres"
            content="Cumhuriyet Cd. 42 B, 34040 Bayrampaşa / İstanbul"
          />
          <ContactCard
            icon={<MailIcon />}
            title="E-posta"
            content="seraphairstudio@gmail.com"
          />
          <ContactCard
            icon={<PhoneIcon />}
            title="Telefon"
            content="+90 534 819 3008"
          />
        </div>

        {/* Harita */}
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: '1.25rem',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
          {/* Üst altın şerit */}
          <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.3502379829104!2d28.904533423483368!3d41.05367875422509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab10517156317%3A0x64320036afa69e91!2sSerap%20Hair%20Studio!5e0!3m2!1str!2str!4v1738010112419!5m2!1str!2str"
            width="100%"
            height="480"
            style={{ border: 'none', display: 'block', filter: 'grayscale(0.3) contrast(1.05)' }}
            loading="lazy"
            title="Serap Hair Studio Konumu"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  </Layout>
);

export default Neredeyiz;