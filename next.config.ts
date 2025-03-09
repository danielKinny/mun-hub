import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Set to true if you want a permanent redirect (301)
      },
    ];
  },
};

export default nextConfig;