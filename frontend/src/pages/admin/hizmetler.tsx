import { useState, useEffect, FormEvent } from 'react';
import AdminLayout from './layoutpage';
import "../tailwind.css"
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

const HizmetlerYonetimi = () => {
  const [hizmetler, setHizmetler] = useState<Hizmet[]>([]);
  const [hizmetEkle, setHizmetEkle] = useState(false);
  const [editingHizmet, setEditingHizmet] = useState<Hizmet | null>(null);
  const [hizmetBaslik, setHizmetBaslik] = useState('');
  const [hizmetAciklama, setHizmetAciklama] = useState('');
  const [hizmetResim, setHizmetResim] = useState('');

  // Hizmetleri getir
  const getHizmetler = async () => {
    try {
      const response = await axios.get('https://serap-hair-studio.onrender.com/api/hizmetler');
      setHizmetler(response.data);
    } catch (error:unknown) {
      console.error('Hizmetler getirilemedi:', error);
    }
  };

  useEffect(() => {
    getHizmetler();
  }, []);

  
  // Resim yükleme işlemi
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('https://serap-hair-studio.onrender.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setHizmetResim(response.data.url);
      } catch (error:unknown) {
        console.error('Resim yükleme hatası:', error);
      }
    }
  };

  // Form işlemleri
  const handleSubmit = async () => {
    
    try {
      if (editingHizmet) {
        const response = await axios.put(`https://serap-hair-studio.onrender.com/api/hizmet/${editingHizmet._id}`, {
          baslik: hizmetBaslik,
          aciklama: hizmetAciklama,
          resimUrl: hizmetResim
        });
        setHizmetler(response.data);
        toast.success('Hizmet başarıyla güncellendi!');
      } else {
        const response = await axios.post('https://serap-hair-studio.onrender.com/api/hizmetadd', {
          baslik: hizmetBaslik,
          aciklama: hizmetAciklama,
          resimUrl: hizmetResim
        });
        setHizmetler(response.data);
        toast.success('Hizmet başarıyla eklendi!');
      }
      resetForm();
    } catch (error:unknown) {
      console.error('İşlem hatası:', error);
      toast.error('İşlem sırasında bir hata oluştu');
    }
  };

  const success = (e:FormEvent)=>{
    e.preventDefault()
    toast.success('Hizmet başarıyla ayarlandi!');
  }



  // Düzenleme işlemi
  const handleEdit = (hizmet: Hizmet) => {
          setEditingHizmet(hizmet);
      setHizmetBaslik(hizmet.baslik);
      setHizmetAciklama(hizmet.aciklama);
      setHizmetResim(hizmet.resimUrl);
      setHizmetEkle(true);
      


  };

  // Formu sıfırla
  const resetForm = () => {
    setEditingHizmet(null);
    setHizmetBaslik('');
    setHizmetAciklama('');
    setHizmetResim('');
    setHizmetEkle(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Üst Başlık */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Hizmetler Yönetimi</h2>
          <button 
            onClick={() => setHizmetEkle(!hizmetEkle)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {hizmetEkle ? '- Formu Kapat' : '+ Yeni Hizmet Ekle'}
          </button>
        </div>

        {/* Hizmet Listesi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left pb-4 font-semibold text-gray-600">Hizmet Adı</th>
                    <th className="text-left pb-4 font-semibold text-gray-600">Açıklama</th>
                    <th className="text-left pb-4 font-semibold text-gray-600">Görsel</th>
                    <th className="text-right pb-4 font-semibold text-gray-600">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hizmetler.map((hizmet) => (
                    <tr key={hizmet._id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{hizmet.baslik}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-600">{hizmet.aciklama}</span>
                      </td>
                      <td className="py-4">
                        <Image src={hizmet.resimUrl} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end space-x-3">
                          <button 
                            onClick={() => handleEdit(hizmet)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Düzenle
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Form */}
        {hizmetEkle && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Yeni Hizmet Ekle</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet Adı</label>
                  <input 
                    type="text"
                    value={hizmetBaslik}
                    onChange={(e) => setHizmetBaslik(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Hizmet adını girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea 
                    value={hizmetAciklama}
                    onChange={(e) => setHizmetAciklama(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    rows={4}
                    placeholder="Hizmet açıklamasını girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Görsel</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {hizmetResim ? (
                          <Image 
                            src={hizmetResim} 
                            alt="Önizleme" 
                            className="h-32 object-cover rounded"
                          />
                        ) : (
                          <>
                            <span className="text-2xl mb-2">🖼️</span>
                            <p className="text-sm text-gray-500">Görsel yüklemek için tıklayın</p>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button 
                    type="submit"
                    onClick={success}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {editingHizmet ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
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

  const token = req.cookies[`accessToken`];

  if (!token) {
      return {
          redirect: {
              destination: '/seraphairstudio-panel',
              permanent: false,
          },
      };
  }

  try {
      await axios.get('https://serap-hair-studio.onrender.com/api/verify-token', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return {
          props: {
              user: { name: 'User Name' },
          },
      };
  } catch (error) {
      console.log('Access token expired or invalid:', error);

      return {
          redirect: {
              destination: '/seraphairstudio-panel',
              permanent: false,
          },
      };
  }
};


export default HizmetlerYonetimi; 