import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['serap-hair-studio.onrender.com'], // remotePatterns yerine domains kullanalım
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'serap-hair-studio.onrender.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig; 