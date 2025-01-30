
import React from "react";
import Link from "next/link";

const Custom404 = () => {

  return (
<section>
      <div className="border-b border-[#383838] h-screen flex flex-col items-center justify-center relative">
        <h2 className="text-4xl md:text-6xl lg:text-9xl mb-4">404 NOT FOUND</h2>
        <p className="text-xl md:text-3xl lg:text-5xl mb-4">Aradığınız sayfa bulunamadı!</p>
        <Link href="/">
        Ana sayfaya dön
        </Link>
      </div>
    </section>
   
  );
};

export default Custom404;
