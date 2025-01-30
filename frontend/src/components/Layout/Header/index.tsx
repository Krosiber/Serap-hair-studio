"use client"
import "./style.css"
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

  return (
    <header className="bgss text-white">
      <div className="container mx-auto py-4 flex justify-between items-center w-full">
        <div className="flex items-center lg:w-1/4">
          <button
            className="text-white text-2xl lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
          <Link href="/" className="text-2xl font-bold ml-4 lg:ml-0">
            <Image src="/images/logo.jpg" width={80} height={0} alt=""/>
          </Link>
        </div>
        <nav
          className={`${
             isMobileMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:justify-center lg:w-1/2`}
        >
          <Link href="/" className="block py-2 lg:py-0 lg:inline-block lg:mx-4">
            Anasayfa
          </Link>
          <Link href="/Hizmetler" className="block py-2 lg:py-0 lg:inline-block lg:mx-4">
            Hizmetler
          </Link>
          <Link href="/Kurumsal" className="block py-2 lg:py-0 lg:inline-block lg:mx-4">
            Kurumsal
          </Link>
          <Link href="/Neredeyiz" className="block py-2 lg:py-0 lg:inline-block lg:mx-4">
            Neredeyiz
          </Link>
          <Link href="/iletisim" className="block py-2 lg:py-0 lg:inline-block lg:mx-4">
          İletişim
          </Link>
        </nav>
        <div className="lg:w-1/4"></div>
      </div>
    </header>
  )
}

export default Header