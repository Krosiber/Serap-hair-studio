"use client"
import axios from 'axios';
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import Loading from "@/app/loading";

interface Item {
  _id: string;
  baslik: string;
  aciklama: string;
  resimUrl: string;
  createdAt: Date;
}
interface Props { hizmetler: Item[]; }

/* ── Tema Sabitleri ─────────────────────────────────────────── */
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
} as const;

/* ── Parse ──────────────────────────────────────────────────── */
const parsePriceList = (text: string) =>
  text.split('\n').map(line => {
    const parts = line.split(/\.+/);
    if (parts.length >= 2)
      return { service: parts[0].trim(), price: parts[parts.length - 1].trim() };
    return null;
  }).filter(Boolean) as { service: string; price: string }[];

/* ── PriceList ──────────────────────────────────────────────── */
const PriceList = ({ items, note }: { items: { service: string; price: string }[]; note?: string; }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
    {items.map((item, i) => (
      <li key={i} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: '1rem', padding: '0.65rem 0',
        borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
      }}>
        <span style={{ fontSize: '0.8rem', color: C.subtle, letterSpacing: '0.01em' }}>{item.service}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: C.gold, whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>{item.price}</span>
      </li>
    ))}
    {note && (
      <li style={{ paddingTop: '0.75rem', marginTop: '0.5rem', borderTop: `1px solid ${C.border}` }}>
        <p style={{ margin: 0, fontSize: '0.65rem', color: C.muted, fontStyle: 'italic', letterSpacing: '0.02em' }}>{note}</p>
      </li>
    )}
  </ul>
);

/* ── ServiceSection ─────────────────────────────────────────── */
type Variant = 'image-right' | 'image-left';

const ServiceSection = ({
  item, variant = 'image-right', subtitle = 'Fiyat Listesi', note, rawText = false,
}: {
  item: Item; variant?: Variant; subtitle?: string; note?: string; rawText?: boolean;
}) => {
  const priceItems = rawText ? [] : parsePriceList(item.aciklama || '');
  const imgRight = variant === 'image-right';

  /* Metin tarafı */
  const textPane = (
    <div style={{
      flex: '0 0 50%', width: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '3.5rem 2.5rem',
      boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: '26rem' }}>
        {/* Etiket */}
        <p style={{ margin: 0, fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>
          {subtitle}
        </p>
        {/* Başlık */}
        <h2 style={{ margin: '0.6rem 0 0', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 300, color: C.text, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          {item.baslik}
        </h2>
        {/* Altın çizgi */}
        <div style={{ marginTop: '0.85rem', width: '2.5rem', height: '2px', background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
        {/* Kart */}
        <div style={{
          marginTop: '1.75rem', background: C.card,
          border: `1px solid ${C.border}`, borderRadius: '1rem',
          padding: '1.25rem 1.5rem',
          boxShadow: `0 0 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}>
          {rawText
            ? <p style={{ margin: 0, fontSize: '0.8rem', color: C.subtle, lineHeight: 1.7 }}>{item.aciklama}</p>
            : <PriceList items={priceItems} note={note} />
          }
        </div>
      </div>
    </div>
  );

  /* Görsel tarafı */
  const imgPane = (
    <div style={{ flex: '0 0 50%', width: '50%', position: 'relative', minHeight: '480px' }}>
      {item.resimUrl && (
        <>
          {/* Metin tarafına gradient geçiş */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: imgRight
              ? `linear-gradient(to right, ${C.surface} 0%, transparent 40%)`
              : `linear-gradient(to left, ${C.surface} 0%, transparent 40%)`,
          }} />
          {/* Alt karartma */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: `linear-gradient(to top, ${C.surface} 0%, transparent 25%)`,
          }} />
          <Image
            src={item.resimUrl}
            alt={item.baslik}
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.72) contrast(1.06) saturate(0.88)' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </>
      )}
    </div>
  );

  return (
    <section style={{ background: C.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Üst ince gold çizgi */}
      <div style={{
        position: 'absolute', top: 0,
        ...(imgRight ? { right: 0 } : { left: 0 }),
        width: '40%', height: '1px',
        background: imgRight
          ? `linear-gradient(270deg, ${C.goldDim}, transparent)`
          : `linear-gradient(90deg, ${C.goldDim}, transparent)`,
        zIndex: 3,
      }} />

      {/* ── Desktop: yan yana ── */}
      <div className="service-row" style={{
        display: 'flex',
        flexDirection: imgRight ? 'row' : 'row-reverse',
      }}>
        {textPane}
        {imgPane}
      </div>
    </section>
  );
};

/* ── Divider ────────────────────────────────────────────────── */
const Divider = () => (
  <div style={{ background: C.bg, display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
    <div style={{ flex: 1, height: '1px', background: C.border }} />
    <div style={{ margin: '0 1.25rem', width: '6px', height: '6px', background: C.goldDim, border: `1px solid ${C.gold}`, transform: 'rotate(45deg)' }} />
    <div style={{ flex: 1, height: '1px', background: C.border }} />
  </div>
);

/* ── HeroBanner ─────────────────────────────────────────────── */
const HeroBanner = () => (
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 5rem', textAlign: 'center', background: C.bg, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ width: '2.5rem', height: '1px', background: C.border }} />
      <p style={{ margin: 0, fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>Serap Hair Studio</p>
      <div style={{ width: '2.5rem', height: '1px', background: C.border }} />
    </div>
    <h1 style={{ margin: 0, fontSize: 'clamp(2.75rem,8vw,5.5rem)', fontWeight: 200, color: C.text, letterSpacing: '-0.04em', lineHeight: 1 }}>
      Hizmetlerimiz
    </h1>
    <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ width: '3.5rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ width: '5px', height: '5px', background: C.gold, transform: 'rotate(45deg)' }} />
      <div style={{ width: '3.5rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
    </div>
  </div>
);

/* ── Responsive style tag ───────────────────────────────────── */
const ResponsiveStyles = () => (
  <style>{`
    .service-row {
      min-height: 520px;
    }
    @media (max-width: 767px) {
      .service-row {
        flex-direction: column !important;
        min-height: unset;
      }
      .service-row > div {
        flex: none !important;
        width: 100% !important;
      }
      .service-row > div:last-child {
        min-height: 280px;
      }
    }
  `}</style>
);

/* ── Ana Bileşen ────────────────────────────────────────────── */
const sections: {
  index: number; variant: Variant; subtitle?: string; note?: string; rawText?: boolean;
}[] = [
  { index: 0, variant: 'image-right', subtitle: 'Saç Hizmetleri', note: '*Fiyatlarımız başlangıç fiyatlarıdır, saça göre farklılık gösterebilir.' },
  { index: 1, variant: 'image-left',  subtitle: 'Adet Fiyatları', rawText: true },
  { index: 2, variant: 'image-right', subtitle: 'Manikür & Pedikür' },
  { index: 3, variant: 'image-left',  subtitle: 'Makyaj & Kirpik' },
  { index: 4, variant: 'image-right', subtitle: 'Özel Paketler' },
];

const Hizmetler: NextPage<Props> = ({ hizmetler }) => {
  if (!hizmetler) return <Loading />;
  return (
    <Layout>
      <ResponsiveStyles />
      <div style={{ background: C.bg, color: C.text, minHeight: '100vh' }}>
        <HeroBanner />
        {sections.map((s, i) => {
          const item = hizmetler[s.index];
          if (!item) return null;
          return (
            <div key={item._id}>
              {i > 0 && <Divider />}
              <ServiceSection
                item={item}
                variant={s.variant}
                subtitle={s.subtitle}
                note={s.note}
                rawText={s.rawText}
              />
            </div>
          );
        })}
        <div style={{  background: C.bg }} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('https://serap.alwaysdata.net/hizmetler');
    return { props: { hizmetler: response.data } };
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return { notFound: true };
  }
};

export default Hizmetler;