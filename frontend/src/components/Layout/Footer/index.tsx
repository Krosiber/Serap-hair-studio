import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaTiktok, FaPhone } from 'react-icons/fa';
import { FaEnvelope } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer>
    <div className="bgsss border-t border-gray-800 text-white">
        <div className="container mx-auto py-14 px-4">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-8 md:mb-0 md:mr-8">
                    <h2 className="pb-4 text-xl font-semibold">İletişim</h2>
                    <div className="font-light">
                        <div className="flex items-center mb-2">
                            <FaPhone className="mr-2 flex-shrink-0" />
                            <span>+90 534 819 30 08</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="mr-2 flex-shrink-0" />
                            <span className="hover:underline">
                                info@seraphairstudio.com
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mb-8 md:mb-0 md:mr-8">
                    <h2 className="pb-4 text-xl font-semibold">Sosyal Medya</h2>
                    <div className="flex flex-col font-light">
                        <Link className="py-2 hover:text-gray-300 transition-colors duration-300 flex items-center" href="https://www.instagram.com/seraphairstudio/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="mr-2 flex-shrink-0" />
                            <span>Instagram</span>
                        </Link>
                        <Link className="py-2 hover:text-gray-300 transition-colors duration-300 flex items-center" href="https://www.tiktok.com/@serapkuafor?lang=tr-TR" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className='mr-2 flex-shrink-0' />
                            <span>TikTok</span>
                        </Link>
                    </div>
                </div>
                <div>
                    <h2 className="pb-4 text-xl font-semibold">Çalışma Saatleri</h2>
                    <div className="font-light">
                        <p>Salı - Pazar: 09:30 - 20:30</p>
                        <p>Pazartesi: Kapalı</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="py-6 bgsss  border-t border-gray-800 ">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-400 px-4">
                <div className="text-sm mb-4 sm:mb-0">
                    <p>&copy; 2025 SerapHairStudio. Tüm Hakları Saklıdır</p>
                </div>
                <div className="text-sm">
                    <a href="/gizlilik-politikasi" className="hover:text-gray-300 transition-colors duration-300">Gizlilik Politikası</a>
                    <span className="mx-2">|</span>
                    <a href="/kullanim-kosullari" className="hover:text-gray-300 transition-colors duration-300">Kullanım Koşulları</a>
                </div>
            </div>
        </div>
    </div>
</footer>
    );
};


export default Footer
