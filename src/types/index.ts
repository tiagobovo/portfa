/** Referência de imagem usada em todo o site. */
export interface ImageAsset {
  /** URL externa ou caminho local (ex.: "/images/projeto/capa.jpg"). */
  src: string;
  /** Texto alternativo — descreva o conteúdo da imagem. */
  alt: string;
  /** Dimensões originais (permitem exibir a peça sem cortes). */
  width?: number;
  height?: number;
  /** Legenda opcional exibida abaixo da imagem. */
  caption?: string;
}

/** Vídeo hospedado no Vimeo. */
export interface VideoAsset {
  /** ID numérico do vídeo (ex.: "407587162" de vimeo.com/407587162). */
  vimeoId: string;
  title: string;
  width: number;
  height: number;
  caption?: string;
}

export type ProjectCategory =
  | "Branding & Identity"
  | "Art Direction"
  | "Advertising Campaigns"
  | "Digital Experiences"
  | "Graphic Design"
  | "Social Media"
  | "Photography"
  | "Creative Projects";

export interface ProjectMetric {
  value: string;
  label: string;
}

/**
 * Projeto do portfólio. Apenas slug, title, category e cover são
 * obrigatórios — as seções de texto aparecem somente quando preenchidas.
 */
export interface Project {
  /** Identificador usado na URL: /projects/[slug] */
  slug: string;
  title: string;
  category: ProjectCategory;
  year?: string;
  client?: string;
  role?: string;
  services?: string[];
  /** Descrição curta exibida no card da galeria. */
  summary?: string;
  /** Texto de apresentação da página do projeto. */
  introduction?: string;
  challenge?: string;
  concept?: string;
  development?: string;
  result?: string;
  metrics?: ProjectMetric[];
  cover: ImageAsset;
  gallery: ImageAsset[];
  videos?: VideoAsset[];
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}
