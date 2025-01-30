import AdminLayout from './layoutpage';
import Link from 'next/link';
import "../tailwind.css"
import axios from 'axios';
import { GetServerSideProps } from 'next';
const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Anasayfa Kartı */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🏠</span>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Ana Sayfa</h2>
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Banner Düzenle
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Galeri Yönetimi
                </li>
              </ul>
              
              <Link 
                href="/admin/anasayfa" 
                className="flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors"
              >
                Düzenle
              </Link>
            </div>
          </div>

          {/* Hizmetler Kartı */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">✂️</span>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Hizmetler</h2>
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Hizmet Listesi
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Yeni Hizmet Ekle
                </li>
              </ul>
              
              <Link 
                href="/admin/hizmetler" 
                className="flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors"
              >
                Düzenle
              </Link>
            </div>
          </div>

          {/* Kurumsal Kartı */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🏢</span>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Kurumsal</h2>
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Hakkımızda
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Vizyon & Misyon
                </li>
              </ul>
              
              <Link 
                href="/admin/kurumsal" 
                className="flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors"
              >
                Düzenle
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">📞</span>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">İletişim</h2>
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  İletişim Bilgileri
                </li>
              </ul>
              
              <Link 
                href="/admin/iletisim" 
                className="flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors"
              >
                Düzenle
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💬</span>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Yorumlar</h2>
                </div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Yorum Verileri
                </li>
              </ul>
              
              <Link 
                href="/admin/yorumlar" 
                className="flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors"
              >
                Düzenle
              </Link>
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
      await axios.get('http://localhost:5000/api/verify-token', {
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


export default AdminDashboard; 