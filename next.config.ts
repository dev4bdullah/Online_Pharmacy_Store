import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'picsum.photos', 
      'media.licdn.com',
      'sheraian-limited.s3.eu-north-1.amazonaws.com'
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    turbopack: {
      resolveAlias: {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      }
    }
  },
  transpilePackages: ['react-quill'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    };
    return config;
  }
};

export default nextConfig;