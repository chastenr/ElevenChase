import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "elevenchase.com" }],
        destination: "https://www.elevenchase.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
