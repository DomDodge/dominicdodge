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
    // Keep the old PHP URL working; it's served by app/api/sizzle/search/route.ts
    return [
      {
        source: "/sizzle/search.php",
        destination: "/api/sizzle/search",
      },
    ];
  },
};

export default nextConfig;
