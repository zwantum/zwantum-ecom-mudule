import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: [
    '@zwantum/ui',
    '@zwantum/theme-contract',
    '@zwantum/theme-default',
    '@zwantum/storefront-core',
    '@zwantum/commerce-core',
    '@zwantum/shared-types',
  ],
  reactStrictMode: true,
};

export default nextConfig;
