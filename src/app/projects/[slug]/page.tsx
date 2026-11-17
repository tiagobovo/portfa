import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Reveal, RevealImage, RevealText } from "@/components/AnimationWrapper";
import HashLink from "@/components/HashLink";
import type { ImageAsset, VideoAsset } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const description =
    project.summary ?? `${project.title} — ${project.category}${project.client ? ` para ${project.client}` : ""}. Portfólio de ${siteConfig.name}.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${siteConfig.name}`,
      description,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${siteConfig.name}`,
      description,
    },
  };
}

function TextBlock({ label, index, children }: { label: string; index: number; children: React.ReactNode }) {
  return (
    <Reveal className="grid grid-cols-12 gap-x-5 gap-y-4 border-t border-line pt-6">
      <h2 className="eyebrow col-span-12 flex gap-3 md:col-span-3">
        <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
        {label}
      </h2>
      <div className="col-span-12 text-xl leading-snug text-pretty md:col-span-9 md:text-2xl lg:col-span-8">{children}</div>
    </Reveal>
  );
}

/** Define quantas colunas cada peça ocupa, de acordo com tamanho e proporção. */
function imageSpan({ width = 1600, height = 1000 }: ImageAsset) {
  if (Math.max(width, height) <= 900) return { cell: "col-span-6 md:col-span-3", sizes: "(min-width: 768px) 25vw, 50vw" };
  if (width / height >= 1.15) return { cell: "col-span-12", sizes: "100vw" };
  return { cell: "col-span-12 sm:col-span-6", sizes: "(min-width: 640px) 50vw, 100vw" };
}

function videoSpan({ width, height }: VideoAsset) {
  const ratio = width / height;
  if (ratio < 0.8) return "col-span-6 md:col-span-4";
  if (ratio < 1.15) return "col-span-12 sm:col-span-6";
  return "col-span-12";
}

function Caption({ text }: { text?: string }) {
  return text ? <figcaption className="mt-3 text-sm text-muted">{text}</figcaption> : null;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const coverW = project.cover.width ?? 1600;
  const coverH = project.cover.height ?? 1000;

  const meta = [
    { label: "Cliente", value: project.client },
    { label: "Categoria", value: project.category },
    { label: "Ano", value: project.year },
    { label: "Função", value: project.role },
    { label: "Serviços", value: project.services?.join(", ") },
    {
      label: "Material",
      value: [
        `${1 + project.gallery.length} ${project.gallery.length ? "peças" : "peça"}`,
        project.videos?.length ? `${project.videos.length} ${project.videos.length === 1 ? "vídeo" : "vídeos"}` : null,
      ]
        .filter(Boolean)
        .join(" · "),
    },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  let n = 0;
  const hasLead = project.introduction || project.challenge || project.concept;
  const hasTail = project.development || project.result || project.metrics?.length;

  return (
    <article>
      {/* Cabeçalho */}
      <header className="container-editorial pt-[calc(var(--header-height)+2.5rem)]">
        <Reveal onView={false} y={0}>
          <HashLink
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Todos os projetos
          </HashLink>
        </Reveal>

        <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-8 md:mt-16">
          <Reveal onView={false} y={0} delay={0.1} className="col-span-12">
            <p className="eyebrow">{project.category}</p>
          </Reveal>
          <h1 className="col-span-12 text-[clamp(3rem,11vw,10rem)] leading-[0.9] font-medium tracking-[-0.055em] text-balance lg:col-span-11">
            <RevealText lines={[project.title]} delay={0.1} />
          </h1>
        </div>

        <Reveal onView={false} delay={0.35}>
          <dl className="mt-12 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-6 text-sm md:mt-16 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-muted">{m.label}</dt>
                <dd className="mt-1">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* Capa — exibida na proporção original, sem cortes */}
      <RevealImage onView={false} delay={0.25} className="container-editorial mt-10 md:mt-14">
        <div className="flex justify-center bg-surface">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={coverW}
            height={coverH}
            priority
            sizes="(min-width: 1680px) 1580px, 100vw"
            className="h-auto max-h-[88svh] w-auto max-w-full object-contain"
          />
        </div>
      </RevealImage>

      {hasLead && (
        <div className="container-editorial space-y-20 pt-20 md:space-y-32 md:pt-32">
          {project.introduction && (
            <TextBlock index={++n} label="Apresentação">
              <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] tracking-[-0.02em]">{project.introduction}</p>
            </TextBlock>
          )}
          {project.challenge && (
            <TextBlock index={++n} label="Desafio">
              <p>{project.challenge}</p>
            </TextBlock>
          )}
          {project.concept && (
            <TextBlock index={++n} label="Conceito criativo">
              <p>{project.concept}</p>
            </TextBlock>
          )}
        </div>
      )}

      {/* Galeria */}
      {project.gallery.length > 0 && (
        <section aria-label="Galeria de imagens" className="container-editorial mt-20 md:mt-32">
          <div className="grid grid-cols-12 gap-x-5 gap-y-5 md:gap-y-8">
            {project.gallery.map((img, i) => {
              const span = imageSpan(img);
              return (
                <Reveal key={img.src} as="figure" className={span.cell} delay={(i % 4) * 0.05}>
                  <div className="bg-surface">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width ?? 1600}
                      height={img.height ?? 1000}
                      sizes={span.sizes}
                      className="h-auto w-full"
                    />
                  </div>
                  <Caption text={img.caption} />
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Vídeos */}
      {project.videos && project.videos.length > 0 && (
        <section aria-label="Vídeos" className="container-editorial mt-20 md:mt-32">
          <h2 className="eyebrow border-t border-line pt-6">Vídeos</h2>
          <div className="mt-8 grid grid-cols-12 gap-5">
            {project.videos.map((v, i) => (
              <Reveal key={v.vimeoId} as="figure" className={videoSpan(v)} delay={(i % 3) * 0.05}>
                <div className="relative overflow-hidden bg-foreground" style={{ aspectRatio: `${v.width} / ${v.height}` }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${v.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                    title={v.title}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                  />
                </div>
                <Caption text={v.caption} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {hasTail && (
        <div className="container-editorial space-y-20 pt-20 md:space-y-32 md:pt-32">
          {project.development && (
            <TextBlock index={++n} label="Desenvolvimento">
              <p>{project.development}</p>
            </TextBlock>
          )}
          {(project.result || project.metrics?.length) && (
            <TextBlock index={++n} label="Resultado final">
              {project.result && <p>{project.result}</p>}
              {project.metrics && (
                <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="border-t border-foreground pt-4">
                      <dt className="text-sm text-muted">{m.label}</dt>
                      <dd className="mt-2 text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-medium tracking-[-0.05em]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </TextBlock>
          )}
        </div>
      )}

      {/* Próximo projeto */}
      <nav aria-label="Próximo projeto" className="mt-24 border-t border-line md:mt-36">
        <Link href={`/projects/${next.slug}`} className="group block">
          <div className="container-editorial grid grid-cols-12 items-end gap-x-5 gap-y-8 py-16 md:py-24">
            <div className="col-span-12 md:col-span-7">
              <p className="eyebrow">Próximo projeto</p>
              <p className="mt-6 text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.05em] text-balance transition-colors duration-500 group-hover:text-accent">
                {next.title}
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                {[next.category, next.client].filter(Boolean).join(" — ")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
            </div>
            <div className="relative col-span-12 aspect-[16/10] overflow-hidden bg-surface md:col-span-5">
              <Image
                src={next.cover.src}
                alt={next.cover.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </Link>
      </nav>
    </article>
  );
}
