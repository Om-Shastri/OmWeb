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
    // Enable reading PDF files
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx', 'pdf'],
    // Ensure PDF files are handled correctly
    webpack: (config: import('next').NextConfig['webpack']) => {  // Specify the type for config
      if (!config) return; // Add null check for config
      (config as any).module.rules.push({
        test: /\.pdf$/,
        type: 'asset/resource'
      });
      
      // Maintain existing canvas configuration
      if (config) {
        (config as any).resolve.alias.canvas = false;
      }
      
      return config;
    },
    async headers() {
      return [
        {
          source: '/resume.pdf',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/pdf'
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; object-src 'self'; frame-src 'self'"
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            }
          ]
        }
      ];
    }
  };
  
  module.exports = nextConfig;