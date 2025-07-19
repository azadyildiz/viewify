import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Cloudflare Pages
  trailingSlash: true, // Required for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add aliases to resolve modules correctly in both main app and workers
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      'papaparse': path.resolve(__dirname, 'node_modules/papaparse'),
    };
    
    return config;
  },
}

export default nextConfig
