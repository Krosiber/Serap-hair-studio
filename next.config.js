/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'serap-hair-studio.onrender.com',
      },
      // Eğer başka bir domain kullanıyorsanız onu da ekleyin
    ],
  },
}

module.exports = nextConfig 