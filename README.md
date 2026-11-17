# Portfólio Criativo — Tiago Bovo

Site de portfólio editorial feito com **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Framer Motion** e **Lucide React**.

## Rodar o projeto

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # servidor de desenvolvimento → http://localhost:3000
npm run build    # build de produção
npm run start    # roda o build de produção
```

Requisito: Node.js 20 ou mais recente.

---

## Onde editar cada coisa

Todo o conteúdo fica em `src/data/`. Os componentes visuais não precisam ser alterados para trocar textos, imagens ou cores.

| O que | Arquivo |
| --- | --- |
| Nome, logo, cargo, cidade, textos da home, Sobre, Contato, redes sociais, e-mail, SEO, **cores** | `src/data/site.ts` |
| Projetos (galeria + páginas individuais) | `src/data/projects.ts` |
| Imagens (todas as URLs em um único lugar) | `src/data/images.ts` |
| Tipografia (fontes) | `src/app/fonts.ts` |
| Layout do grid de projetos (proporções/colunas) | `src/components/ProjectGrid.tsx` → array `layouts` |

### Nome e logo
Em `site.ts`: `name` e `logo.text`. Para usar um logo em imagem, coloque o arquivo em `public/` (ex.: `public/logo.svg`) e defina `logo.image: "/logo.svg"`.

### Cores
Em `site.ts` → `theme`:
```ts
theme: {
  background: "#F7F7F5", // fundo off-white
  foreground: "#171717", // textos
  muted: "#737373",      // informações secundárias
  border: "#E2E2DE",     // linhas
  surface: "#EFEFEC",    // fundo de imagens carregando
  accent: "#FF4F1F",     // cor de destaque
}
```
No código, use as classes Tailwind `bg-accent`, `text-accent`, `text-muted`, `border-line` etc.

### Tipografia
Em `src/app/fonts.ts`, troque `Inter_Tight` / `Instrument_Serif` por qualquer fonte de `next/font/google`, mantendo o mesmo `variable`.

### Imagens
As peças ficam em `public/images/projects/<slug>/` (01.jpg, 02.png…). A **primeira imagem é a capa**; as demais formam a galeria.

Para adicionar ou trocar uma peça:
1. Coloque o arquivo na pasta do projeto (de preferência com no máximo 2560px no lado maior).
2. Registre em `src/data/images.ts`: `["03.jpg", largura, altura]`.
3. (Opcional) Descreva a imagem em `alts` / `captions` no projeto em `projects.ts`.

As dimensões fazem cada peça aparecer **na proporção original, sem cortes**. A galeria se organiza sozinha: peças horizontais em largura total, verticais/quadradas em pares e imagens pequenas (≤ 900px) em grade de 4. Tudo é otimizado pelo `next/image` (AVIF/WebP, lazy loading). GIFs animados são servidos como estão.

### Adicionar ou remover projetos
Em `projects.ts`, copie um bloco `{ ... }` e altere os campos. O `slug` vira a URL (`/projects/meu-projeto`) e deve ser igual ao nome da pasta de imagens. A ordem do array é a ordem da galeria.

Só `slug`, `title`, `category` e as imagens são obrigatórios. Os campos `client`, `year`, `summary`, `introduction`, `challenge`, `concept`, `development`, `result` e `metrics` aparecem no site **apenas quando preenchidos**.

### Vídeos (Vimeo)
No projeto, adicione:
```ts
videos: [vimeo("407587162", "Título do vídeo", 1920, 1080, "Legenda opcional")],
```
O número é o ID do vídeo (de `vimeo.com/407587162`); largura/altura definem a proporção (vídeos verticais ocupam menos espaço).

### Disponibilidade
Em `site.ts` → `availability.available: true | false` mostra/esconde o selo "Disponível para novos projetos".

---

## Formulário de contato

Configuração em `src/lib/contact.ts` e `site.ts → contact.formEndpoint`.

- **Sem endpoint (padrão):** ao enviar, o site abre o app de e-mail do visitante com a mensagem já preenchida para o seu e-mail.
- **Com serviço de formulários** (Formspree, Getform, Basin, ou uma API própria): crie o arquivo `.env.local` na raiz com
  ```
  NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/SEU_ID
  ```
  O formulário envia um `POST` em JSON com `{ name, email, subject, message }`.

Já inclui validação, mensagens de erro acessíveis e um campo oculto anti-spam (honeypot).

---

## Antes de publicar

- [ ] Trocar `url` em `site.ts` pelo seu domínio real (usado em SEO, sitemap e Open Graph)
- [ ] Trocar e-mail, redes sociais e textos provisórios do Sobre
- [ ] Substituir imagens e projetos fictícios
- [ ] Configurar o endpoint do formulário (opcional)

Publicação recomendada: [Vercel](https://vercel.com) (importe o repositório e pronto).

---

## Estrutura

```
src/
  app/
    layout.tsx              # HTML base, metadados, cores, fontes
    page.tsx                # Home: Hero, Projetos, Sobre, Contato
    template.tsx            # Transição entre páginas
    globals.css             # Tailwind + tokens de tema
    fonts.ts                # Tipografia
    not-found.tsx           # Página 404
    opengraph-image.tsx     # Imagem de compartilhamento gerada
    robots.ts / sitemap.ts  # SEO
    projects/[slug]/
      page.tsx              # Página individual do projeto
      opengraph-image.tsx   # Imagem de compartilhamento por projeto
  components/
    Header.tsx  Hero.tsx  ProjectGrid.tsx  ProjectCard.tsx
    About.tsx  Contact.tsx  Footer.tsx
    AnimationWrapper.tsx    # Reveal, RevealText, RevealImage, MotionProvider
    HashLink.tsx            # Rolagem suave para as âncoras da home
  data/
    site.ts  projects.ts  images.ts
  lib/
    contact.ts              # Validação e envio do formulário
  types/
    index.ts
```

## Acessibilidade e animações
- Respeita `prefers-reduced-motion` (animações de movimento são desativadas).
- Link "Pular para o conteúdo", foco visível, navegação por teclado, menu mobile fecha com `Esc`.
- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) e dados estruturados (schema.org `Person`).
