import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Reveal, RevealImage } from "./AnimationWrapper";

export default function About() {
  const { about } = siteConfig;
  const stats = [
    { value: String(about.agencies.length), label: "Agências" },
    { value: `${about.clients.length}+`, label: "Marcas atendidas" },
    { value: String(about.education.length), label: "Formações" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-36">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-5 border-t border-line pt-8">
          <p className="eyebrow col-span-12 md:col-span-3">{about.eyebrow}</p>
          <Reveal className="col-span-12 mt-6 md:col-span-9 md:mt-0">
            <h2
              id="about-title"
              className="max-w-5xl text-[clamp(2.25rem,5.5vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.045em] text-balance"
            >
              {about.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-5 gap-y-14 md:mt-24">
          {/* Imagem / marca */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-[calc(var(--header-height)+2rem)]">
              <RevealImage className="flex aspect-[4/5] items-center justify-center bg-surface p-10">
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  width={about.image.width}
                  height={about.image.height}
                  sizes="(min-width: 768px) 30vw, 80vw"
                  className="h-auto w-full max-w-xs"
                />
              </RevealImage>
              <p className="mt-3 flex justify-between text-xs text-muted">
                <span>{siteConfig.name}</span>
                <span>{siteConfig.role}</span>
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <dl className="grid grid-cols-3 gap-5 border-y border-line py-8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[clamp(2.25rem,5vw,4rem)] leading-none font-medium tracking-[-0.05em] tabular-nums">
                    {s.value}
                  </dd>
                  <dd className="mt-3 text-sm text-muted" aria-hidden>
                    {s.label}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <div className="mt-14 grid gap-12 sm:grid-cols-2">
              <Reveal>
                <h3 className="eyebrow">Formação</h3>
                <ul className="mt-5 divide-y divide-line border-t border-line">
                  {about.education.map((e, i) => (
                    <li key={e.school} className="flex items-baseline gap-4 py-3">
                      <span className="text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        {e.school}
                        <span className="block text-sm text-muted">{e.course}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08}>
                <h3 className="eyebrow">Passagens por</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {about.agencies.map((agency) => (
                    <li
                      key={agency}
                      className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:border-foreground"
                    >
                      {agency}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="mt-14">
              <h3 className="eyebrow">Clientes com quem já trabalhei</h3>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-lg leading-relaxed text-pretty md:text-xl">
                {about.clients.map((client, i) => (
                  <li key={client} className={i % 2 ? "text-muted" : ""}>
                    {client}
                    {i < about.clients.length - 1 && <span className="text-muted">,</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
