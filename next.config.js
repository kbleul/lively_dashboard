/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lively-auth.unravelplc.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
