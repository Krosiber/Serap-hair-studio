import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'serap-hair-studio.onrender.com',
    
      },
    ],
  },
};

export default nextConfig;
