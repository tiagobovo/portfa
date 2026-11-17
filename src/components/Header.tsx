"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { EASE } from "./AnimationWrapper";
import HashLink from "./HashLink";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Fundo do header ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao trocar de página
  useEffect(() => setOpen(false), [pathname]);

  // Trava o scroll e permite fechar com Esc
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled && !open
          ? "border-b border-line/70 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex h-[var(--header-height)] items-center justify-between">
        <Link
          href="/"
          className="relative z-[60] text-[0.95rem] font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — página inicial`}
        >
          {siteConfig.logo.image ? (
            <Image src={siteConfig.logo.image} alt={siteConfig.name} width={120} height={32} priority />
          ) : (
            <span className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-accent" aria-hidden />
              {siteConfig.logo.text}
            </span>
          )}
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-10 text-sm">
            {siteConfig.nav.map((item, i) => (
              <li key={item.href}>
                <HashLink href={item.href} className="group flex items-baseline gap-1.5">
                  <span className="text-[0.65rem] text-muted tabular-nums">0{i + 1}</span>
                  <span className="link-underline">{item.label}</span>
                </HashLink>
              </li>
            ))}
          </ul>
        </nav>

        <HashLink
          href="/#contact"
          className="group hidden items-center gap-1.5 rounded-full border border-foreground px-4 py-2 text-sm transition-colors duration-300 hover:bg-foreground hover:text-background md:inline-flex"
        >
          Vamos conversar
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </HashLink>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] -mr-2 inline-flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Navegação mobile" className="container-editorial flex flex-1 flex-col justify-center">
              <ul className="space-y-2">
                {siteConfig.nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                    >
                      <HashLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-1 text-6xl font-medium tracking-[-0.04em]"
                      >
                        <span className="text-sm font-normal tracking-normal text-muted tabular-nums">0{i + 1}</span>
                        {item.label}
                      </HashLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="container-editorial space-y-4 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a href={`mailto:${siteConfig.contact.email}`} className="block text-lg">
                {siteConfig.contact.email}
              </a>
              <ul className="flex gap-6 text-sm text-muted">
                {siteConfig.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
