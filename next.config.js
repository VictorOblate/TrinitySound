/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'blob.vercelusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.usedExports = true;
    }
    return config;
  },
}

module.exports = nextConfig