"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/types";

interface GridMotionProps {
  projects: Project[];
  /** Quantidade de linhas de miniaturas. */
  rows?: number;
  /** Largura ÷ altura de cada miniatura. */
  aspectRatio?: number;
  /** Espaço entre miniaturas (px). */
  gap?: number;
  /** Raio dos cantos (px). */
  radius?: number;
  /** Rotação da parede inteira (graus). */
  angle?: number;
  /** Velocidade de deslocamento das linhas (px/s). 0 = parado. */
  speed?: number;
  /** Quanto as linhas deslizam umas contra as outras com o mouse (0–1). */
  parallax?: number;
  /** Tamanho da área iluminada ao redor do cursor (0–1). 0 desliga. */
  spotlight?: number;
  /** Quanto as miniaturas fora da área iluminada escurecem (0–1). */
  dim?: number;
  /** Suavização das bordas laterais (0–1). */
  fade?: number;
  className?: string;
}

/**
 * Parede de miniaturas em movimento (inspirada no "Grid Motion" do React Bits).
 * As linhas deslizam em sentidos alternados, reagem ao ponteiro e iluminam
 * as peças sob o cursor. Cada miniatura leva à página do projeto.
 */
export default function GridMotion({
  projects,
  rows = 2,
  aspectRatio = 1.33,
  gap = 16,
  radius = 14,
  angle = 0,
  speed = 24,
  parallax = 0.5,
  spotlight = 0.6,
  dim = 0.35,
  fade = 0.5,
  className = "",
}: GridMotionProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Distribui os projetos entre as linhas (1º na linha 1, 2º na linha 2…)
  const rowItems = Array.from({ length: rows }, (_, r) => projects.filter((_, i) => i % rows === r));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const offsets = new Array(rows).fill(0);
    let pointerTarget = 0;
    let pointerX = 0;
    let visible = true;
    let last = performance.now();
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointerTarget = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      root.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      root.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };
    const onLeave = () => {
      pointerTarget = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });

    function tick(now: number) {
      if (!visible) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      pointerX += (pointerTarget - pointerX) * Math.min(dt * 4, 1);

      trackRefs.current.forEach((track, r) => {
        if (!track) return;
        const setWidth = track.scrollWidth / 2; // o conteúdo é duplicado para o loop
        if (!setWidth) return;
        const dir = r % 2 === 0 ? -1 : 1;
        if (!reduce) offsets[r] += dir * speed * dt;
        const shift = reduce ? 0 : pointerX * parallax * 160 * (r % 2 === 0 ? 1 : -1);
        let x = (offsets[r] + shift) % setWidth;
        if (x > 0) x -= setWidth;
        track.style.transform = `translate3d(${x}px,0,0)`;
      });
      frame = requestAnimationFrame(tick);
    }

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    io.observe(root);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [rows, speed, parallax, reduce]);

  const fadePct = Math.round(fade * 18);
  const mask = fade > 0 ? `linear-gradient(to right, transparent, #000 ${fadePct}%, #000 ${100 - fadePct}%, transparent)` : undefined;
  const spotSize = `${Math.round(spotlight * 55)}vmax`;

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          maskImage: mask,
          WebkitMaskImage: mask,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ gap, padding: `${gap}px 0`, transform: angle ? `rotate(${angle}deg) scale(1.3)` : undefined }}
      >
        {rowItems.map((items, r) => (
          <div key={r} className="min-h-0 flex-1">
            <div
              ref={(el) => {
                trackRefs.current[r] = el;
              }}
              className="flex h-full w-max will-change-transform"
              style={{ gap }}
            >
              {[0, 1].map((copy) =>
                items.map((project) => (
                  <Link
                    key={`${copy}-${project.slug}`}
                    href={`/projects/${project.slug}`}
                    aria-hidden={copy === 1 || undefined}
                    tabIndex={copy === 1 ? -1 : undefined}
                    aria-label={copy === 0 ? `${project.title} — ${project.category}` : undefined}
                    className="group relative block h-full shrink-0 overflow-hidden bg-surface focus-visible:outline-offset-[-4px]"
                    style={{ aspectRatio, borderRadius: radius }}
                  >
                    <Image
                      src={project.cover.src}
                      alt={copy === 0 ? project.cover.alt : ""}
                      fill
                      sizes="(min-width: 768px) 30vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.06]"
                    />
                    <span className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between gap-3 rounded-full bg-background/90 px-4 py-2 text-sm opacity-0 backdrop-blur transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <span className="truncate font-medium">{project.title}</span>
                      <span className="shrink-0 text-xs text-muted">{project.client ?? project.category}</span>
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Spotlight: escurece o que está longe do cursor */}
      {spotlight > 0 && dim > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle ${spotSize} at var(--spot-x) var(--spot-y), transparent 0%, transparent 35%, color-mix(in srgb, var(--background) ${Math.round(
              dim * 100
            )}%, transparent) 100%)`,
          }}
        />
      )}
    </div>
  );
}
