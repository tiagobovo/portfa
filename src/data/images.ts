import type { ImageAsset } from "@/types";

/**
 * CENTRAL DE IMAGENS
 * -----------------------------------------------------------------------------
 * Todas as imagens ficam em /public/images. Para trocar ou adicionar:
 *   1. Coloque o arquivo na pasta do projeto: /public/images/projects/<slug>/
 *   2. Registre abaixo: [arquivo, largura, altura]
 * As dimensões permitem exibir cada peça na proporção original, sem cortes.
 */

type Entry = readonly [file: string, width: number, height: number];

const projectImages = {
  "acelera-5g-claro": [
    ["01.png", 1827, 1194],
    ["02.jpg", 1810, 2560],
    ["03.jpg", 1810, 2560],
    ["04.jpg", 1810, 2560],
    ["05.jpg", 1810, 2560],
    ["06.jpg", 1827, 1724],
    ["07.jpg", 1827, 1194],
    ["08.jpg", 2500, 1758],
    ["09.jpg", 2254, 1531],
    ["10.jpg", 2500, 1584],
    ["11.jpg", 2500, 1406],
  ],
  "harley-davidson": [
    ["01.jpg", 1827, 1194],
    ["02.jpg", 1827, 1194],
    ["03.jpg", 300, 300],
    ["04.jpg", 300, 300],
    ["05.jpg", 300, 300],
    ["06.jpg", 300, 300],
  ],
  "tim-touchwords": [["01.jpg", 1800, 1244]],
  citroen: [
    ["01.jpg", 1800, 1260],
    ["02.jpg", 1800, 1260],
    ["03.jpg", 1800, 1260],
  ],
  "filtro-claro-musica": [
    ["01.jpg", 750, 1029],
    ["02.png", 750, 1029],
    ["03.png", 750, 1029],
    ["04.png", 750, 1029],
  ],
  rocketman: [
    ["01.gif", 1827, 1194],
    ["02.jpg", 800, 800],
    ["03.jpg", 800, 800],
    ["04.jpg", 800, 800],
    ["05.jpg", 800, 800],
  ],
  "post-mundial-de-clubes": [["01.png", 2560, 1282]],
  "super-bowl": [["01.png", 1200, 675]],
  "dia-do-gamer": [
    ["01.png", 2400, 1200],
    ["02.png", 1827, 1194],
    ["03.png", 404, 402],
    ["04.png", 404, 402],
    ["05.png", 404, 402],
    ["06.png", 404, 402],
  ],
  "hyundai-triangulo": [["01.jpg", 1827, 1292]],
  swift: [
    ["01.png", 1297, 1837],
    ["02.png", 1297, 1837],
    ["03.png", 1301, 1837],
    ["04.jpg", 300, 300],
    ["05.jpg", 300, 300],
    ["06.jpg", 300, 300],
    ["07.jpg", 300, 300],
  ],
  "bic-bond": [["01.jpg", 1800, 1178]],
  "uol-travel": [
    ["01.jpg", 1827, 1292],
    ["02.jpg", 1827, 1292],
  ],
  "dove-caspa": [
    ["01.jpg", 2560, 1810],
    ["02.jpg", 2560, 1810],
  ],
  "close-up": [["01.jpg", 1800, 2451]],
  "claro-musica": [["01.jpg", 1280, 720]],
  acoes: [
    ["01.jpg", 1827, 1292],
    ["02.jpg", 1500, 1061],
    ["03.jpg", 1827, 1261],
    ["04.jpg", 1500, 1061],
  ],
  mesa: [
    ["01.png", 1827, 1194],
    ["02.png", 2250, 1125],
  ],
  extras: [
    ["01.png", 1827, 1194],
    ["02.gif", 900, 450],
    ["03.png", 1200, 675],
    ["04.png", 1200, 675],
    ["05.jpg", 1080, 1080],
    ["06.png", 1080, 1920],
  ],
} satisfies Record<string, readonly Entry[]>;

export type ProjectImageSlug = keyof typeof projectImages;

/**
 * Retorna as imagens de um projeto. A primeira é a capa.
 * `alts`/`captions` são opcionais, na mesma ordem dos arquivos.
 */
export function projectAssets(
  slug: ProjectImageSlug,
  title: string,
  options: { alts?: string[]; captions?: (string | undefined)[] } = {}
): ImageAsset[] {
  return projectImages[slug].map(([file, width, height], i) => ({
    src: `/images/projects/${slug}/${file}`,
    width,
    height,
    alt: options.alts?.[i] ?? `${title} — peça ${i + 1}`,
    caption: options.captions?.[i],
  }));
}

export const images = {
  logo: { src: "/images/brand/logo.png", width: 400, height: 149 },
  /** Apenas o símbolo TB (recortado do logo). */
  mark: { src: "/images/brand/tb.png", width: 137, height: 118 },
} as const;
