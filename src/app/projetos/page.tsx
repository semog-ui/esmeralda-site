"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { client } from "@/lib/client";
import { ProjectCard } from "@/components/ProjectCard";
import { PostsGridSkeleton } from "@/components/Skeletons";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter, Search } from "lucide-react";

import HeroPage from "@/components/HeroPage";
import { BriefcaseIcon } from "lucide-react";
import SectionContact from "@/components/SectionContact";
import { Category, Project } from "@/types/project";
import { CATEGORIES_QUERY, PROJECTS_QUERY } from "@/sanity/queries/getProjects";

const PROJECTS_PER_PAGE = 9;

export default function PortfolioPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  // fetch inicial
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [projectsData, categoriesData] = await Promise.all([
          client.fetch<Project[]>(PROJECTS_QUERY),
          client.fetch<Category[]>(CATEGORIES_QUERY),
        ]);
        setAllProjects(projectsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // filtrar projetos
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        (project.categories &&
          project.categories.some((cat: any) =>
            typeof cat === "string"
              ? cat === selectedCategory
              : cat.title === selectedCategory
          ));

      return matchesSearch && matchesCategory;
    });
  }, [allProjects, searchTerm, selectedCategory]);

  // atualizar display
  useEffect(() => {
    setDisplayedProjects(filteredProjects.slice(0, PROJECTS_PER_PAGE));
    setPage(1);
    setHasMore(filteredProjects.length > PROJECTS_PER_PAGE);
  }, [filteredProjects]);

  // carregar mais projetos
  const loadMoreProjects = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const startIndex = page * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const newProjects = filteredProjects.slice(startIndex, endIndex);

    if (newProjects.length > 0) {
      setDisplayedProjects((prev) => [...prev, ...newProjects]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [page, filteredProjects, loadingMore, hasMore]);

  const lastProjectElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProjects();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, loadMoreProjects]
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <PostsGridSkeleton />
        </div>
      </div>
    );
  }

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
        <div className="container mx-auto px-6 py-16">
          {/* Filtros */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-card rounded-lg border p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Filtrar Projetos</h2>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Limpar Filtros
                  </Button>
                )}
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar projetos por título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory("all")}
                >
                  Todos
                </Badge>
                {categories.map((cat) => (
                  <Badge
                    key={cat._id}
                    variant={
                      selectedCategory === cat.title ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => setSelectedCategory(cat.title)}
                  >
                    {cat.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de Projetos */}
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ajuste filtros ou termo de busca.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProjects.map((project, i) => {
                    // Apenas mapeamento das categorias, o slug permanece como objeto
                    const mappedProject = {
                      ...project,
                      categories:
                        project.categories?.map((cat: any) => ({
                          title: cat.title || cat,
                          slug:
                            cat.slug ||
                            (typeof cat === "string"
                              ? cat.toLowerCase().replace(/\s+/g, "-")
                              : cat.title.toLowerCase().replace(/\s+/g, "-")),
                        })) || [],
                    };

                    return i === displayedProjects.length - 1 ? (
                      <div key={project._id} ref={lastProjectElementRef}>
                        <ProjectCard project={mappedProject} />
                      </div>
                    ) : (
                      <ProjectCard key={project._id} project={mappedProject} />
                    );
                  })}
                </div>

                {loadingMore && (
                  <div className="mt-8">
                    <PostsGridSkeleton />
                  </div>
                )}

                {!hasMore && displayedProjects.length > 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Você viu todos os projetos!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <SectionContact />
      </div>
    </>
  );
}
