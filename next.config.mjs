/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ['tmpfiles.org'],
  },
};

export default nextConfig;
