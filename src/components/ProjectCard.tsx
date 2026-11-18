import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Classe de proporção da imagem, ex.: "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
}

export default function ProjectCard({ project, index, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 50vw, 100vw" }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const meta = [project.category, project.year].filter(Boolean).join(", ");
  const pieces = 1 + project.gallery.length;
  const videos = project.videos?.length ?? 0;

  return (
    <article className="group">
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-offset-8"
        aria-label={`${project.title} — ${meta}`}
      >
        <div className={`relative overflow-hidden bg-surface ${aspect}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-editorial will-change-transform group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />

          {/* Camada de informações no hover (desktop) */}
          <div
            className="pointer-events-none absolute inset-0 hidden flex-col justify-between bg-gradient-to-t from-black/70 via-black/15 to-transparent p-6 opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100 md:flex lg:p-8"
            aria-hidden
          >
            <span className="inline-flex size-12 translate-y-2 items-center justify-center self-end rounded-full bg-background text-foreground transition-transform duration-500 ease-editorial group-hover:translate-y-0">
              <ArrowUpRight className="size-5" />
            </span>
            <div className="max-w-md translate-y-3 text-white transition-transform duration-500 ease-editorial group-hover:translate-y-0">
              {project.client && <p className="text-xs tracking-[0.14em] uppercase opacity-80">{project.client}</p>}
              {project.summary && <p className="mt-2 text-lg leading-snug text-pretty">{project.summary}</p>}
              <ul className="mt-4 flex flex-wrap gap-2">
                <li className="rounded-full border border-white/40 px-3 py-1 text-xs">
                  {pieces} {pieces === 1 ? "peça" : "peças"}
                </li>
                {videos > 0 && (
                  <li className="inline-flex items-center gap-1 rounded-full border border-white/40 px-3 py-1 text-xs">
                    <Play className="size-3" /> {videos} {videos === 1 ? "vídeo" : "vídeos"}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start justify-between gap-6 md:mt-4">
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-muted tabular-nums">{number}</span>
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-[1.75rem]">
                <span className="link-underline">{project.title}</span>
              </h3>
              {project.summary && <p className="mt-2 max-w-sm text-sm text-muted md:hidden">{project.summary}</p>}
            </div>
          </div>
          <div className="shrink-0 text-right text-sm">
            <p>{project.category}</p>
            {(project.year || project.client) && <p className="text-muted tabular-nums">{project.year ?? project.client}</p>}
          </div>
        </div>
      </Link>
    </article>
  );
}
