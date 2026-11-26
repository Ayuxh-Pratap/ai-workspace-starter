import path from 'node:path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  // settings is a dialog over the current page (`?settings=<section>`); its old paths and no-JavaScript links land on
  // the home page with the dialog open
  async redirects() {
    return [
      { source: '/settings', destination: '/?settings=workspace', permanent: false },
      { source: '/settings/:section', destination: '/?settings=:section', permanent: false },
    ];
  },
  // this project sits inside another folder with its own lockfile; pin the workspace root here
  turbopack: {
    root: path.resolve(import.meta.dirname),
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
