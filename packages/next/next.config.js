const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Without this `next` doesn't correctly import the package.
    config.resolve.alias['react'] = path.resolve(__dirname, 'node_modules/react');

    return config;
  },
}

module.exports = nextConfig
