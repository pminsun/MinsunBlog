/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "www.notion.so",
      "localhost",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "firebasestorage.googleapis.com",
      "plus.unsplash.com",
      "dxf0ufub2j2u1.cloudfront.net",
    ],
  },
};

module.exports = nextConfig;
