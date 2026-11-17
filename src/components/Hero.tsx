"use client";

import Image from "next/image";
import HashLink from "./HashLink";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { EASE, Reveal, RevealImage, RevealText } from "./AnimationWrapper";

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
    <section aria-labelledby="hero-title" className="relative pt-[calc(var(--header-height)+2rem)] pb-16 md:pb-24 lg:min-h-svh">
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

        <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-10 md:mt-14 lg:mt-16">
          <h1
            id="hero-title"
            className="col-span-12 text-[clamp(3.4rem,12.5vw,11.5rem)] leading-[0.86] font-medium tracking-[-0.055em] lg:col-span-8"
          >
            <span className="sr-only">{name} — </span>
            <RevealText lines={hero.titleLines.map(renderLine)} delay={0.2} />
          </h1>

          <RevealImage
            onView={false}
            delay={0.35}
            className="relative col-span-12 aspect-[4/3] overflow-hidden bg-surface sm:aspect-[16/10] lg:col-span-4 lg:aspect-square lg:self-end"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
            >
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-[22%_50%]"
              />
            </motion.div>
          </RevealImage>
        </div>

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
