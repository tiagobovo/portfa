import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectsWall from "@/components/ProjectsWall";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { ScrollToHash } from "@/components/HashLink";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  // Dados estruturados (SEO) — pessoa/profissional criativo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: `mailto:${siteConfig.contact.email}`,
    sameAs: siteConfig.socials.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollToHash />
      <Hero />
      <ProjectsWall />
      <ProjectGrid />
      <About />
      <Contact />
    </>
  );
}
