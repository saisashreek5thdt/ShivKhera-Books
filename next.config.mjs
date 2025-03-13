/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scary.land",
      },
    ],
  },
};

export default nextConfig;
