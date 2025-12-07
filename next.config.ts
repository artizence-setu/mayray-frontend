/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-35076b9037224f1eb01542a4a0f82ba3.r2.dev",
      },
    ],
  },
};

module.exports = nextConfig;
