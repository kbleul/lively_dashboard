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
        hostname: "wellbeing-dev.lively-et.com",
        protocol: "https",
      },
      {
        hostname: "api.lively-et.com",
        protocol: "https",
      },
      {
        hostname: "servicesdev.lively-et.com",
        protocol: "https",
      },
      {
        hostname: "services.lively-et.com",
        protocol: "https",
      },
      {
        hostname: "livelyexpertdev.azurewebsites.net",
        protocol: "https",
      },
      {
        hostname: "dashboard.lively-et.com",
        protocol: "https",
      },


    ],
  },
};

module.exports = nextConfig;

