import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import ProjectCard from "./ProjectCard";
import { Reveal, RevealCard, RevealText } from "./AnimationWrapper";
import TextLoop from "./TextLoop";

export default function ProjectGrid() {
  const { projectsSection } = siteConfig;

  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-12 pb-24 md:pt-16 md:pb-36">
      {/* Fita animada com o nome */}
      <Reveal y={0} className="overflow-hidden py-2">
        {/* No celular a fita é ampliada (e cortada nas laterais) para o texto ficar legível */}
        <TextLoop
          text={projectsSection.loopText}
          label={projectsSection.loopText}
          curviness={70}
          textColor="#090909"
          ribbonColor="#ffffff"
          className="-ml-[40%] w-[180%]! md:ml-0 md:w-full!"
        />
      </Reveal>

      <div className="container-editorial mt-12 md:mt-16">
        <header className="grid grid-cols-12 gap-x-5 gap-y-6 border-t border-line pt-8">
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow">{projectsSection.eyebrow}</p>
            <h2 id="projects-title" className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
              <RevealText onView lines={[projectsSection.title]} />
            </h2>
          </div>
          <Reveal className="col-span-12 self-end md:col-span-4 md:col-start-9">
            <p className="text-muted text-pretty">{projectsSection.intro}</p>
            <p className="mt-4 text-sm tabular-nums">({String(projects.length).padStart(2, "0")})</p>
          </Reveal>
        </header>

        {/* Quadrados, dois por linha */}
        <div className="mt-14 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 md:mt-20 md:gap-x-3 md:gap-y-10">
          {projects.map((project, i) => (
            <RevealCard key={project.slug} delay={(i % 2) * 0.12}>
              <ProjectCard project={project} index={i} aspect="aspect-square" sizes="(min-width: 640px) 50vw, 100vw" />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
