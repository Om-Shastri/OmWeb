/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'omshastri.com',
          },
      ],
  },
};

module.exports = nextConfig;