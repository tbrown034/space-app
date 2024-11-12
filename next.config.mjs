/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        pathname: "/**", // Allow all paths under this domain (NASA APOD images)
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "/**", // Allow all paths under this domain (DALL-E AI images)
      },
      {
        protocol: "https",
        hostname: "syuyftzii9ljt57t.public.blob.vercel-storage.com",
        pathname: "/**", // Allow all paths under this Vercel Blob domain
      },
    ],
  },
};

export default nextConfig;
