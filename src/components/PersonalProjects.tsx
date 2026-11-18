import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal, RevealCard } from "./AnimationWrapper";

type Item = (typeof siteConfig.personalProjects.items)[number];

/** Textura de papel (ruído SVG) usada nos cartazes. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Borda rasgada irregular do papel. */
const TORN =
  "polygon(0% 1.2%, 6% 0%, 13% 1%, 21% .2%, 30% 1.1%, 38% .3%, 47% 1.3%, 55% .1%, 64% 1%, 72% .2%, 81% 1.2%, 89% .3%, 95% 1%, 100% .4%, 99.4% 9%, 100% 18%, 99.2% 27%, 100% 37%, 99.3% 48%, 100% 58%, 99.1% 69%, 100% 80%, 99.4% 90%, 100% 99.2%, 93% 100%, 85% 99.1%, 76% 100%, 67% 99.3%, 58% 100%, 49% 99%, 40% 100%, 31% 99.2%, 22% 100%, 13% 99.1%, 5% 100%, 0% 99.3%, .7% 90%, 0% 80%, .8% 70%, 0% 59%, .6% 48%, 0% 37%, .9% 26%, 0% 15%, .5% 6%)";

const instagramUrl = (handle: string) => `https://www.instagram.com/${handle}/`;

function LambePoster({ item, index }: { item: Item; index: number }) {
  const [top, bottom] = item.poster;
  const accent = item.tone === "accent";
  const tilt = index % 2 === 0 ? "-rotate-[1.8deg]" : "rotate-[1.4deg]";
  const href = item.handle ? instagramUrl(item.handle) : undefined;
  const Tag = href ? "a" : "div";

  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={href ? `${top} ${bottom} — abrir @${item.handle} no Instagram` : `${top} ${bottom} — em breve`}
      className="group relative block focus-visible:outline-offset-8"
    >
      <div
        className={`relative aspect-[4/5] ${tilt} transition-transform duration-700 ease-editorial group-hover:rotate-0 group-hover:scale-[1.015] motion-reduce:transition-none`}
        style={{ filter: "drop-shadow(0 18px 22px rgb(0 0 0 / .16)) drop-shadow(0 2px 2px rgb(0 0 0 / .12))" }}
      >
        {/* Papel */}
        <div
          className={`absolute inset-0 overflow-hidden ${accent ? "bg-accent" : "bg-[#efe9dc]"}`}
          style={{ clipPath: TORN }}
        >
          {/* Vincos de cola */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(103deg, transparent 31%, rgb(255 255 255 / .35) 32%, transparent 34%), linear-gradient(77deg, transparent 62%, rgb(0 0 0 / .10) 63%, transparent 65%), linear-gradient(176deg, transparent 44%, rgb(255 255 255 / .28) 45%, transparent 47%), linear-gradient(8deg, transparent 80%, rgb(0 0 0 / .08) 81%, transparent 83%)",
            }}
          />
          {/* Granulado */}
          <div aria-hidden className="absolute inset-0 opacity-50 mix-blend-multiply" style={{ backgroundImage: GRAIN }} />

          {/* Conteúdo do cartaz */}
          <div className="relative flex h-full flex-col justify-between p-[7%] text-[#111]">
            <div className="flex items-start justify-between font-display text-[clamp(.85rem,1.4vw,1.15rem)] tracking-[0.12em] uppercase">
              <span>Projeto pessoal</span>
              <span>Nº {String(index + 1).padStart(2, "0")}</span>
            </div>

            <p
              className="font-display leading-[0.8] tracking-[-0.01em] uppercase"
              style={{ fontSize: "clamp(5.5rem, 15vw, 15rem)" }}
            >
              <span className="block">{top}</span>
              <span
                className={`mt-[0.1em] inline-block px-[0.07em] pt-[0.14em] pb-[0.02em] leading-[0.82] ${accent ? "bg-[#111] text-accent" : "bg-accent text-[#111]"}`}
              >
                {bottom}
              </span>
            </p>

            <div className="flex items-end justify-between gap-4 border-t-2 border-[#111] pt-[4%] font-display text-[clamp(1rem,1.8vw,1.5rem)] tracking-[0.06em] uppercase">
              <span className="truncate">{item.handle ? `@${item.handle}` : "Em breve"}</span>
              {href && (
                <span className="flex shrink-0 items-center gap-1">
                  Instagram
                  <ArrowUpRight className="size-[1.1em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Fita adesiva */}
        <span aria-hidden className="absolute -top-3 left-[14%] h-7 w-[26%] -rotate-[7deg] bg-[#f4ecd6]/80 shadow-sm backdrop-blur-[1px]" />
        <span aria-hidden className="absolute -top-2 right-[12%] h-7 w-[22%] rotate-[5deg] bg-[#f4ecd6]/80 shadow-sm backdrop-blur-[1px]" />
      </div>
    </Tag>
  );
}

function InstagramFeed({ item }: { item: Item }) {
  if (!item.handle) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-line p-8 text-center text-sm text-muted">
        O feed aparece aqui assim que o perfil for adicionado.
      </div>
    );
  }
  return (
    <div className="@container overflow-hidden rounded-[14px] border border-line bg-white">
      <iframe
        src={`https://www.instagram.com/${item.handle}/embed/`}
        title={`Feed do Instagram @${item.handle}`}
        loading="lazy"
        scrolling="no"
        className="block w-full border-0"
        style={{ height: "calc(66.7cqw + 118px)" }}
      />
      <a
        href={instagramUrl(item.handle)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between border-t border-line px-5 py-4 text-sm transition-colors hover:bg-surface"
      >
        <span>Ver perfil completo</span>
        <span className="flex items-center gap-1 text-muted group-hover:text-foreground">
          @{item.handle}
          <ArrowUpRight className="size-4" />
        </span>
      </a>
    </div>
  );
}

/** Seção "Projetos pessoais": cartazes lambe-lambe + feeds do Instagram. */
export default function PersonalProjects() {
  const { personalProjects } = siteConfig;

  return (
    <section id="pessoais" aria-labelledby="pessoais-title" className="py-24 md:py-32">
      <div className="container-editorial">
        <header className="grid grid-cols-12 gap-x-5 gap-y-6 border-t border-line pt-8">
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow">{personalProjects.eyebrow}</p>
            <h2 id="pessoais-title" className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
              {personalProjects.title}
            </h2>
          </div>
          <Reveal className="col-span-12 self-end md:col-span-4 md:col-start-9">
            <p className="text-muted text-pretty">{personalProjects.intro}</p>
          </Reveal>
        </header>

        <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-20 md:grid-cols-2 lg:gap-x-14">
          {personalProjects.items.map((item, i) => (
            <RevealCard key={item.id} delay={i * 0.12}>
              <div className="px-2 pt-3 md:px-4">
                <LambePoster item={item} index={i} />
              </div>
              <div className="mt-12">
                <InstagramFeed item={item} />
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
