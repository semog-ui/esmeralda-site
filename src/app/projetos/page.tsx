import { sanityFetch } from "@/lib/live";
import { CATEGORIES_QUERY, PROJECTS_QUERY } from "@/sanity/queries/getProjects";
import ProjectListFilter from "@/components/ProjectListFilter";
import HeroPage from "@/components/HeroPage";
import SectionContact from "@/components/SectionContact";
import { BriefcaseIcon } from "lucide-react";
import { Project, Category } from "@/types/project";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos | Esmeralda",
  description:
    "A Esmeralda é o meu laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor.",
};

export default async function PortfolioPage() {
  const [projectsResult, categoriesResult] = await Promise.all([
    sanityFetch({ query: PROJECTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
  ]);

  const projects = (projectsResult.data || []) as Project[];
  const categories = (categoriesResult.data || []) as Category[];

  return (
    <>
      {/* HEADER COM PARALLAX */}
      <HeroPage
        title="Projetos"
        description="A Esmeralda é o meu laboratório de consciência lógica - uma linha de pensamento sobre como o mundo pode funcionar melhor."
        icon={BriefcaseIcon}
        imageSrc="/hero-portfolio.jpg"
      />

      <div className="min-h-screen bg-background">
        <ProjectListFilter initialProjects={projects} categories={categories} />

        <SectionContact />
      </div>
    </>
  );
}
