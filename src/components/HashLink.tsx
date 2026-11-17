"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ComponentProps, type MouseEvent } from "react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

/**
 * Link para âncoras da home (ex.: "/#projects").
 * Na própria home, rola suavemente até a seção; em outras páginas, navega
 * para a home e o <ScrollToHash /> conclui a rolagem.
 */
export default function HashLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const [path, hash] = href.split("#");
    if (!hash || (path || "/") !== pathname) return;
    e.preventDefault();
    window.history.pushState(null, "", `#${hash}`);
    // Pequeno atraso para o menu mobile liberar o scroll do body antes
    window.setTimeout(() => scrollToId(hash), 30);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}

/** Ao carregar a página com #hash na URL, rola até a seção correspondente. */
export function ScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => scrollToId(id), 120);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
