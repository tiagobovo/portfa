"use client";

import Image from "next/image";
import HashLink from "./HashLink";
import { images } from "@/data/images";
import { ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal, RevealText } from "./AnimationWrapper";
import GridMotion from "./GridMotion";
import CircularText from "./CircularText";
import { projects } from "@/data/projects";

/** Destaca o caractere "&" com a fonte serifada itálica. */
function renderLine(line: string) {
  if (!line.includes("&")) return line;
  return line.split("&").map((part, i, arr) => (
    <span key={i}>
      {part}
      {i < arr.length - 1 && <span className="font-serif font-normal italic text-accent">&amp;</span>}
    </span>
  ));
}

export default function Hero() {
  const { hero, availability, name, role, location } = siteConfig;

  return (
    <section aria-labelledby="hero-title" className="relative pt-[calc(var(--header-height)+2rem)] pb-16 md:pb-24">
      <div className="container-editorial">
        {/* Linha de metadados */}
        <Reveal onView={false} y={0} delay={0.1}>
          <div className="grid grid-cols-2 gap-y-3 border-b border-line pb-5 text-sm md:grid-cols-12">
            <p className="col-span-2 md:col-span-5 lg:col-span-4">
              <span className="font-medium">{name}</span>
              <span className="text-muted"> — {role}</span>
            </p>
            <p className="hidden text-muted md:col-span-3 md:block">{location}</p>
            <p className="hidden text-muted lg:col-span-2 lg:block">{hero.eyebrow}</p>
            {availability.available && (
              <p className="col-span-2 flex items-center gap-2 md:col-span-4 md:justify-end lg:col-span-3">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {availability.text}
              </p>
            )}
          </div>
        </Reveal>

      </div>

      {/*
        Logo TB (menor) e, abaixo, a frase em caixa alta de ponta a ponta numa linha.
        O tamanho da letra acompanha a largura disponível (unidade cqw), então a
        frase sempre preenche a linha sem estourar.
      */}
      <div className="@container mt-10 px-[2px] md:mt-14 lg:mt-16">
        <Reveal onView={false} y={0} delay={0.15} className="pl-3 md:pl-4">
          {/* Logo TB com o texto girando ao redor */}
          <CircularText
            text={hero.ringText}
            label={hero.ringText.replace(/\*/g, " ")}
            spinDuration={20}
            onHover="speedUp"
            hoverTilt={15}
            startAngle={25}
            fontScale={0.095}
            fontWeight={900}
            className="size-[136px] md:size-[176px] xl:size-[200px]"
          >
            <Image
              src={images.mark.src}
              alt="TB"
              width={images.mark.width}
              height={images.mark.height}
              priority
              className="h-auto w-[40%]"
            />
          </CircularText>
        </Reveal>
        <h1
          id="hero-title"
          className="mt-4 text-[calc(100cqw/14.0)] leading-[0.86] font-medium tracking-[-0.065em] whitespace-nowrap uppercase md:mt-6"
        >
          <span className="sr-only">{name} — </span>
          <RevealText lines={[renderLine(hero.title)]} delay={0.2} />
        </h1>
      </div>

      {/* Parede animada com todos os projetos */}
      <Reveal
        onView={false}
        y={0}
        delay={0.45}
        className="mt-3 h-[40svh] min-h-[280px] md:mt-4 md:h-[min(60svh,560px)] md:min-h-[340px]"
      >
        <GridMotion projects={projects} rows={2} angle={0} />
      </Reveal>

      <div className="container-editorial">
        <div className="mt-12 grid grid-cols-12 items-end gap-x-5 gap-y-8 md:mt-16">
          <Reveal onView={false} delay={0.6} className="col-span-12 md:col-span-7 lg:col-span-5">
            <p className="text-xl leading-snug text-pretty md:text-2xl">{hero.intro}</p>
          </Reveal>

          <Reveal
            onView={false}
            delay={0.75}
            className="col-span-12 flex flex-wrap items-center gap-6 md:col-span-5 md:justify-end lg:col-span-7"
          >
            <HashLink
              href={hero.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-foreground py-4 pr-5 pl-6 text-sm font-medium text-background transition-[background-color,padding] duration-300 hover:bg-accent hover:pr-6"
            >
              {hero.cta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </HashLink>
            <span className="hidden items-center gap-2 text-sm text-muted lg:flex">
              <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
              Role para ver mais
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
