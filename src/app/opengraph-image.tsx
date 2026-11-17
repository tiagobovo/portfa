import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento (Open Graph) gerada automaticamente. */
export default function OpengraphImage() {
  const { theme } = siteConfig;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: theme.background,
          color: theme.foreground,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: theme.accent }} />
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: 0.9, letterSpacing: -6 }}>
          <span>Creative Direction</span>
          <span style={{ color: theme.accent }}>& Design</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: theme.muted }}>
          <span>{siteConfig.role}</span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
    ),
    size
  );
}
