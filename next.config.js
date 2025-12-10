/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oodrhdemavsenriojhar.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Optimize images for Vercel
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // ESLint configuration for build
  eslint: {
    // Warning: This allows production builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  // TypeScript configuration
  typescript: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  // Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Vercel-specific optimizations
  poweredByHeader: false,
  compress: true,
  // Generate source maps in production for debugging
  productionBrowserSourceMaps: false,
  // Optimize output for serverless
  output: 'standalone',
}

module.exports = nextConfig
