"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface TextLoopProps {
  /** Frase repetida ao longo da curva. */
  text: string;
  /** Símbolo entre as repetições. */
  separator?: string;
  /** Velocidade ao longo do caminho (unidades/s). */
  speed?: number;
  direction?: "forward" | "reverse";
  /** Amplitude da onda. */
  curviness?: number;
  /** Comprimento de cada onda (unidades do viewBox de 1200 de largura). */
  wavelength?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  textColor?: string;
  ribbonColor?: string;
  ribbonWidth?: number;
  /** Contorno da fita — garante contraste quando a fita tem a cor do fundo. */
  ribbonStroke?: string;
  pauseOnHover?: boolean;
  className?: string;
  /** Texto para leitores de tela (a animação é decorativa). */
  label?: string;
}

const VB_W = 1200;
const MID_Y = 260;

/** Onda senoidal que ultrapassa as bordas, para as pontas nunca aparecerem. */
function wavePath(amplitude: number, wavelength: number) {
  const half = wavelength / 2;
  const start = -wavelength;
  let d = `M ${start} ${MID_Y} Q ${start + half / 2} ${MID_Y - amplitude * 2} ${start + half} ${MID_Y}`;
  for (let x = start + half; x < VB_W + wavelength; x += half) d += ` T ${x + half} ${MID_Y}`;
  return d;
}

/**
 * Letreiro contínuo que corre ao longo de uma fita ondulada
 * (inspirado no "Text Loop" do React Bits).
 */
export default function TextLoop({
  text,
  separator = "✦",
  speed = 90,
  direction = "forward",
  curviness = 70,
  wavelength = 760,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  textColor = "#090909",
  ribbonColor = "#ffffff",
  ribbonWidth = 86,
  ribbonStroke = "var(--border)",
  pauseOnHover = true,
  className = "",
  label,
}: TextLoopProps) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const phrase = `${uppercase ? text.toUpperCase() : text} ${separator} `;
  const repeats = 10;
  const d = wavePath(curviness, wavelength);
  const pad = ribbonWidth / 2 + 8;
  const viewBox = `0 ${MID_Y - curviness - pad} ${VB_W} ${(curviness + pad) * 2}`;

  useEffect(() => {
    const tp = textPathRef.current;
    const measure = measureRef.current;
    const root = rootRef.current;
    if (!tp || !measure || !root) return;

    let unit = 0;
    let offset = 0;
    let current = reduce ? 0 : speed;
    let target = current;
    let last = performance.now();
    let frame = 0;
    let visible = true;
    const sign = direction === "forward" ? -1 : 1;

    const measureUnit = () => {
      unit = measure.getComputedTextLength();
    };
    measureUnit();
    document.fonts?.ready.then(measureUnit);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      current += (target - current) * Math.min(dt * 5, 1);
      if (unit > 0) {
        offset = (offset + sign * current * dt) % unit;
        // Começa um "unit" antes para que o deslocamento nunca revele a ponta
        tp.setAttribute("startOffset", String(offset - unit));
      }
      if (visible) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    io.observe(root);

    const enter = () => {
      if (pauseOnHover) target = 0;
    };
    const leave = () => {
      target = reduce ? 0 : speed;
    };
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
    };
  }, [speed, direction, pauseOnHover, reduce, phrase]);

  const textStyle = {
    fontFamily: "var(--font-sans-family), ui-sans-serif, system-ui, sans-serif",
    fontSize,
    fontWeight,
    letterSpacing,
    whiteSpace: "pre",
  } as const;

  return (
    <div ref={rootRef} className={`w-full select-none ${className}`}>
      {label && <span className="sr-only">{label}</span>}
      <svg viewBox={viewBox} className="block h-auto w-full overflow-visible" aria-hidden>
        <defs>
          <path id={`loop-${id}`} d={d} />
        </defs>
        {ribbonStroke && (
          <use href={`#loop-${id}`} fill="none" stroke={ribbonStroke} strokeWidth={ribbonWidth + 3} />
        )}
        <use href={`#loop-${id}`} fill="none" stroke={ribbonColor} strokeWidth={ribbonWidth} />
        <text fill={textColor} style={textStyle} dominantBaseline="central">
          <textPath ref={textPathRef} href={`#loop-${id}`} startOffset="0">
            {phrase.repeat(repeats)}
          </textPath>
        </text>
        {/* Texto invisível usado só para medir o tamanho de uma repetição */}
        <text ref={measureRef} style={textStyle} opacity={0} x={0} y={-9999}>
          {phrase}
        </text>
      </svg>
    </div>
  );
}
