import HashLink from "./HashLink";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-editorial">
        <div className="grid grid-cols-2 gap-8 border-t border-background/20 py-12 text-sm md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <p className="font-medium">{siteConfig.name}</p>
            <p className="mt-1 text-background/55">{siteConfig.role}</p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <HashLink href={item.href} className="link-underline">
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-2 md:col-span-3">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="link-underline break-all">
                E-mail
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.phone.href} className="link-underline">
                {siteConfig.contact.phone.display}
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.phone.whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline">
                WhatsApp
              </a>
            </li>
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="col-span-2 flex items-start md:col-span-2 md:justify-end">
            <a href="#main" className="group inline-flex items-center gap-2" aria-label="Voltar ao topo">
              Topo
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-background/30 transition-colors duration-300 group-hover:border-background group-hover:bg-background group-hover:text-foreground">
                <ArrowUp className="size-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-background/20 py-6 text-xs text-background/55 md:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>{siteConfig.location}</p>
        </div>

        {/* Assinatura tipográfica */}
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.18em] overflow-hidden text-[clamp(4rem,17.5vw,22rem)] leading-[0.8] font-medium tracking-[-0.06em] whitespace-nowrap select-none"
        >
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
