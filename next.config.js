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
        hostname: "wellbeing.lively-et",
        protocol: "https",
      },
      {
        hostname: "api.lively-et",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
