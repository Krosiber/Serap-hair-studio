import Layout from "../components/Layout/Layout";
import './tailwind.css';
import axios from "axios";
import { useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/* ── Tema Sabitleri ────────────────────────────────────────── */
const C = {
  bg:      '#0a0a0a',
  surface: '#111111',
  card:    '#161616',
  border:  'rgba(255,255,255,0.07)',
  borderHover: 'rgba(201,168,76,0.35)',
  gold:    '#C9A84C',
  goldDim: 'rgba(201,168,76,0.12)',
  text:    '#F9FAFB',
  muted:   '#6B7280',
  subtle:  '#9CA3AF',
  input:   '#1a1a1a',
  inputBorder: 'rgba(255,255,255,0.1)',
};

/* ── Input / Label ortak stil ──────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: C.subtle,
  marginBottom: '0.5rem',
  fontWeight: 500,
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: C.input,
  border: `1px solid ${C.inputBorder}`,
  borderRadius: '0.625rem',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  color: C.text,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

/* ── Styles ────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    .contact-input:focus { border-color: ${C.gold} !important; }
    .contact-input::placeholder { color: ${C.muted}; }
    .contact-btn {
      width: 100%;
      padding: 0.9rem;
      background: transparent;
      border: 1px solid ${C.gold};
      border-radius: 0.625rem;
      color: ${C.gold};
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.25s, color 0.25s;
    }
    .contact-btn:hover:not(:disabled) { background: ${C.gold}; color: #0a0a0a; }
    .contact-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    @media (max-width: 560px) { .form-grid { grid-template-columns: 1fr; } }
  `}</style>
);

/* ── Ana Bileşen ───────────────────────────────────────────── */
const Contact = () => {
  const [name, setName]       = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const contactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post('https://serap.alwaysdata.net/contact', { name, surname, phone, email, message });
      toast.success('Mesajınız başarıyla gönderildi.');
      setName(''); setSurname(''); setPhone(''); setEmail(''); setMessage('');
    } catch (error: unknown) {
      console.error(error);
      toast.error('Gönderim sırasında bir hata oluştu.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <Styles />
      <ToastContainer theme="dark" position="top-right" />

      <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>

          {/* Başlık */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ margin: 0, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>
              Serap Hair Studio
            </p>
            <h1 style={{ margin: '0.6rem 0 0', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 200, color: C.text, letterSpacing: '-0.03em' }}>
              İletişim
            </h1>
            <div style={{ margin: '1rem auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ width: '5px', height: '5px', background: C.gold, transform: 'rotate(45deg)' }} />
              <div style={{ width: '3rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </div>

          {/* Form Kartı */}
          <div style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: '1.25rem',
            padding: '2.5rem',
            boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <form onSubmit={contactSubmit}>
              {/* Ad / Soyad */}
              <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Ad</label>
                  <input className="contact-input" style={inputStyle} type="text" placeholder="Adınız" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label style={labelStyle}>Soyad</label>
                  <input className="contact-input" style={inputStyle} type="text" placeholder="Soyadınız" value={surname} onChange={e => setSurname(e.target.value)} required />
                </div>
              </div>

              {/* Telefon / Email */}
              <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Telefon</label>
                  <input className="contact-input" style={inputStyle} type="tel" placeholder="+90 5xx xxx xx xx" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div>
                  <label style={labelStyle}>E-posta</label>
                  <input className="contact-input" style={inputStyle} type="email" placeholder="ornek@mail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>

              {/* Mesaj */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={labelStyle}>Mesaj</label>
                <textarea
                  className="contact-input"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', lineHeight: 1.6 }}
                  placeholder="Mesajınızı buraya yazın…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="contact-btn" disabled={sending}>
                {sending ? 'Gönderiliyor…' : 'Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;