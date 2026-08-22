import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "*": ["./content/**/*.md"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Vary",
            value:
              "Accept, Accept-Encoding, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "win98icons.alexmeub.com",
        port: "",
        pathname: "/icons/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname:
          "/system/resources/thumbnails/025/221/361/small_2x/cartoon-cat-cute-ai-generate-png.png",
      },
    ],
  },
};

export default nextConfig;
