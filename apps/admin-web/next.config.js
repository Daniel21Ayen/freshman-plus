/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    '@freshman-plus/constants',
    '@freshman-plus/sdk',
    '@freshman-plus/types',
    '@freshman-plus/ui-tokens',
    '@freshman-plus/utils',
    '@freshman-plus/validation',
  ],
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};

module.exports = nextConfig;
