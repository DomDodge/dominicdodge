import type { NextConfig } from "next";

// Standalone static sites living in /public/projects/<name>/
const staticProjects = ["emails", "qr"];

const nextConfig: NextConfig = {
  async redirects() {
    // Send /projects/<name> to its index.html so relative paths (style.css, images/) resolve correctly
    return staticProjects.map((name) => ({
      source: `/projects/${name}`,
      destination: `/projects/${name}/index.html`,
      permanent: false,
    }));
  },
  async rewrites() {
    // Keep the old PHP URLs working; they're served by app/api/sizzle/*/route.ts
    return [
      {
        source: "/sizzle/search.php",
        destination: "/api/sizzle/search",
      },
      {
        source: "/sizzle/cuisine.php",
        destination: "/api/sizzle/cuisine",
      },
    ];
  },
};

export default nextConfig;
