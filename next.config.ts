import * as process from "process";

import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  basePath: "",
  env: {
    NEXT_PUBLIC_API_URL: API_URL
  },
  reactStrictMode: true,
  rewrites: async () => [
    {
      destination: `${API_URL}/api/:path*`,
      source: "/api/:path*"
    }
  ]
};

export default nextConfig;
