import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Configure mp3 files as assets
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });
    return config;
  },
  // For Turbopack (the new, stable bundler), update loader settings here
  turbopack: {
    rules: {
      "*.mp3": ["file-loader"]
    }
  },
  // Optionally disable ESLint during builds (not recommended long term)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
