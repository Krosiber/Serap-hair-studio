import axios from 'axios';
import AdminLayout from './layoutpage';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface GaleriItem {
  _id: string;
  resimUrl: string;
  createdAt: Date;
}



const AnasayfaYonetimi = () => {
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [resimUrl, setResimUrl] = useState('');
  const [editingItem, setEditingItem] = useState<GaleriItem | null>(null);

  const getGaleri = async () => {
    const response = await axios.get('https://serap-hair-studio.onrender.com/api/galeri');
    setGaleri(response.data);
  }

  useEffect(() => {
    getGaleri();
    
  }, []); 

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
        setResimUrl(response.data.url);
      } catch (error) {
        console.error('Resim yükleme hatası:', error);
      }
    }
  };

  const createGaleriItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!resimUrl) {
      toast.warning('Lütfen resim ekleyin');
      return;
    }

    try {
      const response = await axios.post('https://serap-hair-studio.onrender.com/api/galeriadd', {
        resimUrl
      });
      
      setGaleri(response.data);
      setResimUrl('');
      toast.success('Galeri öğesi başarıyla eklendi!');
    } catch (error) {
      console.error('Galeri ekleme hatası:', error);
      toast.error('Galeri eklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu öğeyi silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`https://serap-hair-studio.onrender.com/api/galeri/${id}`);
        getGaleri();
        toast.success('Öğe başarıyla silindi');
      } catch (error) {
        console.error('Silme hatası:', error);
        toast.error('Silme işlemi sırasında bir hata oluştu');
      }
    }
  };

  const handleEdit = (item: GaleriItem) => {
    setEditingItem(item);
    setResimUrl(item.resimUrl);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

    if (!editingItem) return;

    try {
      const response = await axios.put(`https://serap-hair-studio.onrender.com/api/galeri/${editingItem._id}`, {
        resimUrl: resimUrl
      });
      
      setGaleri(response.data);
      setEditingItem(null);
      setResimUrl('');
      toast.success('Başarıyla güncellendi!');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      toast.error('Güncelleme sırasında hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    
    if (editingItem) {
      await handleUpdate(e);
    } else {
      await createGaleriItem(e);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                {editingItem ? 'Galeri Öğesini Düzenle' : 'Yeni Galeri Öğesi Ekle'}
              </h2>
              <button type="submit" className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingItem ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resim</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {resimUrl && (
                    <Image 
                      src={resimUrl} 
                      alt="Önizleme" 
                      className="mt-2 h-32 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              {/* Galeri Listesi */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Galeri Listesi</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Toplam {galeri.length} öğe
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galeri.map((item: GaleriItem) => (
                    <div key={item._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col h-full">
                        {/* Resim kısmı */}
                        <div className="relative w-full pt-[75%]">  {/* 4:3 aspect ratio */}
                          {item.resimUrl && (
                            <Image 
                              src={item.resimUrl} 
                              alt="Galeri Öğesi"
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Bilgi ve butonlar */}
                        <div className="p-4 flex flex-col justify-between flex-grow">
                          <p className="text-sm text-gray-500 mb-4">
                            {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                          </p>

                          <div className="flex flex-col sm:flex-row gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="inline-flex items-center justify-center px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              Düzenle
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id)}
                              className="inline-flex items-center justify-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Boş Durum */}
                {galeri.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Galeri boş</h3>
                    <p className="mt-1 text-sm text-gray-500">Yeni resimler ekleyerek galeriye başlayın.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
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


export default AnasayfaYonetimi; 