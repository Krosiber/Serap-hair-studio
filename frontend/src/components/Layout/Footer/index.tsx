import React from 'react';
import Link from 'next/link';

/* ── Tema ──────────────────────────────────────────────────── */
const C = {
  bg:      '#0a0a0a',
  surface: '#111111',
  border:  'rgba(255,255,255,0.07)',
  gold:    '#C9A84C',
  goldDim: 'rgba(201,168,76,0.12)',
  text:    '#F9FAFB',
  muted:   '#6B7280',
  subtle:  '#9CA3AF',
} as const;

/* ── Nav Linkleri ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Anasayfa',  href: '/'          },
  { label: 'Hizmetler', href: '/Hizmetler' },
  { label: 'Kurumsal',  href: '/Kurumsal'  },
  { label: 'Neredeyiz', href: '/Neredeyiz' },
  { label: 'İletişim',  href: '/iletisim'   },
] as const;

/* ── Sosyal Medya Linkleri ─────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/seraphairstudio',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/905348193008',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
  {
    label: 'Google Maps',
    href: 'https://maps.google.com/?q=Serap+Hair+Studio',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
] as const;

/* ── Styles ────────────────────────────────────────────────── */
const Styles = (): React.ReactElement => (
  <style>{`
    .footer-nav-link {
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${C.muted};
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-nav-link:hover { color: ${C.gold}; }

    .social-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid ${C.border};
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${C.muted};
      text-decoration: none;
      transition: border-color 0.25s, color 0.25s, background 0.25s;
      cursor: pointer;
    }
    .social-btn:hover {
      border-color: ${C.gold};
      color: ${C.gold};
      background: ${C.goldDim};
    }

    .footer-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }
    .footer-nav-row {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    @media (max-width: 480px) {
      .footer-nav-row { gap: 1.25rem; }
    }
  `}</style>
);

/* ── Logo ──────────────────────────────────────────────────── */
const FooterLogo = (): React.ReactElement => (
  <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
    <div style={{
      width: '36px', height: '36px',
      border: `1px solid ${C.gold}`,
      transform: 'rotate(45deg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '10px', height: '10px', background: C.gold }} />
    </div>
    <div style={{ textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '1rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.text, lineHeight: 1.1 }}>
        Serap
      </p>
      <p style={{ margin: 0, fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold }}>
        Hair Studio
      </p>
    </div>
  </Link>
);

/* ── Footer Bileşeni ───────────────────────────────────────── */
const Footer = (): React.ReactElement => (
  <>
    <Styles />
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}`, position: 'relative' }}>
      {/* Üst gold şerit */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
        opacity: 0.4,
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="footer-inner">

          {/* Logo + Açıklama */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <FooterLogo />
            <p style={{
              margin: 0, maxWidth: '320px', textAlign: 'center',
              fontSize: '0.8rem', color: C.muted, lineHeight: 1.75, fontWeight: 300,
            }}>
              Bayrampaşa'nın kalbinde profesyonel saç, manikür ve güzellik hizmetleri.
              Her detayda özen, her ziyarette fark.
            </p>
          </div>

          {/* Ayraç */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '500px', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
            <div style={{ width: '5px', height: '5px', background: C.goldDim, border: `1px solid ${C.gold}`, transform: 'rotate(45deg)', flexShrink: 0 }} />
            <div style={{ flex: 1, height: '1px', background: C.border }} />
          </div>

          {/* Nav Linkleri */}
          <nav className="footer-nav-row">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="footer-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Sosyal Medya */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SOCIAL_LINKS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Alt bilgi */}
          <div style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: '1.5rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <p style={{ margin: 0, fontSize: '0.65rem', color: C.muted, letterSpacing: '0.05em' }}>
              © {new Date().getFullYear()} Serap Hair Studio. Tüm hakları saklıdır.
            </p>
            <p style={{ margin: 0, fontSize: '0.6rem', color: '#3f3f3f', letterSpacing: '0.05em' }}>
              Cumhuriyet Cd. 42 B, 34040 Bayrampaşa / İstanbul
            </p>
          </div>

        </div>
      </div>
    </footer>
  </>
);

export default Footer;