import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  // Lets several dev servers run side by side without fighting over `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    // Keeps icon and Radix imports tree-shaken instead of pulling whole barrels.
    optimizePackageImports: ["lucide-react", "radix-ui"],
  },

  async headers() {
    return [
      {
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
