import AdminLayout from './layoutpage';
import "../tailwind.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface Kurumsal {
  hakkimizda: string;
  altbaslik: string;
  imgUrl: string;
}


const KurumsalYonetimi = () => {
  // State tanımlamaları
  const [formData, setFormData] = useState({
    hakkimizda: '',
    altbaslik: '',
    imgUrl: ''
  });

  const [kurumsal, setKurumsal] = useState<Kurumsal | null>(null);

  // Verileri getir
  const getKurumsal = async () => {
    try {
      const response = await axios.get('https://serap.alwaysdata.net/kurumsal');
      if (response.status === 200) {
        const data = response.data;
        setKurumsal(data);
        setFormData({
          hakkimizda: data.hakkimizda || '',
          altbaslik: data.altbaslik || '',
          imgUrl: data.imgUrl || ''
        });
      }
    } catch {
      toast.error('Bir hata oluştu');
    }
  };

  useEffect(() => {
    getKurumsal();
  }, []);

  // Form işlemleri
  const handleSubmit = async () => {
    try {
      await axios.put('https://serap.alwaysdata.net/kurumsal/update', formData);
      toast.success('Kurumsal bilgiler başarıyla güncellendi!');
      getKurumsal();
    } catch {
      toast.error('Güncelleme sırasında bir hata oluştu');
    }
  };

  // Resim yükleme
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('https://serap.alwaysdata.net/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFormData(prev => ({ ...prev, imgUrl: response.data.url }));
        toast.success('Görsel başarıyla yüklendi!');
      } catch {
        toast.error('Görsel yüklenirken bir hata oluştu');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Üst Başlık */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Kurumsal Sayfa Yönetimi</h2>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Güncelle
          </button>
        </div>

        {/* Mevcut Bilgiler Tablosu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mevcut Kurumsal Bilgiler</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-4 font-semibold text-gray-600">Hakkımızda</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Alt Başlık</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Görsel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-4">
                    <span className="font-medium text-gray-900">
                      {kurumsal?.hakkimizda ?? 'Henüz girilmemiş'}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-600">
                      {kurumsal?.altbaslik 
                        ? (kurumsal.altbaslik.length > 100 
                            ? kurumsal.altbaslik.substring(0, 100) + '...' 
                            : kurumsal.altbaslik)
                        : 'Henüz girilmemiş'}
                    </span>
                  </td>
                  <td className="py-4">
                    {kurumsal?.imgUrl ? (
                      <Image 
                        src={kurumsal.imgUrl} 
                        alt="Kurumsal Görsel" 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Görsel yok</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Düzenleme Formu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Hakkımızda Başlığı
              </label>
              <textarea 
                value={formData.hakkimizda}
                onChange={e => setFormData(prev => ({ ...prev, hakkimizda: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                rows={2}
                placeholder="Hakkımızda başlığını girin..."
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Alt Başlık
              </label>
              <textarea 
                value={formData.altbaslik}
                onChange={e => setFormData(prev => ({ ...prev, altbaslik: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                rows={6}
                placeholder="Alt başlık metnini girin..."
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Görsel
              </label>
              <div className="border-2 border-gray-200 border-dashed rounded-lg p-4">
                <input 
                  type="file" 
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                />
                <label 
                  htmlFor="imageUpload"
                  className="cursor-pointer block"
                >
                  {formData.imgUrl ? (
                    <Image 
                      src={formData.imgUrl} 
                      alt="Önizleme" 
                      className="h-48 w-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-center py-8">
                      <span className="text-3xl mb-2">🖼️</span>
                      <p className="text-gray-500">Görsel yüklemek için tıklayın</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
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
      await axios.get('https://serap.alwaysdata.net/verify-token', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return {
          props: {
              user: { name: 'User Name' },
          },
      };
  } catch {
      toast.error('Giriş başarısız');

      return {
          redirect: {
              destination: '/seraphairstudio-panel',
              permanent: false,
          },
      };
  }
};


export default KurumsalYonetimi; 