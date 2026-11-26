/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: publishes as plain HTML/CSS/JS (Vercel, Netlify, any CDN).
  // Remove `output` when the Payload/API backend is connected (see docs/INTEGRACOES.md).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
