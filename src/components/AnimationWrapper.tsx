"use client";

import { MotionConfig, motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Configuração global de animações. `reducedMotion="user"` respeita a
 * preferência do sistema (prefers-reduced-motion): animações de movimento
 * são desativadas e apenas a opacidade é mantida.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  y?: number;
  as?: "div" | "section" | "li" | "p" | "span" | "figure" | "article" | "header";
  /** Anima apenas ao entrar na tela (padrão) ou imediatamente. */
  onView?: boolean;
}

/** Fade-in + leve subida ao entrar na viewport. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div", onView = true }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  const target = { opacity: 1, y: 0 };
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      {...(onView
        ? { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } }
        : { animate: target })}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const lineVariants: Variants = {
  hidden: { y: "105%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

interface RevealTextProps {
  /** Cada item é uma linha animada com máscara. */
  lines: readonly ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  onView?: boolean;
}

/**
 * Revela linhas de texto de baixo para cima, com máscara (efeito editorial).
 * O gatilho de visibilidade fica no contêiner externo, pois as linhas
 * começam escondidas pela máscara e nunca seriam "vistas" pelo observador.
 */
export function RevealText({ lines, className, lineClassName, delay = 0, onView = false }: RevealTextProps) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial={reduce ? false : "hidden"}
      {...(onView
        ? { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } }
        : { animate: "visible" })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className={`block ${lineClassName ?? ""}`} custom={i + delay / 0.08} variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Revelação de imagem: a máscara recua e a imagem desacelera o zoom. */
export function RevealImage({ children, className, delay = 0, onView = true }: { children: ReactNode; className?: string; delay?: number; onView?: boolean }) {
  const reduce = useReducedMotion();
  const visible = { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 };
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(12% 6% 12% 6%)", opacity: 0 }}
      {...(onView
        ? { whileInView: visible, viewport: { once: true, margin: "0px 0px -10% 0px" } }
        : { animate: visible })}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
