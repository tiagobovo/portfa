import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const alt = "Projeto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const MIME: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif" };

/** Lê a capa (local em /public ou remota) e devolve uma URL utilizável pelo gerador. */
async function coverDataUrl(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  const ext = src.split(".").pop()?.toLowerCase() ?? "png";
  const file = await readFile(join(process.cwd(), "public", src));
  return `data:${MIME[ext] ?? "image/png"};base64,${file.toString("base64")}`;
}

/** Imagem de compartilhamento de cada projeto: capa + título. */
export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const { theme } = siteConfig;
  const cover = project ? await coverDataUrl(project.cover.src).catch(() => null) : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: theme.foreground, position: "relative" }}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%" }} />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 64,
            color: "#fff",
            background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0) 60%)",
          }}
        >
          <span style={{ fontSize: 24, opacity: 0.85 }}>
            {project?.category} — {siteConfig.name}
          </span>
          <span style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4, marginTop: 12 }}>{project?.title}</span>
        </div>
      </div>
    ),
    size
  );
}
