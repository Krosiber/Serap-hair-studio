"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ── Tema ──────────────────────────────────────────────────── */
const C = {
  bg:         '#0a0a0a',
  border:     'rgba(255,255,255,0.07)',
  gold:       '#C9A84C',
  goldDim:    'rgba(201,168,76,0.12)',
  text:       '#F9FAFB',
  muted:      '#6B7280',
  subtle:     '#9CA3AF',
} as const;

/* ── Nav Linkleri ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Anasayfa',   href: '/'          },
  { label: 'Hizmetler',  href: '/Hizmetler' },
  { label: 'Kurumsal',   href: '/Kurumsal'  },
  { label: 'Neredeyiz',  href: 'Neredeyiz' },
  { label: 'İletişim',   href: '/iletisim'   },
] as const;

/* ── Styles ────────────────────────────────────────────────── */
const Styles = (): React.ReactElement => (
  <style>{`
    .nav-link {
      position: relative;
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 400;
      color: ${C.subtle};
      text-decoration: none;
      padding: 0.25rem 0;
      transition: color 0.2s;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: ${C.gold};
      transition: width 0.3s ease;
    }
    .nav-link:hover,
    .nav-link.active {
      color: ${C.text};
    }
    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }
    .nav-link.active {
      color: ${C.gold};
    }
    .nav-link.active::after {
      background: ${C.gold};
      width: 100%;
    }

    /* Hamburger */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 4px;
      background: none;
      border: none;
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 1.5px;
      background: ${C.subtle};
      transition: all 0.3s ease;
    }
    .hamburger:hover span { background: ${C.gold}; }

    /* Mobile menu */
    .mobile-menu {
      display: none;
      flex-direction: column;
      gap: 0;
      border-top: 1px solid ${C.border};
      background: ${C.bg};
    }
    .mobile-menu.open { display: flex; }
    .mobile-nav-link {
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${C.subtle};
      text-decoration: none;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid ${C.border};
      transition: color 0.2s, background 0.2s;
    }
    .mobile-nav-link:hover  { color: ${C.text}; background: rgba(255,255,255,0.03); }
    .mobile-nav-link.active { color: ${C.gold}; }

    @media (max-width: 700px) {
      .desktop-nav { display: none !important; }
      .hamburger   { display: flex !important; }
    }
  `}</style>
);

/* ── Logo SVG ──────────────────────────────────────────────── */
const Logo = (): React.ReactElement => (
  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
    {/* Küçük geometrik ikon */}
    <div style={{
      width: '28px', height: '28px',
      border: `1px solid ${C.gold}`,
      transform: 'rotate(45deg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{ width: '8px', height: '8px', background: C.gold }} />
    </div>
    {/* Metin */}
    <div>
      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.text, lineHeight: 1.1 }}>
        Serap
      </p>
      <p style={{ margin: 0, fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, lineHeight: 1 }}>
        Hair Studio
      </p>
    </div>
  </Link>
);

/* ── Header Bileşeni ───────────────────────────────────────── */
const Header = (): React.ReactElement => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <Styles />
      <header style={{
        background: C.bg,
        borderBottom: `1px solid ${C.border}`,
        position: 'relative',
        zIndex: 50,
      }}>
        {/* Üst ince gold şerit */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          opacity: 0.5,
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Logo />

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger (Mobile) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menü"
          >
            <span style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;