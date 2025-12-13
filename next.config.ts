import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ],
      },
      // Configurações de Cache para arquivos estáticos
      {
        source: '/:path*.{jpg,jpeg,png,webp,avif,ico,svg}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ],
      },
      {
        source: '/:path*.{js,css}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ],
      },
      {
        source: '/:path*.{woff,woff2,ttf,eot}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ],
      },
    ]
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  trailingSlash: false,
}

export default nextConfig;