import { projectAssets, type ProjectImageSlug } from "./images";
import type { Project, VideoAsset } from "@/types";

/**
 * PROJETOS
 * -----------------------------------------------------------------------------
 * Cada objeto abaixo gera um card na galeria e uma página em /projects/[slug].
 * A ordem do array define a ordem de exibição.
 *
 * Campos opcionais (year, client, summary, introduction, challenge, concept,
 * development, result, metrics, videos) só aparecem no site quando preenchidos.
 *
 * As imagens de cada projeto são registradas em src/data/images.ts.
 */

/** Monta capa (1ª imagem) + galeria (demais) a partir da central de imagens. */
function media(slug: ProjectImageSlug, title: string, options?: Parameters<typeof projectAssets>[2]) {
  const [cover, ...gallery] = projectAssets(slug, title, options);
  return { cover, gallery };
}

const vimeo = (vimeoId: string, title: string, width: number, height: number, caption?: string): VideoAsset => ({
  vimeoId,
  title,
  width,
  height,
  caption,
});

export const projects: Project[] = [
  {
    slug: "acelera-5g-claro",
    title: "Acelera 5G Claro",
    category: "Advertising Campaigns",
    client: "Claro",
    summary: "Pôsteres ilustrados exclusivos para os GPs de Fórmula 1 pelo mundo.",
    introduction:
      "A Claro patrocinou o carro do piloto Carlos Peres na Fórmula 1, marcando presença em GPs pelo mundo com pôsteres ilustrados exclusivos. A mesma velocidade que vence nas pistas é a que conecta você com o 5G da Claro.",
    ...media("acelera-5g-claro", "Acelera 5G Claro", {
      alts: [
        "Key visual Acelera 5G Claro com carro de Fórmula 1",
        "Pôster ilustrado — GP de Suzuka",
        "Pôster ilustrado — GP do México",
        "Pôster ilustrado — GP de Sochi",
        "Pôster ilustrado — GP de Abu Dhabi",
        "Peça Acelera 5G Claro — Fórmula 1",
        "Painéis da campanha Fórmula 1",
        "Relógio digital em São Paulo com a campanha",
        "Mockup de display Fórmula 1 Claro",
        "Kit influenciador",
        "Celular com a campanha Claro",
      ],
    }),
  },
  {
    slug: "harley-davidson",
    title: "Harley-Davidson",
    category: "Advertising Campaigns",
    client: "Harley-Davidson",
    ...media("harley-davidson", "Harley-Davidson"),
  },
  {
    slug: "tim-touchwords",
    title: "TIM — TouchWords",
    category: "Creative Projects",
    client: "TIM",
    summary: "Dispositivo que transforma qualquer texto impresso em braile.",
    introduction:
      "Dispositivo da TIM que transforma qualquer texto impresso em braile. A câmera do celular lê o conteúdo, transmite via Bluetooth para uma capa especial e, em segundos, o texto vira sinais táteis acessíveis ao toque.",
    ...media("tim-touchwords", "TIM TouchWords", {
      alts: ["Prancha do projeto TIM TouchWords — capa que converte texto em braile"],
    }),
  },
  {
    slug: "citroen",
    title: "Citroën",
    category: "Advertising Campaigns",
    client: "Citroën",
    ...media("citroen", "Citroën", {
      alts: ["Peça Citroën — Chapeleiro", "Peça Citroën — Homem de Lata", "Peça Citroën — Kill Bill"],
    }),
  },
  {
    slug: "filtro-claro-musica",
    title: "Filtro Claro Música",
    category: "Social Media",
    client: "Claro",
    ...media("filtro-claro-musica", "Filtro Claro Música", {
      alts: [
        "Post de lançamento dos filtros Claro Música",
        "Filtro Claro Música — tela 1",
        "Filtro Claro Música — tela 2",
        "Filtro Claro Música — tela 3",
      ],
    }),
    videos: [
      vimeo("427209073", "Claro Stories", 1920, 1920),
      vimeo("430069719", "Filtro Claro Música em uso", 1920, 4240),
    ],
  },
  {
    slug: "rocketman",
    title: "Rocketman",
    category: "Advertising Campaigns",
    client: "Claro",
    ...media("rocketman", "Rocketman"),
  },
  {
    slug: "post-mundial-de-clubes",
    title: "Post Mundial de Clubes",
    category: "Social Media",
    client: "Claro",
    ...media("post-mundial-de-clubes", "Post Mundial de Clubes", {
      alts: ["Post “Os garotos de Liverpool que se preparem” — Mundial de Clubes"],
    }),
  },
  {
    slug: "super-bowl",
    title: "Post Super Bowl",
    category: "Social Media",
    ...media("super-bowl", "Post Super Bowl"),
  },
  {
    slug: "dia-do-gamer",
    title: "Post Dia do Gamer",
    category: "Social Media",
    ...media("dia-do-gamer", "Post Dia do Gamer", {
      alts: [
        "Post Dia do Gamer",
        "Prancha do post Dia do Gamer no Twitter",
        "Detalhe da ilustração",
        "Detalhe da ilustração",
        "Detalhe da ilustração",
        "Detalhe da ilustração",
      ],
    }),
  },
  {
    slug: "hyundai-triangulo",
    title: "Hyundai — Triângulo",
    category: "Creative Projects",
    client: "Hyundai",
    ...media("hyundai-triangulo", "Hyundai Triângulo", {
      alts: ["Prancha Sign Alert — triângulo de sinalização Hyundai"],
    }),
  },
  {
    slug: "swift",
    title: "Swift",
    category: "Advertising Campaigns",
    client: "Swift",
    ...media("swift", "Swift", {
      alts: ["Peça Swift — frango", "Peça Swift — porco", "Peça Swift — vaca"],
    }),
  },
  {
    slug: "bic-bond",
    title: "BIC / Bond",
    category: "Advertising Campaigns",
    client: "BIC",
    ...media("bic-bond", "BIC Bond"),
  },
  {
    slug: "uol-travel",
    title: "UOL Travel",
    category: "Advertising Campaigns",
    client: "UOL",
    ...media("uol-travel", "UOL Travel", {
      alts: ["Peça UOL Travel — barco", "Peça UOL Travel — bomba"],
    }),
  },
  {
    slug: "dove-caspa",
    title: "Dove — Caspa",
    category: "Advertising Campaigns",
    client: "Dove",
    ...media("dove-caspa", "Dove Caspa", {
      alts: ["Peça Dove Caspa — guarda", "Peça Dove Caspa — academia"],
    }),
  },
  {
    slug: "close-up",
    title: "Close Up",
    category: "Graphic Design",
    client: "Close Up",
    ...media("close-up", "Close Up", { alts: ["Encarte Close Up"] }),
  },
  {
    slug: "claro-musica",
    title: "Claro Música — Twitter",
    category: "Social Media",
    client: "Claro",
    ...media("claro-musica", "Claro Música", { alts: ["Frame do vídeo Claro Música — Ultra Velocidade"] }),
    videos: [
      vimeo("407587162", "Claro Música — Banda Líder", 1920, 1080),
      vimeo("407587813", "Claro Música — Now", 1920, 1080),
      vimeo("407588644", "Claro Música — 4.5G", 1920, 1080),
    ],
  },
  {
    slug: "acoes",
    title: "Ações",
    category: "Creative Projects",
    ...media("acoes", "Ações", {
      alts: ["Prancha ação Harley-Davidson — tirolesa", "Ação tênis-balança", "Prancha ação Cruz Verde", "Prancha ação Karaokê TIM"],
    }),
  },
  {
    slug: "mesa",
    title: "Mesa",
    category: "Social Media",
    ...media("mesa", "Mesa", { alts: ["Prancha Mesa no Twitter", "Post Mesas no Twitter"] }),
  },
  {
    slug: "extras",
    title: "Extras",
    category: "Social Media",
    client: "Claro",
    ...media("extras", "Extras", {
      alts: [
        "Post Passaporte Mundo",
        "Post La Casa de Papel",
        "Post El Clásico — opção 2",
        "Post El Clásico — opção 1",
        "Post Claro Música",
        "Storie Champions League",
      ],
      captions: [
        "Post — Passaporte Mundo",
        "Post — La Casa de Papel",
        "Post — El Clásico",
        "Post — El Clásico",
        "Post — Claro Música",
        "Storie — Champions League",
      ],
    }),
    videos: [
      vimeo("421964391", "Storie La Casa de Papel", 1920, 3413, "Storie — La Casa de Papel"),
      vimeo("421959110", "Storie Stranger Things", 1920, 3413, "Storie — Stranger Things"),
      vimeo("421959180", "Storie Stranger Things", 1920, 3413, "Storie — Stranger Things"),
      vimeo("421958411", "Post fixo Dúvidas", 1920, 1920, "Post fixo — Dúvidas"),
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Retorna o próximo projeto da lista (volta ao primeiro no final). */
export function getNextProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
