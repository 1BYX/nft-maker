/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

module.exports = nextConfig
