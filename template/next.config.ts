import type { NextConfig } from "next";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const {version} = require('./package.json');
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/{{basePath}}' : '';
const nrExternals = require('newrelic/load-externals')

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix: basePath,
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  images: {
    loader: 'custom',
    loaderFile: './loaders/image-loader.js',
  },
  outputFileTracingIncludes: { // https://github.com/vercel/vercel/issues/14098
    '/': ['./node_modules/newrelic/lib/util/is-string.js'],
  },
  serverExternalPackages: ['newrelic'],
  webpack: (config: NextConfig) => {
    config.resolve.alias.canvas = false;
    nrExternals(config);
    return config;
  }
};

export default nextConfig;
