/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle @base-ui with the app so Next does not emit a broken
  // `vendor-chunks/@base-ui.js` reference (common in dev on Windows).
  transpilePackages: ["@base-ui/react", "@base-ui/utils"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
