/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.impact.com' },
      { protocol: 'https', hostname: 'images.impact.com' },
      { protocol: 'https', hostname: '**.fanatics.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
};

export default nextConfig;