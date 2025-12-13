"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { PostsGridSkeleton } from "@/components/Skeletons";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter, Search } from "lucide-react";
import { Project, Category } from "@/types/sanity"; // Importação correta das interfaces

const PROJECTS_PER_PAGE = 9;

interface ProjectListFilterProps {
  initialProjects: Project[];
  categories: Category[];
}

export default function ProjectListFilter({
  initialProjects,
  categories,
}: ProjectListFilterProps) {
  // Inicializa com os dados vindos do servidor
  const [allProjects] = useState<Project[]>(initialProjects);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);

  // Estados de controle
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Lógica de Filtragem (Otimizada com useMemo)
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Filtro de Texto
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filtro de Categoria
      const matchesCategory =
        selectedCategory === "all" ||
        (project.categories &&
          project.categories.some((cat) => {
            // Verifica se é objeto (Category) ou string (caso venha sujo) e compara
            if (typeof cat === "string") return cat === selectedCategory;
            return cat?.title === selectedCategory;
          }));

      return matchesSearch && matchesCategory;
    });
  }, [allProjects, searchTerm, selectedCategory]);

  // Atualiza a lista exibida quando os filtros mudam
  useEffect(() => {
    setDisplayedProjects(filteredProjects.slice(0, PROJECTS_PER_PAGE));
    setPage(1);
    setHasMore(filteredProjects.length > PROJECTS_PER_PAGE);
  }, [filteredProjects]);

  // Lógica de Paginação Infinita
  const loadMoreProjects = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    // Simula um pequeno delay para UX (opcional)
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

  // Observer para o Infinite Scroll
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

  return (
    <div className="container mx-auto px-6 py-16">
      {/* --- Área de Filtros --- */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-card rounded-lg border p-6">
          {/* Header dos Filtros */}
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

          {/* Barra de Busca */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tags de Categorias */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => setSelectedCategory("all")}
            >
              Todos
            </Badge>
            {categories.map((cat, idx) => (
              <Badge
                key={cat._id || idx} // Fallback para index se _id faltar
                variant={selectedCategory === cat.title ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => setSelectedCategory(cat.title)}
              >
                {cat.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* --- Lista de Projetos --- */}
      <div className="max-w-6xl mx-auto">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou o termo de busca.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, i) => {
                // Se for o último elemento, adiciona a ref do observer
                if (i === displayedProjects.length - 1) {
                  return (
                    <div key={project._id} ref={lastProjectElementRef}>
                      <ProjectCard project={project} />
                    </div>
                  );
                }
                return <ProjectCard key={project._id} project={project} />;
              })}
            </div>

            {/* Skeleton de Loading ao carregar mais */}
            {loadingMore && (
              <div className="mt-8">
                <PostsGridSkeleton />
              </div>
            )}

            {/* Mensagem de fim da lista */}
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
  );
}
