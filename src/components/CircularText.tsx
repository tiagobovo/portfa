"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface CircularTextProps {
  /** Texto distribuído ao redor do círculo. Termine com um separador para o loop ficar contínuo. */
  text: string;
  /** Segundos para uma volta completa. 0 = parado. */
  spinDuration?: number;
  direction?: "clockwise" | "counterclockwise";
  /** O que acontece com o ponteiro em cima. */
  onHover?: "speedUp" | "slowDown" | "pause";
  /** Inclinação 3D máxima em direção ao ponteiro (graus). 0 desliga. */
  hoverTilt?: number;
  /** Posição do primeiro caractere, em graus a partir do topo. */
  startAngle?: number;
  /** Tamanho da letra em relação ao diâmetro (19px num círculo de 200px = 0.095). */
  fontScale?: number;
  fontWeight?: number;
  /** Classes de tamanho do círculo, ex.: "size-[200px]". */
  className?: string;
  /** Conteúdo no centro do círculo (ex.: logo). */
  children?: ReactNode;
  label?: string;
}

/**
 * Texto em círculo girando (inspirado no "Circular Text" do React Bits).
 * As letras ficam distribuídas de forma uniforme ao redor do anel.
 */
export default function CircularText({
  text,
  spinDuration = 20,
  direction = "clockwise",
  onHover = "speedUp",
  hoverTilt = 15,
  startAngle = 0,
  fontScale = 0.095,
  fontWeight = 900,
  className = "size-[200px]",
  children,
  label,
}: CircularTextProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const letters = Array.from(text);

  useEffect(() => {
    const root = rootRef.current;
    const tiltEl = tiltRef.current;
    const ring = ringRef.current;
    if (!root || !tiltEl || !ring) return;

    const base = spinDuration > 0 && !reduce ? 360 / spinDuration : 0; // graus/s
    const sign = direction === "clockwise" ? 1 : -1;
    const hoverFactor = onHover === "speedUp" ? 4 : onHover === "slowDown" ? 0.25 : 0;
    let speed = base;
    let target = base;
    let angle = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      speed += (target - speed) * Math.min(dt * 4, 1);
      angle = (angle + sign * speed * dt) % 360;
      ring.style.transform = `rotate(${angle}deg)`;
      cx += (tx - cx) * Math.min(dt * 8, 1);
      cy += (ty - cy) * Math.min(dt * 8, 1);
      tiltEl.style.transform = `perspective(800px) rotateX(${cy}deg) rotateY(${cx}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onEnter = () => {
      target = base * hoverFactor;
    };
    const onMove = (e: PointerEvent) => {
      if (!hoverTilt || reduce) return;
      const r = root.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = px * 2 * hoverTilt;
      ty = -py * 2 * hoverTilt;
    };
    const onLeave = () => {
      target = base;
      tx = 0;
      ty = 0;
    };
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [spinDuration, direction, onHover, hoverTilt, reduce]);

  return (
    <div ref={rootRef} className={`@container relative shrink-0 select-none ${className}`}>
      {label && <span className="sr-only">{label}</span>}
      <div ref={tiltRef} className="absolute inset-0 will-change-transform">
        <div ref={ringRef} className="absolute inset-0 will-change-transform" aria-hidden>
          {letters.map((ch, i) => (
            <span
              key={i}
              className="absolute top-0 left-1/2 h-1/2 origin-bottom text-center leading-none"
              style={{
                transform: `translateX(-50%) rotate(${startAngle + (360 / letters.length) * i}deg)`,
                fontSize: `${fontScale * 100}cqw`,
                fontWeight,
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
      </div>
    </div>
  );
}
