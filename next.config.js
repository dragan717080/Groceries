/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mjs/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    return config;
  },
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['files.insby.tech'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig;
