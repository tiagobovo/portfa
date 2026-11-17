import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import ProjectCard from "./ProjectCard";
import { Reveal, RevealText } from "./AnimationWrapper";

/**
 * Layout editorial assimétrico. Cada posição define colunas, deslocamento
 * e proporção da imagem. O padrão se repete caso existam mais projetos.
 */
const layouts = [
  { cell: "md:col-span-6 lg:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw" },
  { cell: "md:col-span-6 md:mt-24 lg:col-span-4 lg:col-start-9 lg:mt-40", aspect: "aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 100vw" },
  { cell: "md:col-span-6 lg:col-span-5 lg:col-start-2", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { cell: "md:col-span-6 md:mt-24 lg:col-span-5 lg:col-start-8 lg:mt-28", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { cell: "md:col-span-12", aspect: "aspect-[4/3] md:aspect-[21/9]", sizes: "100vw" },
  { cell: "md:col-span-6 lg:col-span-4", aspect: "aspect-[3/4]", sizes: "(min-width: 768px) 40vw, 100vw" },
  { cell: "md:col-span-6 md:mt-24 lg:col-span-6 lg:col-start-7 lg:mt-48", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 50vw, 100vw" },
  { cell: "md:col-span-12 lg:col-span-8 lg:col-start-3", aspect: "aspect-[16/10]", sizes: "(min-width: 1024px) 66vw, 100vw" },
] as const;

export default function ProjectGrid() {
  const { projectsSection } = siteConfig;

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 md:py-36">
      <div className="container-editorial">
        <header className="grid grid-cols-12 gap-x-5 gap-y-6 border-t border-line pt-8">
          <p className="eyebrow col-span-12 md:col-span-3">{projectsSection.eyebrow}</p>
          <h2
            id="projects-title"
            className="col-span-12 text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] font-medium tracking-[-0.05em] md:col-span-6"
          >
            <RevealText onView lines={[projectsSection.title]} />
          </h2>
          <Reveal className="col-span-12 self-end md:col-span-3">
            <p className="text-muted text-pretty">{projectsSection.intro}</p>
            <p className="mt-4 text-sm tabular-nums">({String(projects.length).padStart(2, "0")})</p>
          </Reveal>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-x-5 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-24 lg:gap-y-32">
          {projects.map((project, i) => {
            const layout = layouts[i % layouts.length];
            return (
              <Reveal key={project.slug} className={layout.cell} y={48}>
                <ProjectCard project={project} index={i} aspect={layout.aspect} sizes={layout.sizes} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
