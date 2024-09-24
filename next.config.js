/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gift-test.s3.amazonaws.com","res.cloudinary.com",'fkmpimages.flixcart.com']
  }
}

module.exports = nextConfig
