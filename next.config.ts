/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 従来のdomains設定も残しつつ、remotePatterns追加
    domains: ["images.unsplash.com", "unsplash.com"],
    remotePatterns: [
      // Instagram CDN設定
      {
        protocol: "https",
        hostname: "scontent-*.cdninstagram.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "instagram.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        port: "",
        pathname: "/**",
      },
      // Facebook/Meta CDNのその他のドメイン
      {
        protocol: "https",
        hostname: "scontent-*.fbcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
      // Unsplash設定（remotePatterns形式で追加）
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    // Instagram画像のキャッシュ設定
    minimumCacheTTL: 300, // 5分間キャッシュ
    dangerouslyAllowSVG: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // SEO optimizations
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
