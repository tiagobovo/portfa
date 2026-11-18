import { projects } from "@/data/projects";
import GridMotion from "./GridMotion";
import HashLink from "./HashLink";
import { Reveal } from "./AnimationWrapper";

/** Faixa com todos os projetos em movimento (Grid Motion), logo após o hero. */
export default function ProjectsWall() {
  return (
    <section aria-labelledby="wall-title" className="pt-8 md:pt-12">
      <div className="container-editorial">
        <Reveal className="flex items-end justify-between gap-6 border-t border-line pt-6">
          <h2 id="wall-title" className="eyebrow">
            Todos os projetos <span className="tabular-nums">({String(projects.length).padStart(2, "0")})</span>
          </h2>
          <HashLink href="/#projects" className="link-underline text-sm">
            Ver em detalhes
          </HashLink>
        </Reveal>
      </div>

      <Reveal y={0} className="mt-6 h-[44svh] min-h-[300px] md:mt-8 md:h-[min(72svh,640px)] md:min-h-[340px]">
        <GridMotion
          projects={projects}
          rows={2}
          angle={0}
          aspectRatio={1.33}
          gap={16}
          radius={14}
          speed={24}
          parallax={0.5}
          spotlight={0.6}
          dim={0.35}
          fade={0.5}
        />
      </Reveal>
    </section>
  );
}
