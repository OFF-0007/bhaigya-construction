import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.29.68",
    "localhost:3000",
    "10.35.149.202"
  ],
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};


export default nextConfig;