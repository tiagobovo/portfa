import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-editorial flex min-h-[80svh] flex-col justify-center pt-[var(--header-height)]">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-medium tracking-[-0.05em]">
        Página não <span className="font-serif font-normal italic text-accent">encontrada</span>
      </h1>
      <Link
        href="/"
        className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-foreground px-5 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Voltar para o início
      </Link>
    </section>
  );
}
