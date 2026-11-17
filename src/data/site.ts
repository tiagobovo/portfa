import { images } from "./images";
import type { NavItem, SocialLink } from "@/types";

/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * -----------------------------------------------------------------------------
 * Altere aqui nome, logo, cores, textos, redes sociais e e-mail.
 * Projetos ficam em src/data/projects.ts e imagens em src/data/images.ts.
 * Fontes (tipografia) ficam em src/app/fonts.ts.
 */
export const siteConfig = {
  name: "Tiago Bovo",
  /** Logo: texto exibido no topo. Para usar imagem, defina `image` (ex.: "/logo.svg"). */
  logo: {
    text: "Tiago Bovo",
    image: null as string | null,
  },
  role: "Art Director",
  url: "https://www.seudominio.com",
  location: "São Paulo, Brasil",
  locale: "pt_BR",
  lang: "pt-BR",

  /** Cores do site. O `accent` é a cor de destaque usada em detalhes. */
  theme: {
    background: "#F7F7F5",
    foreground: "#171717",
    muted: "#737373",
    border: "#E2E2DE",
    surface: "#EFEFEC",
    accent: "#FF4F1F",
  },

  seo: {
    title: "Tiago Bovo — Art Director",
    description:
      "Portfólio de Tiago Bovo, diretor de arte. Campanhas, ações e conteúdos para Claro, Harley-Davidson, TIM, Citroën, Hyundai, Unilever e outras marcas.",
    keywords: ["Tiago Bovo", "diretor de arte", "direção de arte", "publicidade", "campanhas", "portfólio"],
  },

  nav: [
    { label: "Projetos", href: "/#projects" },
    { label: "Sobre", href: "/#about" },
    { label: "Contato", href: "/#contact" },
  ] satisfies NavItem[],

  availability: {
    available: true,
    text: "Disponível para novos projetos",
  },

  hero: {
    eyebrow: "Portfólio",
    titleLines: ["Creative", "Direction", "& Design"],
    intro:
      "Transformando ideias em experiências visuais, marcas e projetos que conectam criatividade, estratégia e design.",
    cta: { label: "Explorar projetos", href: "/#projects" },
    image: {
      ...images.hero,
      alt: "Key visual da campanha Acelera 5G Claro com carro de Fórmula 1",
    },
  },

  projectsSection: {
    eyebrow: "Trabalhos selecionados",
    title: "Projetos",
    intro:
      "Campanhas, ações e conteúdos para marcas como Claro, Harley-Davidson, TIM, Citroën, Hyundai e Unilever.",
  },

  about: {
    eyebrow: "Sobre",
    title: "Diretor de arte com passagens por W/Brasil, Leo Burnett, ID/TBWA e Borghi/Lowe.",
    /** Imagem da seção Sobre. Troque por uma foto sua quando quiser. */
    image: {
      ...images.logo,
      alt: "Logo TB — Tiago Bovo, Art Director",
    },
    education: [
      { school: "FIAM", course: "Publicidade e Propaganda" },
      { school: "Escola Panamericana de Artes", course: "Criação Publicitária" },
      { school: "Miami Ad School / ESPM", course: "Direção de Arte" },
    ],
    agencies: [
      "W/Brasil",
      "Comunicação FAM",
      "StrawberryFrog Brasil",
      "Borghi/Lowe",
      "Moma Propaganda",
      "Havas/Z+",
      "ID/TBWA",
      "Leo Burnett",
    ],
    clients: [
      "Unilever (Axe, OMO, SKIP, Vivere, Magnum, Kibon, Fruttare, Rexona, Close Up, Clear, TRESemmé, Knorr)",
      "Yamaha",
      "Luper",
      "Aché",
      "Pharmaton",
      "Anador",
      "Bic",
      "Rubbermaid",
      "Lifebuoy",
      "LFG/Anhanguera",
      "FEI",
      "Stella Artois",
      "UOL",
      "KY",
      "Shopping Iguatemi",
      "Caixa Econômica Federal",
      "Sharp",
      "Unimed Seguros",
      "Super Bonder (Loctite)",
      "Toddynho (PepsiCo)",
      "Asics",
      "CCSP",
      "KIA",
      "Mercedes-Benz",
      "Intelbras",
      "Harley-Davidson",
      "Hyundai",
      "Subaru",
      "Cinemark",
      "TIM",
      "Starbucks",
      "Claro",
      "Embratel",
      "Bradesco",
    ],
  },

  contact: {
    eyebrow: "Contato",
    heading: "Vamos criar algo incrível juntos?",
    text: "Conte sobre seu projeto, ideia ou desafio.",
    email: "tiagobbovo@gmail.com",
    phone: {
      display: "(11) 99177-4379",
      href: "tel:+5511991774379",
      whatsapp: "https://wa.me/5511991774379",
    },
    /**
     * Endpoint para envio do formulário (ex.: Formspree, Getform, Basin ou
     * uma API própria). Recebe um POST em JSON com { name, email, subject, message }.
     * Se ficar vazio, o formulário abre o app de e-mail do visitante (mailto).
     * Exemplo: "https://formspree.io/f/SEU_ID"
     */
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
    subjects: ["Novo projeto", "Direção de arte", "Campanha", "Social media", "Outro assunto"],
  },

  /** Redes sociais — adicione aqui (ex.: { label: "Instagram", handle: "@...", href: "https://..." }). */
  socials: [] as SocialLink[],
} as const;

export type SiteConfig = typeof siteConfig;
