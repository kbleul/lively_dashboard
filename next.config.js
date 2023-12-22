/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lively-auth.unravelplc.com",
        protocol: "https",
      },
      {
        hostname: "lively-wellbeing.unravelplc.com",
        protocol: "https",
      },
      {
        hostname: "wellbeing.lively-et.com",
        protocol: "https",
      },
      {
        hostname: "api.lively-et.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
