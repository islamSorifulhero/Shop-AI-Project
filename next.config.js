/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'i.imgur.com',
      'fakestoreapi.com',
      'i.pravatar.cc' // এই লাইনটি যোগ করা হয়েছে
    ],
  },
}

module.exports = nextConfig