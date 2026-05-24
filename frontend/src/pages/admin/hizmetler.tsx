import { useState, useEffect, FormEvent } from 'react';
import AdminLayout from './layoutpage';
import "../tailwind.css";
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface Hizmet {
  _id: string;
  baslik: string;
  aciklama: string;
  resimUrl: string;
}

// ─── İkonlar ─────────────────────────────────────────────────────────────
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16H8v-2a2 2 0 01.586-1.414z" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Yardımcı: Açıklama önizleme (ilk 2 satır) ───────────────────────────
const AciklamaOnizleme = ({ text }: { text: string }) => {
  const lines = text.trim().split('\n').slice(0, 2);
  return (
    <div className="text-sm text-gray-500 space-y-0.5">
      {lines.map((line, i) => (
        <p key={i} className="truncate max-w-xs">{line}</p>
      ))}
      {text.split('\n').length > 2 && (
        <p className="text-xs text-gray-400 italic">+ {text.split('\n').length - 2} satır daha…</p>
      )}
    </div>
  );
};

// ─── Ana Bileşen ──────────────────────────────────────────────────────────
const HizmetlerYonetimi = () => {
  const [hizmetler, setHizmetler] = useState<Hizmet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formAcik, setFormAcik] = useState(false);
  const [editingHizmet, setEditingHizmet] = useState<Hizmet | null>(null);
  const [hizmetBaslik, setHizmetBaslik] = useState('');
  const [hizmetAciklama, setHizmetAciklama] = useState('');
  const [hizmetResim, setHizmetResim] = useState('');
  const [resimYukleniyor, setResimYukleniyor] = useState(false);
  const [kayitYapiliyor, setKayitYapiliyor] = useState(false);

  // ── Veri Çekme ──────────────────────────────────────────────────────────
  const getHizmetler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://serap.alwaysdata.net/hizmetler');
      setHizmetler(response.data);
    } catch (error: unknown) {
      console.error('Hizmetler getirilemedi:', error);
      toast.error('Hizmetler yüklenirken hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { getHizmetler(); }, []);

  // ── Resim Yükleme ────────────────────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResimYukleniyor(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://serap.alwaysdata.net/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setHizmetResim(response.data.url);
      toast.success('Görsel başarıyla yüklendi.');
    } catch (error: unknown) {
      console.error('Resim yükleme hatası:', error);
      toast.error('Görsel yüklenemedi.');
    } finally {
      setResimYukleniyor(false);
    }
  };

  // ── Form Submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hizmetBaslik.trim()) { toast.error('Hizmet adı boş bırakılamaz.'); return; }

    setKayitYapiliyor(true);
    try {
      if (editingHizmet) {
        await axios.put(`https://serap.alwaysdata.net/hizmet/${editingHizmet._id}`, {
          baslik: hizmetBaslik,
          aciklama: hizmetAciklama,
          resimUrl: hizmetResim,
        });
        toast.success('Hizmet başarıyla güncellendi!');
      } else {
        await axios.post('https://serap.alwaysdata.net/hizmetadd', {
          baslik: hizmetBaslik,
          aciklama: hizmetAciklama,
          resimUrl: hizmetResim,
        });
        toast.success('Hizmet başarıyla eklendi!');
      }
      await getHizmetler();
      resetForm();
    } catch (error: unknown) {
      console.error('İşlem hatası:', error);
      toast.error('İşlem sırasında bir hata oluştu.');
    } finally {
      setKayitYapiliyor(false);
    }
  };

  // ── Düzenle ───────────────────────────────────────────────────────────────
  const handleEdit = (hizmet: Hizmet) => {
    setEditingHizmet(hizmet);
    setHizmetBaslik(hizmet.baslik);
    setHizmetAciklama(hizmet.aciklama);
    setHizmetResim(hizmet.resimUrl);
    setFormAcik(true);
    // Forma scroll
    setTimeout(() => {
      document.getElementById('hizmet-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // ── Form Sıfırla ──────────────────────────────────────────────────────────
  const resetForm = () => {
    setEditingHizmet(null);
    setHizmetBaslik('');
    setHizmetAciklama('');
    setHizmetResim('');
    setFormAcik(false);
  };

  const formBaslik = editingHizmet ? `"${editingHizmet.baslik}" Düzenleniyor` : 'Yeni Hizmet Ekle';

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">

        {/* ── Sayfa Başlık ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Hizmetler</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {hizmetler.length} hizmet kayıtlı
            </p>
          </div>
          <button
            onClick={() => {
              if (formAcik && !editingHizmet) { resetForm(); } 
              else { resetForm(); setFormAcik(true); }
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              formAcik && !editingHizmet
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {formAcik && !editingHizmet ? <><CloseIcon /> Formu Kapat</> : <><PlusIcon /> Yeni Hizmet</>}
          </button>
        </div>

        {/* ── Hizmet Tablosu ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <svg className="animate-spin h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Yükleniyor…
            </div>
          ) : hizmetler.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-lg font-medium">Henüz hizmet eklenmemiş</p>
              <p className="text-sm mt-1">Yukarıdaki butona tıklayarak ilk hizmeti ekleyin.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                      Görsel
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                      Hizmet Adı
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs hidden md:table-cell">
                      Açıklama Önizleme
                    </th>
                    <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">
                      İşlem
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {hizmetler.map((hizmet, index) => (
                    <tr
                      key={hizmet._id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      {/* Görsel */}
                      <td className="px-6 py-4">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {hizmet.resimUrl ? (
                            <Image
                              src={hizmet.resimUrl}
                              alt={hizmet.baslik}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">
                              🖼️
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Başlık + Sıra */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-xs font-mono flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-900">{hizmet.baslik}</span>
                        </div>
                      </td>

                      {/* Açıklama Önizleme */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <AciklamaOnizleme text={hizmet.aciklama || ''} />
                      </td>

                      {/* Düzenle */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(hizmet)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-900 hover:text-white transition-all"
                        >
                          <EditIcon />
                          Düzenle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Form ── */}
        {formAcik && (
          <form
            id="hizmet-form"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Form Başlık */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{formBaslik}</h3>
                {editingHizmet && (
                  <p className="text-xs text-gray-400 mt-0.5">ID: {editingHizmet._id}</p>
                )}
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Hizmet Adı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Hizmet Adı <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={hizmetBaslik}
                  onChange={(e) => setHizmetBaslik(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-300 transition"
                  placeholder="örn. Saç Boyama"
                  required
                />
              </div>

              {/* İki Kolon: Açıklama + Görsel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Fiyat Listesi
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    Her satır: <code className="bg-gray-100 px-1 rounded">Hizmet Adı ... Fiyat</code> formatında
                  </p>
                  <textarea
                    value={hizmetAciklama}
                    onChange={(e) => setHizmetAciklama(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-300 transition font-mono"
                    rows={10}
                    placeholder={"Saç Yıkama..........200₺\nSaç Kesimi..........350₺\nFöhn.................150₺"}
                  />
                </div>

                {/* Görsel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Görsel</label>
                  <p className="text-xs text-gray-400 mb-2">JPG, PNG veya WEBP — önerilen oran 4:3</p>
                  <label className="flex flex-col items-center justify-center w-full h-[248px] border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all relative overflow-hidden group">
                    {resimYukleniyor ? (
                      <div className="flex flex-col items-center text-gray-400">
                        <svg className="animate-spin h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <span className="text-sm">Yükleniyor…</span>
                      </div>
                    ) : hizmetResim ? (
                      <>
                        <Image
                          src={hizmetResim}
                          alt="Önizleme"
                          fill
                          className="object-cover rounded-xl"
                          sizes="400px"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                          <span className="text-white text-sm font-medium">Değiştirmek için tıklayın</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <UploadIcon />
                        <p className="text-sm font-medium">Görsel yüklemek için tıklayın</p>
                        <p className="text-xs mt-1">veya dosyayı sürükleyin</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              {/* Butonlar */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={kayitYapiliyor}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {kayitYapiliyor && (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                  {editingHizmet ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies['accessToken'];

  if (!token) {
    return { redirect: { destination: '/seraphairstudio-panel', permanent: false } };
  }

  try {
    await axios.get('https://serap.alwaysdata.net/verify-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { props: { user: { name: 'User Name' } } };
  } catch (error) {
    console.log('Token geçersiz:', error);
    return { redirect: { destination: '/seraphairstudio-panel', permanent: false } };
  }
};

export default HizmetlerYonetimi;