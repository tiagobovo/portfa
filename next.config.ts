import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // As imagens do portfólio ficam em /public/images. Para usar imagens de
    // um domínio externo, adicione-o aqui:
    // remotePatterns: [{ protocol: "https", hostname: "exemplo.com" }],
  },
};

export default nextConfig;
